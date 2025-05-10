import type { AxiosError } from "axios";

export type ApiErrorResponse = {
    status: boolean;
    statusCode: number;
    error: string;
    stack?: Array<Record<string, unknown>>;
};

export type ApiProps = {
    id?: string;
    onMutate?: () => Promise<void>;
    onSuccess?: () => Promise<void>;
    onError?: (error: AxiosError<ApiErrorResponse>) => Promise<void>;
};

export type ApiResponse<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    data: T;
};