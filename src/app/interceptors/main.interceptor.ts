import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantService } from '../services/constant.service';
import { DatabaseService } from '../services/database.service';

@Injectable()
export class MainInterceptor implements HttpInterceptor {
    constructor(private databaseService: DatabaseService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const authenticationToken = this.databaseService.getAuthenticationToken();
        if (authenticationToken) {
            const authReq = req.clone({
                headers: req.headers.set("token", authenticationToken)
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }

}
