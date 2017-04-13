import {ErrorHandler, Injectable, Inject} from "@angular/core";
import {FdsErrorService} from "./fds-error.service";

export interface LoggingErrorHandlerOptions {
    rethrowError: boolean;
    unwrapError: boolean;
}

export var LOGGING_ERROR_HANDLER_OPTIONS: LoggingErrorHandlerOptions = {
    rethrowError: false,
    unwrapError: false
};

@Injectable()
export class FdsErrorHandler implements ErrorHandler {

    private errorService: FdsErrorService;
    private options: LoggingErrorHandlerOptions;

    constructor(errorService: FdsErrorService,
                @Inject(LOGGING_ERROR_HANDLER_OPTIONS) options: LoggingErrorHandlerOptions) {
        this.errorService = errorService;
        this.options = options;
    }

    /**
     * This method will be called by angular framework when any exception
     * or occured in application
     * @param error
     */
    handleError(error: any) {
        try {
            this.options.unwrapError
                ? this.errorService.handleError(this.findOriginalError(error))
                : this.errorService.handleError(error);

        } catch (loggingError) {
            console.error(loggingError);
            console.groupEnd();

        }
    }

    private findOriginalError(error: any): any {
        while (error && error.originalError) {
            error = error.originalError;
        }
        return ( error );
    }
}

export var LOGGING_ERROR_HANDLER_PROVIDERS = [
    {
        provide: LOGGING_ERROR_HANDLER_OPTIONS,
        useValue: LOGGING_ERROR_HANDLER_OPTIONS
    },
    {
        provide: ErrorHandler,
        useClass: FdsErrorHandler
    }
];