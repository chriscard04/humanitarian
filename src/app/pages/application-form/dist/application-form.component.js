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
var operators_1 = require("rxjs/operators");
var autocomplete_1 = require("@angular/material/autocomplete");
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
        this.countries = [];
        this.passportFile = null;
        this.visaFile = null;
        this.pictureFile = null;
        this.minDate = new Date();
        this.mainForm = this.fb.group({
            "position": [null],
            "name": [null, forms_1.Validators.required],
            "identification": [null, forms_1.Validators.required],
            "address": [null, forms_1.Validators.required],
            "contact_numbers": [null],
            "email": [null, forms_1.Validators.compose([forms_1.Validators.email, forms_1.Validators.required])],
            "education": this.fb.array([]),
            "work_experience": this.fb.array([]),
            "thematic_experience": this.fb.array([]),
            "consultancies": this.fb.array([]),
            "global_awards": this.fb.array([]),
            "languages": this.fb.array([]),
            "travel": [false],
            "expected_salary": [null, forms_1.Validators.required],
            "preferred_location": [null],
            "start_date": [new Date()],
            "questions": [null]
        });
        this.countries = this.globalFunctions.getAllCountries();
        this.mainForm.controls['preferred_location'].setValue(this.globalFunctions.getCountryByISO(this.service.getIPLocation()));
    }
    ApplicationFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        /*     this.service.Get('perfiles').subscribe((result) => {
          this.perfiles = result;
        }); */
        this.addEducation();
        this.addWorkExperience();
        this.addThematicExperience();
        this.addConsultancies();
        this.addLanguages();
        this.countries_filtered = this.mainForm.controls['preferred_location'].valueChanges.pipe(operators_1.startWith(''), operators_1.map(function (value) { return _this._filter(value); }));
    };
    ApplicationFormComponent.prototype.ngAfterViewInit = function () {
        //  this.settings.loadingSpinner = false;
        // this.checkControlButtons();
        var _this = this;
        this.trigger.panelClosingActions.subscribe(function () {
            _this.mainForm.controls['preferred_location'].setValue(_this.trigger.activeOption.value);
        });
    };
    ApplicationFormComponent.prototype._filter = function (value) {
        var filterValue = value.toLowerCase();
        return this.countries.filter(function (option) { return option.name.toLowerCase().includes(filterValue); });
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
    /* WORK EXPERIENCE */
    ApplicationFormComponent.prototype.work_experience = function () {
        return this.mainForm.get("work_experience");
    };
    ApplicationFormComponent.prototype.newWorkExperience = function () {
        return this.fb.group({
            w_country: [null, forms_1.Validators.required],
            w_area: [null]
        });
    };
    ApplicationFormComponent.prototype.addWorkExperience = function () {
        this.work_experience().push(this.newWorkExperience());
    };
    ApplicationFormComponent.prototype.removeWorkExperience = function (i) {
        this.work_experience().removeAt(i);
    };
    /* / WORK EXPERIENCE  */
    /* THEMATIC EXPERIENCE */
    ApplicationFormComponent.prototype.thematic_experience = function () {
        return this.mainForm.get("thematic_experience");
    };
    ApplicationFormComponent.prototype.newThematicExperience = function () {
        return this.fb.group({
            t_area: [null, forms_1.Validators.required],
            t_project: [null, forms_1.Validators.required],
            t_position: [null]
        });
    };
    ApplicationFormComponent.prototype.addThematicExperience = function () {
        this.thematic_experience().push(this.newThematicExperience());
    };
    ApplicationFormComponent.prototype.removeThematicExperience = function (i) {
        this.thematic_experience().removeAt(i);
    };
    /* / THEMATIC EXPERIENCE  */
    /* CONSULTANCIES */
    ApplicationFormComponent.prototype.consultancies = function () {
        return this.mainForm.get("consultancies");
    };
    ApplicationFormComponent.prototype.newConsultancy = function () {
        return this.fb.group({
            c_years: [null, forms_1.Validators.required],
            c_contributions: [null],
            c_institution: [null]
        });
    };
    ApplicationFormComponent.prototype.addConsultancies = function () {
        this.consultancies().push(this.newConsultancy());
    };
    ApplicationFormComponent.prototype.removeConsultancies = function (i) {
        this.consultancies().removeAt(i);
    };
    /* / CONSULTANCIES  */
    /* LANGUAGES */
    ApplicationFormComponent.prototype.languages = function () {
        return this.mainForm.get("languages");
    };
    ApplicationFormComponent.prototype.newLanguage = function () {
        return this.fb.group({
            l_language: [null, forms_1.Validators.required],
            l_level: [null, forms_1.Validators.required]
        });
    };
    ApplicationFormComponent.prototype.addLanguages = function () {
        this.languages().push(this.newLanguage());
    };
    ApplicationFormComponent.prototype.removeLanguages = function (i) {
        this.languages().removeAt(i);
    };
    /* / LANGUAGES  */
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
            setTimeout(function () {
                _this.message.show = false;
            }, 3500);
            return;
        }
        var formData = new FormData();
        formData.append("data", JSON.stringify(values));
        if (this.passportFile) {
            formData.append("files.passport", this.passportFile);
        }
        if (this.visaFile) {
            formData.append("files.visa", this.visaFile);
        }
        if (this.pictureFile) {
            formData.append("files.picture", this.pictureFile);
        }
        // values.education = { degree: values.education }
        this.service.post('candidates', formData).subscribe(function (result) {
            console.log(result);
            _this.message = _this.globalFunctions.successMessage();
            _this.showLoading = false;
            setTimeout(function () {
                _this.message.show = false;
                _this.router.navigate(['home']);
            }, 3500);
            _this.mainForm.reset();
            if (closeModal) {
                // this.dialogRef.close(this.data);
            }
        }, function (error) {
            _this.message = _this.globalFunctions.errorMessage(error);
            setTimeout(function () {
                _this.message.show = false;
            }, 3500);
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
    __decorate([
        core_1.ViewChild(autocomplete_1.MatAutocompleteTrigger, { static: false })
    ], ApplicationFormComponent.prototype, "trigger");
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
