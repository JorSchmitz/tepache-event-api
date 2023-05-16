import * as GTrace from '@google-cloud/trace-agent';

export const tracer = GTrace.start({
  serviceContext: {
    service: process.env.npm_package_name, version: 
    process.env.npm_package_version,
  },
});