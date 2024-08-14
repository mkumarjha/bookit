class ErrorHandler extends Error {
    statusCode: number;

    constructor(errorMessage: string, statuscode: number) {
        super(errorMessage);
        this.statusCode = statuscode;
    }
}

export default ErrorHandler;