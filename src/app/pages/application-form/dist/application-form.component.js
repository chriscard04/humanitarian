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
        this.appearance = 'fill';
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
        this.mainForm = this.fb.group({
            "position": [null],
            "name": [null, forms_1.Validators.required],
            "identification": [null],
            "address": [null],
            "contact_numbers": [null],
            "email": [null, forms_1.Validators.compose([forms_1.Validators.email, forms_1.Validators.required])],
            "education": this.fb.array([]),
            "travel": [false],
            "expected_salary": [null],
            "preferred_location": [null],
            "start_date": [new Date()],
            "questions": [null]
        });
    }
    ApplicationFormComponent.prototype.ngOnInit = function () {
        /*     this.service.Get('perfiles').subscribe((result) => {
          this.perfiles = result;
        }); */
        this.addEducation();
    };
    /* EDUCATION */
    ApplicationFormComponent.prototype.education = function () {
        return this.mainForm.get("education");
    };
    ApplicationFormComponent.prototype.newEducation = function () {
        return this.fb.group({
            e_degree: [null, forms_1.Validators.required],
            e_title: [null, forms_1.Validators.required],
            e_year: [null, forms_1.Validators.required]
        });
    };
    ApplicationFormComponent.prototype.addEducation = function () {
        this.education().push(this.newEducation());
    };
    ApplicationFormComponent.prototype.removeEducation = function (i) {
        this.education().removeAt(i);
    };
    /* / EDUCATION */
    ApplicationFormComponent.prototype.closeModal = function () {
        if (this.mainForm.valid) {
            // this.dialogRef.close();
        }
    };
    ApplicationFormComponent.prototype.onSubmit = function (values, closeModal) {
        var _this = this;
        if (closeModal === void 0) { closeModal = false; }
        this.showLoading = true;
        this.message.show = false;
        if (!this.mainForm.valid) {
            this.globalFunctions.validateAllFormFields(this.mainForm);
            this.message = this.globalFunctions.errorMessage();
            this.showLoading = false;
            return;
        }
        // values.education = { degree: values.education }
        this.service.post('candidates', values).subscribe(function (result) {
            console.log(result);
            _this.message = _this.globalFunctions.successMessage();
            _this.showLoading = false;
            _this.mainForm.reset();
            if (closeModal) {
                // this.dialogRef.close(this.data);
            }
        }, function (error) {
            _this.message = _this.globalFunctions.errorMessage(error);
            _this.showLoading = false;
        });
    };
    ApplicationFormComponent.prototype.setValues = function (row) {
        this.mainForm.controls['cod_usuario'].setValue(row.cod_usuario);
        this.mainForm.controls['usuario_nombre'].setValue(row.usuario_nombre);
        this.mainForm.controls['contrasena'].setValue(row.contrasena);
        this.mainForm.controls['cod_perfil'].setValue(row.cod_perfil);
        this.mainForm.controls['email'].setValue(row.email);
        this.mainForm.controls['sn_activo'].setValue(row.sn_activo);
    };
    ApplicationFormComponent.prototype.ngAfterViewInit = function () {
        //  this.settings.loadingSpinner = false;
        // this.checkControlButtons();
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
