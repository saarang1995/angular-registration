export interface ResponseIntf {
    status?: number;
    error?: ErrorIntf;
    ok?: boolean;
    statusText?: string;
    success?: boolean;
}

interface ErrorIntf {
    message?: string,
    success?: boolean
}