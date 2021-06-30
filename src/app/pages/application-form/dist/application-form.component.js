"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApplicationFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ApplicationFormComponent = /** @class */ (function () {
    function ApplicationFormComponent(pages, service) {
        this.pages = pages;
        this.service = service;
        this.assessSimilarity = new forms_1.FormControl(95, forms_1.Validators.min(50));
    }
    ApplicationFormComponent.prototype.ngOnInit = function () {
        this.loading = false;
        this.pages.setLoader();
    };
    ApplicationFormComponent.prototype.assessBeneficiaries = function () {
        var _this = this;
        this.loading = true;
        this.service.Get('assess-all?perc=' + (this.similarityPerc / 100)).subscribe(function (assess) {
            console.log(assess);
            _this.service.Get('processes/' + assess.id_process).subscribe(function (data) {
                _this.loading = false;
            });
        });
    };
    ApplicationFormComponent = __decorate([
        core_1.Component({
            selector: 'app-application-form',
            templateUrl: './application-form.component.html',
            styleUrls: ['./application-form.component.scss']
        })
    ], ApplicationFormComponent);
    return ApplicationFormComponent;
}());
exports.ApplicationFormComponent = ApplicationFormComponent;
