import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { LocalService } from './localService';
import { environment } from '../../../environments/environment';

@Injectable(
  { providedIn: 'root' }
)
export class WebApi {
  private BASE_URL: string = environment.endPoint;
  private oCurrentUser = JSON.parse(this.localService.getJsonValue('currentUser'));

  constructor(private http: HttpClient,
    private localService: LocalService) {
    console.log("WebApi ")
  }

  Call(obj, params: string[], values: string[]): Observable<any> {
    var index = 0;
    var stringParams = '';
    for (let param of params) {
      stringParams = stringParams + '&' + param + '=' + values[index];
      index++;
    }

    var sUrl = this.BASE_URL + 'sps/' + obj + "?" + stringParams;
    sUrl = this.addToken(sUrl);

    return this.http.get(sUrl)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  Get(obj): Observable<any> {
    var sUrl = this.BASE_URL + obj;
    sUrl = this.addToken(sUrl);

    return this.http.get(sUrl)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  GetById(obj, id): Observable<any> {
    var sUrl = "this.BASE_URL + obj + '/' + id";
    sUrl = this.addToken(sUrl);

    return this.http.get(sUrl)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  GetProfileImage(name: string): Observable<any> {
    var sUrl = this.BASE_URL + 'profile/descargarfoto?fileName=' + name + '&fileExtension=jpg';
    sUrl = this.addToken(sUrl);

    return this.http.get(sUrl, {
      responseType: 'blob'
    }).pipe(catchError(() => throwError('Sin Foto de Perfil')));
  }

  post(obj, criterio): Observable<any> {
    var sUrl = this.BASE_URL + obj;
    return this.http.post(sUrl, criterio)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  Post(obj, criterio): Observable<any> {
    var sUrl = this.BASE_URL + obj;
    sUrl = this.addToken(sUrl);

    return this.http.post(sUrl, criterio)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  PostImage(formData: FormData) {
    var sUrl = this.BASE_URL + 'profile/subirfoto';
    sUrl = this.addToken(sUrl);

    this.http.post(sUrl, formData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        // console.log(event); // handle event here
      });
  }

  Put(obj, id, criterio): Observable<any> {
    var sUrl = this.BASE_URL + obj + '/' + id;
    sUrl = this.addToken(sUrl);

    return this.http.put(sUrl, criterio)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  Delete(obj, id): Observable<any> {
    var sUrl = this.BASE_URL + obj + '/' + id;
    sUrl = this.addToken(sUrl);

    return this.http.delete(sUrl)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  addToken(sUrl) {
    var sToken = 'key=' + this.oCurrentUser.token;
    if (sUrl.includes('?')) {
      return sUrl = sUrl + "&" + sToken;
    }
    else {
      return sUrl = sUrl + "?" + sToken;
    }
  }

  // VerificarCedula(Cedula): Observable<any>
  // {
  //   const data = {
  //     Cedula: Cedula
  //   };

  //   const options = {params: new HttpParams().set(
  //     'criterio',
  //     JSON.stringify(data))};

  //   return this.http.get(this.BASE_URL + 'VerificarCedula', options)
  //     .pipe(map(this.extractData));
  // }

  // Login(criterio): Observable<any>
  // {
  //   let data = criterio;

  //   const options = {params: new HttpParams().set(
  //     'criterio',
  //     JSON.stringify(data))};

  //   return this.http.get(this.BASE_URL + 'Login', options)
  //     .pipe(map(this.extractData));
  // }

  private extractData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse) {

    if (error.toString() == "Gone") {
      localStorage.clear();
      location.reload();
    }

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      return throwError(
        'Ha ocurrido un error al realizar la operación');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      return throwError(
        'Ha ocurrido un error al realizar la operación');
    }
    // return an observable with a user-facing error message
  };
}
