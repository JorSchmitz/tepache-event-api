// import { tracer } from './infrastructure/modules/Tracer';
import { ApolloServer } from 'apollo-server-express'
import createExpress, { Request, Response } from 'express'
import cors from 'cors'
import { schema } from './schema'
import logger from './infrastructure/Logger'
import { get } from 'lodash'
import { getContext } from './infrastructure/permissions/index'
import { InvalidTokenError } from './model/accessToken/InvalidTokenError'
import { PrismaClient } from './infrastructure/modules/Prisma'
// import { apolloGCloudTracePlugin } from 'apollo-server-plugin-cloud-trace';
import * as dayjs from 'dayjs'
import tz from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

const port = 8000

const prismaClient = PrismaClient.prisma

dayjs.extend(tz)
dayjs.extend(utc)
dayjs.locale('es-mx')

const apollo = new ApolloServer({
  schema,
  formatError: (err) => {
    if (
      err.message.startsWith('Query engine exited with code 1') ||
      err.message.includes('corrupted')
    ) {
      // errorReporting.report(err.message);
      logger.error(`Fatal error, exiting: ${err.message}`)
      process.exit(1)
    }
    if (
      err.message.startsWith('prisma') ||
      err?.extensions?.code === 'INTERNAL_SERVER_ERROR'
    ) {
      logger.error(`Internal server error: ${err.message}`)
      // errorReporting.report(err.message);
      if (process.env.NODE_ENV === 'production') {
        return new Error('Internal server error')
      }
    }
    return err
  },
  plugins: [
    // TODO: Fix 403 errors in gcp
    // apolloGCloudTracePlugin({
    //   addFieldValues: true,
    //   addFieldArguments: true,
    //   tracer,
    // }),
  ],
  context: async (request) => {
    try {
      const operationName = get(request, 'req.body.operationName')
      if (operationName === 'IntrospectionQuery') {
        return
      }

      const variables = get(request, 'req.body.variables')
      const query = get(request, 'req.body.query')
      const headers = get(request, 'req.headers')
      logger.log('info', 'request', {
        headers,
        operationName,
        variables,
        query,
      })

      const { deviceId, jwt, token } = await getContext(request.req)
      return {
        headers,
        deviceId,
        jwt,
        token,
        prisma: prismaClient,
      }
    } catch (e) {
      throw new InvalidTokenError('Invalid token', {
        component: 'app',
        input: { error: e.message },
      })
    }
  },
})

const express = createExpress()

apollo.start().then(() => {
  apollo.applyMiddleware({ app: express })

  express.use(cors())

  express.get('/healthz', async (_req: Request, res: Response) => {
    res.status(404).send()
  })
  express.get('/_ah/health', async (_req: Request, res: Response) => {
    res.status(200).json({ res: 'OK' })
  })

  express.listen(port, () => {
    logger.log({
      level: 'info',
      message: `🚀 GraphQL service ready at http://localhost:${port}/graphql`,
    })
  })
})
