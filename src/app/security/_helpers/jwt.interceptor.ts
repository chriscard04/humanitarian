import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalService } from '../_services/localService';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private localService: LocalService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(this.localService.getJsonValue('currentUser'));
        // Inserts the Auth Token
        if (currentUser) {
            if (!currentUser.login) {
                request = request.clone({
                    setHeaders: {
                        Authorization: "Bearer " + currentUser.jwt
                    }
                });
            }
        }

        return next.handle(request);
    }
}
