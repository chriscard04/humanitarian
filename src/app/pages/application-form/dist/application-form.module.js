"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApplicationFormModule = exports.routes = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var shared_module_1 = require("../../../shared/shared.module");
var application_form_component_1 = require("./application-form.component");
exports.routes = [
    {
        path: '',
        component: application_form_component_1.ApplicationFormComponent,
        data: {}
    },
];
var ApplicationFormModule = /** @class */ (function () {
    function ApplicationFormModule() {
    }
    ApplicationFormModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(exports.routes),
                forms_1.FormsModule,
                shared_module_1.SharedModule,
            ],
            declarations: [application_form_component_1.ApplicationFormComponent]
        })
    ], ApplicationFormModule);
    return ApplicationFormModule;
}());
exports.ApplicationFormModule = ApplicationFormModule;
