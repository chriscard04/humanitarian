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
    function ApplicationFormComponent(fb, router, dialog, service, globalFunctions) {
        this.fb = fb;
        this.router = router;
        this.dialog = dialog;
        this.service = service;
        this.globalFunctions = globalFunctions;
        this.isUpdate = false;
        this.title = 'Nuevo registro';
        this.previousRow = false;
        this.nextRow = false;
        this.message = {
            show: false,
            status: 'primary',
            text: ''
        };
        this.showLoading = false;
        this.perfiles = [];
        this.personas = [];
        this.form = this.fb.group({
            "position": [null, forms_1.Validators.required],
            "name": [null, forms_1.Validators.required],
            "identification": [null, forms_1.Validators.required],
            "address": [null, forms_1.Validators.required],
            "contact_number": [null, forms_1.Validators.required],
            "email": [null, forms_1.Validators.required],
            "travel": [false, forms_1.Validators.required],
            "expected_salary": [null, forms_1.Validators.required],
            "preferred_location": [null, forms_1.Validators.required],
            "start_date": [new Date()],
            "questions": [null]
        });
    }
    ApplicationFormComponent.prototype.ngOnInit = function () {
        /*     this.service.Get('perfiles').subscribe((result) => {
              this.perfiles = result;
            }); */
        var temp = this.globalFunctions.getFormFields();
        console.log(temp);
        console.log(this.form_fields);
    };
    ApplicationFormComponent.prototype.closeModal = function () {
        if (this.form.valid) {
            // this.dialogRef.close();
        }
    };
    ApplicationFormComponent.prototype.onSubmit = function (values, closeModal) {
        var _this = this;
        if (closeModal === void 0) { closeModal = false; }
        this.showLoading = true;
        this.message.show = false;
        if (!this.form.valid) {
            this.globalFunctions.validateAllFormFields(this.form);
            this.message = this.globalFunctions.errorMessage();
            this.showLoading = false;
            return;
        }
        this.service.post('candidates', values).subscribe(function (result) {
            console.log(result);
            _this.message = _this.globalFunctions.successMessage();
            _this.showLoading = false;
            _this.form.reset();
            if (closeModal) {
                // this.dialogRef.close(this.data);
            }
        }, function (error) {
            _this.message = _this.globalFunctions.errorMessage(error);
            _this.showLoading = false;
        });
    };
    ApplicationFormComponent.prototype.setValues = function (row) {
        this.form.controls['cod_usuario'].setValue(row.cod_usuario);
        this.form.controls['usuario_nombre'].setValue(row.usuario_nombre);
        this.form.controls['contrasena'].setValue(row.contrasena);
        this.form.controls['cod_perfil'].setValue(row.cod_perfil);
        this.form.controls['email'].setValue(row.email);
        this.form.controls['sn_activo'].setValue(row.sn_activo);
    };
    ApplicationFormComponent.prototype.ngAfterViewInit = function () {
        //  this.settings.loadingSpinner = false;
        this.checkControlButtons();
    };
    ApplicationFormComponent.prototype.checkControlButtons = function () {
        // ACTIVAR O DESACTIVAR BOTONES ATRAS Y SIGUIENTE
        var actualPosition = this.data.indexOf(this.row) + 1;
        var maxPosition = this.data.length;
        if (actualPosition === 1 && maxPosition === 1) {
            this.previousRow = true;
            this.nextRow = true;
        }
        else if (actualPosition > 1 && actualPosition < maxPosition) {
            this.previousRow = false;
            this.nextRow = false;
        }
        else if (actualPosition === 1 && actualPosition < maxPosition) {
            this.previousRow = true;
            this.nextRow = false;
        }
        else if (actualPosition === maxPosition && actualPosition > 1) {
            this.previousRow = false;
            this.nextRow = true;
        }
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
