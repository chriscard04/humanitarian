"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.AddComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var AddComponent = /** @class */ (function () {
    function AddComponent(dialogRef, fb, router, dialog, service, data) {
        this.dialogRef = dialogRef;
        this.fb = fb;
        this.router = router;
        this.dialog = dialog;
        this.service = service;
        this.data = data;
        this.title = 'Nuevo registro';
        this.previousRow = false;
        this.nextRow = false;
        this.message = {
            show: false,
            status: 'primary',
            text: ''
        };
        this.showLoading = false;
        this._suggested_duplicates = [];
        this._temp = [];
        this.fechaDesde = new Date();
        this.fechaHasta = new Date();
        this.form = this.fb.group({
            'ben_DNI': [null],
            'ben_first_name': [null],
            'ben_middle_name': [null],
            'ben_last_name1': [null],
            'ben_last_name2': [null],
            'ben_community': [null],
            'ben_birthday': [null],
            'ben_beneficiary_type': [null],
            'suggested_duplicates': [null]
        });
    }
    AddComponent.prototype.ngOnInit = function () {
    };
    AddComponent.prototype.closeModal = function () {
        if (this.form.valid) {
            this.dialogRef.close();
        }
    };
    AddComponent.prototype.onDateChange = function () {
        console.log("Changeee");
        this.fechaDesde = this.form.controls.fecha_desde.value;
        this.fechaHasta = this.form.controls.fecha_hasta.value;
    };
    AddComponent.prototype.onSubmit = function (values, closeModal) {
        if (closeModal === void 0) { closeModal = false; }
        this.showLoading = true;
        this.message.show = false;
        values.estatus = values.estatus === true ? 1 : 0;
        if (!this.form.valid) {
            this.showLoading = false;
            return;
        }
        /*
                if (this.isUpdate) {
                    this.service.Put('pla_bancos', values.idreg_banco, values).subscribe(result => {
                        this.data[this.data.indexOf(this.data.filter(x => x === this.row)[0])] = values;
        
                        this.row = values;
        
                        this.showLoading = false;
        
                        if (closeModal) {
                            this.dialogRef.close(this.data);
                        }
                    },
                        error => {
                            this.showLoading = false;
                        });
                } else {
                    this.service.Post('pla_bancos', values).subscribe(result => {
                        this.data.push(result);
                        this.showLoading = false;
        
                        this.form.reset();
                        this.form.controls['fecha_desde'].setValue(new Date());
                        this.form.controls['fecha_hasta'].setValue(new Date());
                        this.form.controls['idreg_banco'].setValue(0);
                        this.form.controls['estatus'].setValue(true);
        
                        if (closeModal) {
                            this.dialogRef.close(this.data);
                        }
                    },
                        error => {
                            this.showLoading = false;
                        });
                } */
    };
    AddComponent.prototype.setValues = function (row) {
        var _this = this;
        this.showLoading = true;
        this._suggested_duplicates = [];
        this.form.controls['ben_DNI'].setValue(row.ben_DNI);
        this.form.controls['ben_first_name'].setValue(row.ben_first_name);
        this.form.controls['ben_middle_name'].setValue(row.ben_middle_name);
        this.form.controls['ben_last_name1'].setValue(row.ben_last_name1);
        this.form.controls['ben_last_name2'].setValue(row.ben_last_name2 == '' ? '-' : row.ben_last_name2);
        this.form.controls['ben_birthday'].setValue(row.ben_birthday);
        this.form.controls['ben_beneficiary_type'].setValue(row.ben_beneficiary_type);
        this.form.controls['ben_community'].setValue(row.ben_community);
        var temp_id_duplicates = row.suggested_duplicates;
        this.getActivitiesQty(row);
        row.avg_dist = 1;
        this._suggested_duplicates.push(row);
        if (temp_id_duplicates) {
            temp_id_duplicates.forEach(function (ben) {
                _this.service.Get('beneficiaries/' + ben.id).subscribe(function (ben_suggested) {
                    // If blank add '-' as indicative
                    ben_suggested.ben_first_name = ben_suggested.ben_first_name == '' ? '-' : ben_suggested.ben_first_name;
                    ben_suggested.ben_middle_name = ben_suggested.ben_middle_name == '' ? '-' : ben_suggested.ben_middle_name;
                    ben_suggested.ben_last_name1 = ben_suggested.ben_last_name1 == '' ? '-' : ben_suggested.ben_last_name1;
                    ben_suggested.ben_last_name2 = ben_suggested.ben_last_name2 == '' ? '-' : ben_suggested.ben_last_name2;
                    // Add the distances result from assessment
                    ben_suggested.avg_dist = ben.avg_dist;
                    ben_suggested.fn_dist = ben.fn_dist;
                    ben_suggested.mn_dist = ben.mn_dist;
                    ben_suggested.ln1_dist = ben.ln1_dist;
                    ben_suggested.ln2_dist = ben.ln2_dist;
                    ben_suggested.bd_dist = ben.bd_dist;
                    _this.getActivitiesQty(ben_suggested);
                    _this._suggested_duplicates.push(ben_suggested);
                    _this._suggested_duplicates = __spreadArrays(_this._suggested_duplicates);
                });
            });
        }
        else {
            console.log('no duplicates here!');
        }
        this.showLoading = false;
    };
    AddComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.checkControlButtons();
        if (this.isUpdate) {
            setTimeout(function () {
                _this.title = 'Comparison';
                _this.setValues(_this.row);
            });
        }
    };
    AddComponent.prototype.checkControlButtons = function () {
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
    AddComponent.prototype.previous = function () {
        var _this = this;
        this.message.show = false;
        this.row = this.data[this.data.indexOf(this.row) - 1];
        this.checkControlButtons();
        setTimeout(function () {
            _this.title = 'Editar';
            // SETEA VALORES INICIALES SI ES ACTUALIZACION
            _this.setValues(_this.row);
        });
    };
    AddComponent.prototype.next = function () {
        var _this = this;
        this.message.show = false;
        this.row = this.data[this.data.indexOf(this.row) + 1];
        this.checkControlButtons();
        setTimeout(function () {
            _this.title = 'Editar';
            // SETEA VALORES INICIALES SI ES ACTUALIZACION
            _this.setValues(_this.row);
        });
    };
    AddComponent.prototype.getActivitiesQty = function (itemRow) {
        if (itemRow.info_activity_assitance) {
            itemRow.activities = itemRow.info_activity_assitance.length;
        }
        else {
            itemRow.activities = 0;
        }
    };
    AddComponent = __decorate([
        core_1.Component({
            selector: 'app-abm-planilla-add',
            templateUrl: './add.component.html',
            styleUrls: ['./add.component.scss']
        }),
        __param(5, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AddComponent);
    return AddComponent;
}());
exports.AddComponent = AddComponent;
