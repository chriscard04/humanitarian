"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var environment_1 = require("src/environments/environment");
var ListService = /** @class */ (function () {
    function ListService(_http) {
        this._http = _http;
        this.baseURL = environment_1.environment.endPoint;
    }
    ListService.prototype.Get = function (obj) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json'
        });
        var params = new http_1.HttpParams();
        var sUrl = this.baseURL + obj;
        return this._http.get(sUrl, { headers: headers, params: params });
    };
    ListService.prototype.Post = function (obj, body) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json'
        });
        var params = new http_1.HttpParams();
        var sUrl = this.baseURL + obj;
        return this._http.post(sUrl, body, { headers: headers, params: params });
    };
    ListService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ListService);
    return ListService;
}());
exports.ListService = ListService;
