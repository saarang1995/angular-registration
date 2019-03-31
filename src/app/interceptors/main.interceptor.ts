import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantService } from '../services/constant.service';

@Injectable()
export class MainInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const apiKey = ConstantService.API_KEY;
        if (apiKey) {
            const authReq = req.clone({
                params: req.params.set("apikey", apiKey)
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }

}
