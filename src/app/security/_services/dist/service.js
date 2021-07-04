"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WebApi = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../../../environments/environment");
var WebApi = /** @class */ (function () {
    function WebApi(http, localService) {
        this.http = http;
        this.localService = localService;
        this.BASE_URL = environment_1.environment.endPoint;
        this.oCurrentUser = JSON.parse(this.localService.getJsonValue('currentUser'));
        console.log("WebApi ");
    }
    WebApi.prototype.Call = function (obj, params, values) {
        var index = 0;
        var stringParams = '';
        for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
            var param = params_1[_i];
            stringParams = stringParams + '&' + param + '=' + values[index];
            index++;
        }
        var sUrl = this.BASE_URL + 'sps/' + obj + "?" + stringParams;
        sUrl = this.addToken(sUrl);
        return this.http.get(sUrl)
            .pipe(operators_1.map(this.extractData), operators_1.catchError(this.handleError));
    };
    WebApi.prototype.Get = function (obj) {
        var sUrl = this.BASE_URL + obj;
        sUrl = this.addToken(sUrl);
        return this.http.get(sUrl)
            .pipe(operators_1.map(this.extractData), operators_1.catchError(this.handleError));
    };
    WebApi.prototype.GetById = function (obj, id) {
        var sUrl = "this.BASE_URL + obj + '/' + id";
        sUrl = this.addToken(sUrl);
        return this.http.get(sUrl)
            .pipe(operators_1.map(this.extractData), operators_1.catchError(this.handleError));
    };
    WebApi.prototype.GetProfileImage = function (name) {
        var sUrl = this.BASE_URL + 'profile/descargarfoto?fileName=' + name + '&fileExtension=jpg';
        sUrl = this.addToken(sUrl);
        return this.http.get(sUrl, {
            responseType: 'blob'
        }).pipe(operators_1.catchError(function () { return rxjs_1.throwError('Sin Foto de Perfil'); }));
    };
    WebApi.prototype.post = function (obj, criterio) {
        var sUrl = this.BASE_URL + obj;
        return this.http.post(sUrl, criterio)
            .pipe(operators_1.map(this.extractData), operators_1.catchError(this.handleError));
    };
    WebApi.prototype.Post = function (obj, criterio) {
        var sUrl = this.BASE_URL + obj;
        sUrl = this.addToken(sUrl);
        return this.http.post(sUrl, criterio)
            .pipe(operators_1.map(this.extractData), operators_1.catchError(this.handleError));
    };
    WebApi.prototype.PostImage = function (formData) {
        var sUrl = this.BASE_URL + 'profile/subirfoto';
        sUrl = this.addToken(sUrl);
        this.http.post(sUrl, formData, {
            reportProgress: true,
            observe: 'events'
        })
            .subscribe(function (event) {
            // console.log(event); // handle event here
        });
    };
    WebApi.prototype.Put = function (obj, id, criterio) {
        var sUrl = this.BASE_URL + obj + '/' + id;
        sUrl = this.addToken(sUrl);
        return this.http.put(sUrl, criterio)
            .pipe(operators_1.map(this.extractData), operators_1.catchError(this.handleError));
    };
    WebApi.prototype.Delete = function (obj, id) {
        var sUrl = this.BASE_URL + obj + '/' + id;
        sUrl = this.addToken(sUrl);
        return this.http["delete"](sUrl)
            .pipe(operators_1.map(this.extractData), operators_1.catchError(this.handleError));
    };
    WebApi.prototype.addToken = function (sUrl) {
        var sToken = 'key=' + this.oCurrentUser.token;
        if (sUrl.includes('?')) {
            return sUrl = sUrl + "&" + sToken;
        }
        else {
            return sUrl = sUrl + "?" + sToken;
        }
    };
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
    WebApi.prototype.extractData = function (res) {
        var body = res;
        return body || {};
    };
    WebApi.prototype.handleError = function (error) {
        if (error.toString() == "Gone") {
            localStorage.clear();
            location.reload();
        }
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            return rxjs_1.throwError('Ha ocurrido un error al realizar la operación');
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            return rxjs_1.throwError('Ha ocurrido un error al realizar la operación');
        }
        // return an observable with a user-facing error message
    };
    ;
    WebApi = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], WebApi);
    return WebApi;
}());
exports.WebApi = WebApi;
