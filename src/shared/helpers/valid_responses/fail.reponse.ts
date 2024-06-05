import { ReasonPhrases, StatusCodes } from "../httpStatusCode";

export default class FailResponse {
    public message: string;
    public statusCode: number;
    public reasonStatusCode: string;
    public data: any;

    constructor({
        message,
        statusCode,
        reasonStatusCode,
        data,
    }: {
        message: string;
        statusCode: number;
        reasonStatusCode: string;
        data: any;
    }) {
        this.message = message;
        this.statusCode = statusCode;
        this.reasonStatusCode = reasonStatusCode;
        this.data = data;
    }

    toJson() {
        return {
            message: this.message,
            statusCode: this.statusCode,
            reasonStatusCode: this.reasonStatusCode,
            data: this.data,
        };
    }
}

class BadRequest extends FailResponse {
    constructor({
        message = ReasonPhrases.BAD_REQUEST,
        data = null,
    }: {
        message?: string;
        data?: any;
    }) {
        super({
            message,
            statusCode: StatusCodes.BAD_REQUEST,
            reasonStatusCode: ReasonPhrases.BAD_REQUEST,
            data,
        });
    }
}

class Unauthorized extends FailResponse {
    constructor({
        message = ReasonPhrases.UNAUTHORIZED,
        data = null,
    }: {
        message?: string;
        data?: any;
    }) {
        super({
            message,
            statusCode: StatusCodes.UNAUTHORIZED,
            reasonStatusCode: ReasonPhrases.UNAUTHORIZED,
            data,
        });
    }
}

class Forbidden extends FailResponse {
    constructor({
        message = ReasonPhrases.FORBIDDEN,
        data = null,
    }: {
        message?: string;
        data?: any;
    }) {
        super({
            message,
            statusCode: StatusCodes.FORBIDDEN,
            reasonStatusCode: ReasonPhrases.FORBIDDEN,
            data,
        });
    }
}

class NotFound extends FailResponse {
    constructor({
        message = ReasonPhrases.NOT_FOUND,
        data = null,
    }: {
        message?: string;
        data?: any;
    }) {
        super({
            message,
            statusCode: StatusCodes.NOT_FOUND,
            reasonStatusCode: ReasonPhrases.NOT_FOUND,
            data,
        });
    }
}

class InternalServerError extends FailResponse {
    constructor({
        message = ReasonPhrases.INTERNAL_SERVER_ERROR,
        data = null,
    }: {
        message?: string;
        data?: any;
    }) {
        super({
            message,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            reasonStatusCode: ReasonPhrases.INTERNAL_SERVER_ERROR,
            data,
        });
    }
}

export { BadRequest, Unauthorized, Forbidden, NotFound, InternalServerError };
