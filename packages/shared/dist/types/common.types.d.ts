export interface IPaginationQuery {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export interface IPaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}
export interface IErrorResponse {
    statusCode: number;
    message: string | string[];
    error: string;
    timestamp: string;
    path: string;
}
export interface ISuccessResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
}
export type SortOrder = 'asc' | 'desc';
export interface IBaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface ITimestamps {
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=common.types.d.ts.map