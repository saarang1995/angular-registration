export interface ResponseIntf {
    status?: number;
    error?: ErrorIntf;
    ok?: boolean;
    statusText?: string;
    success?: boolean;
    token?: string
}

interface ErrorIntf {
    message?: string,
    success?: boolean
}