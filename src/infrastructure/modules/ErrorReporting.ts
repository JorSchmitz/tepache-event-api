import { ErrorReporting as GoogleErrorReporting } from '@google-cloud/error-reporting';
import logger from '../Logger';

const reporter = new GoogleErrorReporting({
  serviceContext: {
    service: process.env.npm_package_name, version: process.env.npm_package_version
  }
});
export class ErrorReporting {
  private reporter: GoogleErrorReporting;

  constructor() {
    this.reporter = reporter;
  }

  async report(message: string): Promise<void> {
    try {
      this.reporter.report(message);
    } catch(error) {
      logger.error(`ErrorReporting failed to report an error: ${message}`);
    }
  }
}
