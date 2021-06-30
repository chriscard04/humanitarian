import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { LocalService } from '../../security/_services/localService';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient, private localService: LocalService) {
    }

    login(model: any): Observable<any> {
        // Internal Call to API to get the user validated
        return this.http.post<any>(`${environment.loginUrl}`, model)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.jwt) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    //localStorage.setItem('currentUser', JSON.stringify(user));
                    this.localService.setJsonValue('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.clear();
    }
}