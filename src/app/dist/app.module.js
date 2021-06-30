"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var shared_module_1 = require("../shared/shared.module");
var pages_component_1 = require("./pages/pages.component");
var not_found_component_1 = require("./pages/others/errors/not-found/not-found.component");
var error_component_1 = require("./pages/others/errors/error/error.component");
var app_routing_1 = require("./app.routing");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var app_settings_1 = require("./app.settings");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
// import { TuneInComponent } from './pages/tune-in/tune-in.component';
var service_1 = require("./security/_services/service");
var _helpers_1 = require("./security/_helpers");
var user_menu_component_1 = require("src/theme/user-menu/user-menu.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule.forRoot(),
                app_routing_module_1.AppRoutingModule,
                app_routing_1.routing,
            ],
            declarations: [
                app_component_1.AppComponent,
                pages_component_1.PagesComponent,
                error_component_1.ErrorComponent,
                not_found_component_1.NotFoundComponent,
                // TuneInComponent,
                user_menu_component_1.UserMenuComponent,
            ],
            providers: [
                app_settings_1.AppSettings,
                service_1.WebApi,
                // Authentication providers
                { provide: http_1.HTTP_INTERCEPTORS, useClass: _helpers_1.JwtInterceptor, multi: true },
                { provide: http_1.HTTP_INTERCEPTORS, useClass: _helpers_1.ErrorInterceptor, multi: true },
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
