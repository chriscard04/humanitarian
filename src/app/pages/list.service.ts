import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  baseURL = environment.endPoint;


  constructor(private _http: HttpClient) { }



  Get(obj): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const params = new HttpParams();
    
    var sUrl = this.baseURL + obj;
    return this._http.get(sUrl, { headers, params })
  }

  Post(obj, body): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const params = new HttpParams();
    
    var sUrl = this.baseURL + obj;
    return this._http.post(sUrl, body, { headers, params })
  }

}
