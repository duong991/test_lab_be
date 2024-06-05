import { ReasonPhrases, StatusCodes } from "../httpStatusCode";

export default class SuccessResponse {
    public message: string;
    public statusCode?: number;
    public reasonStatusCode?: string;
    public data: any;
    public recordFiltered?: number;
    public recordTotal?: number;

    constructor({
        message,
        statusCode,
        reasonStatusCode,
        data,
        recordFiltered,
        recordTotal,
    }: {
        message: string;
        statusCode: number;
        reasonStatusCode: string;
        data: any;
        recordFiltered?: number;
        recordTotal?: number;
    }) {
        this.message = message;
        this.statusCode = statusCode;
        this.reasonStatusCode = reasonStatusCode;
        this.data = data;
        this.recordFiltered = recordFiltered;
        this.recordTotal = recordTotal;
    }

    toJson() {
        return {
            message: this.message,
            data: this.data,
        };
    }

    send() {
        return {
            status: "success",
            message: this.message,
            statusCode: this.statusCode,
            reasonStatusCode: this.reasonStatusCode,
            data: this.data,
            recordFiltered: this.recordFiltered,
            recordTotal: this.recordTotal,
        };
    }
}

class OK extends SuccessResponse {
    constructor({
        message = ReasonPhrases.OK,
        data = null,
        recordFiltered,
        recordTotal,
    }: {
        message?: string;
        data?: any;
        recordFiltered?: number;
        recordTotal?: number;
    }) {
        super({
            message,
            statusCode: StatusCodes.OK,
            reasonStatusCode: ReasonPhrases.OK,
            data,
            recordFiltered,
            recordTotal,
        });
    }
}

class Created extends SuccessResponse {
    constructor({
        message = ReasonPhrases.CREATED,
        data = null,
    }: {
        message?: string;
        data?: any;
    }) {
        super({
            message,
            statusCode: StatusCodes.CREATED,
            reasonStatusCode: ReasonPhrases.CREATED,
            data,
        });
    }
}

class Accepted extends SuccessResponse {
    constructor({
        message = ReasonPhrases.ACCEPTED,
        data = null,
    }: {
        message?: string;
        data?: any;
    }) {
        super({
            message,
            statusCode: StatusCodes.ACCEPTED,
            reasonStatusCode: ReasonPhrases.ACCEPTED,
            data,
        });
    }
}

class NoContent extends SuccessResponse {
    constructor({
        message = ReasonPhrases.NO_CONTENT,
        data = null,
    }: {
        message?: string;
        data?: any;
    }) {
        super({
            message,
            statusCode: StatusCodes.NO_CONTENT,
            reasonStatusCode: ReasonPhrases.NO_CONTENT,
            data,
        });
    }
}

class ResetContent extends SuccessResponse {
    constructor({
        message = ReasonPhrases.RESET_CONTENT,
        data = null,
    }: {
        message?: string;
        data?: any;
    }) {
        super({
            message,
            statusCode: StatusCodes.RESET_CONTENT,
            reasonStatusCode: ReasonPhrases.RESET_CONTENT,
            data,
        });
    }
}

class PartialContent extends SuccessResponse {
    constructor({
        message = ReasonPhrases.PARTIAL_CONTENT,
        data = null,
    }: {
        message?: string;
        data?: any;
    }) {
        super({
            message,
            statusCode: StatusCodes.PARTIAL_CONTENT,
            reasonStatusCode: ReasonPhrases.PARTIAL_CONTENT,
            data,
        });
    }
}

class MultiStatus extends SuccessResponse {
    constructor({
        message = ReasonPhrases.MULTI_STATUS,
        data = null,
    }: {
        message?: string;
        data?: any;
    }) {
        super({
            message,
            statusCode: StatusCodes.MULTI_STATUS,
            reasonStatusCode: ReasonPhrases.MULTI_STATUS,
            data,
        });
    }
}

export {
    OK,
    Created,
    Accepted,
    NoContent,
    ResetContent,
    PartialContent,
    MultiStatus,
};
