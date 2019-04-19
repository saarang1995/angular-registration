import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantService } from '../services/constant.service';
import { DatabaseService } from '../services/database.service';

@Injectable()
export class MainInterceptor implements HttpInterceptor {
    constructor(private databaseService: DatabaseService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const apiKey = ConstantService.API_KEY;
        if (apiKey) {
            const authReq = req.clone({
                params: req.params.set("token", this.databaseService.getAuthenticationToken())
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }

}
