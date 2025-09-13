export interface IApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: string[];
    meta?: {
        timestamp: string;
        version: string;
        requestId?: string;
    };
}
export interface IValidationError {
    field: string;
    message: string;
    value?: any;
}
export interface IApiErrorResponse {
    success: false;
    message: string;
    errors?: IValidationError[];
    statusCode: number;
    meta: {
        timestamp: string;
        path: string;
        method: string;
    };
}
//# sourceMappingURL=api-response.interface.d.ts.map