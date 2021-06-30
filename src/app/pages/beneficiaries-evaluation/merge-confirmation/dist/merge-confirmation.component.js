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
exports.MergeConfirmationComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var MergeConfirmationComponent = /** @class */ (function () {
    function MergeConfirmationComponent(dialogRef, fb, router, dialog, service, data) {
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
        this._records_to_merge = [];
        this._temp = [];
        this.fechaDesde = new Date();
        this.fechaHasta = new Date();
        this.isEditable = {};
        this.rowSelected = [];
        /*
        * Sankey Data Fields
        */
        this.sankey_title = 'Merging Chris';
        this.sankey_type = 'Sankey';
        this.sankey_height = 350;
        this.sankey_width = 750;
        this.sankey_data = [
            ["Chris", "Cod 1.1.1", 1],
            ["Cod 1.1.1", "Christofher", 1],
            ["Christian", "Cod 1.1.1", 1],
            ["Cod 1.1.1", "Christofher", 1],
        ];
        this.sankey_columnNames = ['From', 'To', 'Weight'];
        this.sankey_colors = [
            '#33a02c',
            '#1f78b4',
            '#a6cee3',
            '#b2df8a',
        ];
        this.sankey_options = {
            sankey: {
                node: {
                    colors: this.sankey_colors,
                    label: {
                        fontName: 'Arial Nova',
                        fontSize: 14,
                        color: 'Black',
                        bold: true,
                        italic: false
                    },
                    width: 20
                },
                link: {
                    colorMode: 'gradient',
                    colors: this.sankey_colors
                }
            }
        };
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
    MergeConfirmationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setSankey();
        google.charts.load('current', { 'packages': ['sankey'] });
        setTimeout(function () {
            google.charts.setOnLoadCallback(_this.drawChart(_this.sankey_data));
        }, 1000);
    };
    MergeConfirmationComponent.prototype.closeModal = function () {
        if (this.form.valid) {
            this.dialogRef.close();
        }
    };
    MergeConfirmationComponent.prototype.onDateChange = function () {
        console.log("Changeee");
        this.fechaDesde = this.form.controls.fecha_desde.value;
        this.fechaHasta = this.form.controls.fecha_hasta.value;
    };
    MergeConfirmationComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        console.log('Select Event', selected, 'Row', this.rowSelected);
        if (selected) {
            this.rowSelected.splice(0, this.rowSelected.length);
            (_b = this.rowSelected).push.apply(_b, selected);
        }
    };
    MergeConfirmationComponent.prototype.setSankey = function () {
        var _this = this;
        this.sankey_data = [];
        this._records_to_merge.forEach(function (row, i) {
            if (row.id != _this.rowSelected[0].id) {
                if (row.info_activity_assitance) {
                    row.info_activity_assitance.forEach(function (id_activity) {
                        _this.service.Get('infoactivities/' + id_activity).subscribe(function (activity) {
                            var tempArr1 = [row.ben_first_name + '-' + (i + 1), activity.info_activity_task, 1];
                            var tempArr2 = [activity.info_activity_task, _this.rowSelected[0].ben_first_name, 1];
                            _this.sankey_data.push(tempArr1);
                            _this.sankey_data.push(tempArr2);
                        });
                    });
                }
            }
        });
        setTimeout(function () {
            google.charts.load(_this.drawChart(_this.sankey_data));
        }, 1000);
        // setTimeOut()
        // console.log(this.sankey_data)
        // this.drawChart(this.sankey_data)
        // google.charts.load('current', { 'packages': ['sankey'] });
        // google.charts.setOnLoadCallback(this.drawChart(this.sankey_data));
    };
    MergeConfirmationComponent.prototype.drawChart = function (newData) {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'From');
        data.addColumn('string', 'To');
        data.addColumn('number', 'Weight');
        data.addRows(newData);
        var sankey_colors = [
            '#33a02c',
            '#1f78b4',
            '#a6cee3',
            '#b2df8a',
        ];
        // Sets chart options.
        var options = {
            height: this.sankey_height,
            width: this.sankey_width,
            sankey: {
                node: {
                    colors: sankey_colors,
                    label: {
                        fontName: 'Arial Nova',
                        fontSize: 14,
                        color: 'Black',
                        bold: true,
                        italic: false
                    },
                    width: 10
                },
                link: {
                    colorMode: 'gradient',
                    colors: sankey_colors
                }
            }
        };
        // Instantiates and draws our chart, passing in some options.
        var chart = new google.visualization.Sankey(document.getElementById('sankeyChart'));
        chart.draw(data, options);
        //  google.charts.load('current', { 'packages': ['sankey'] });
        //  google.charts.setOnLoadCallback(this.drawChart(this.sankey_data));
    };
    MergeConfirmationComponent.prototype.updateValue = function (event, cell, rowIndex) {
        this.showLoading = true;
        console.log('Event>: ', event);
        console.log('Cell>: ', cell);
        console.log('rowIndex>: ', rowIndex);
        this.showLoading = false;
        // this.editing[rowIndex + '-' + cell] = false;
        // console.table(this.rows[rowIndex][cell]);
        this._records_to_merge[rowIndex][cell] = event.target.value;
        this._records_to_merge = __spreadArrays(this._records_to_merge);
    };
    MergeConfirmationComponent.prototype.onSubmit = function (values, closeModal) {
        var _this = this;
        if (closeModal === void 0) { closeModal = false; }
        // this.showLoading = true;
        var customBody = {};
        var customMergeData = [];
        var customMergeActivities = [];
        this.message.show = false;
        this._records_to_merge.forEach(function (row) {
            if (row.id != _this.rowSelected[0].id) {
                var tempObj = { merge_status: 'merged', merge_date: new Date(), merge_data: row };
                customMergeData.push(tempObj);
                if (row.info_activity_assitance) {
                    row.info_activity_assitance.forEach(function (activity) {
                        customMergeActivities.push(activity);
                    });
                }
            }
        });
        customBody = {
            id: this.rowSelected[0].id,
            ben_first_name: this.rowSelected[0].ben_first_name,
            ben_middle_name: this.rowSelected[0].ben_middle_name,
            ben_last_name1: this.rowSelected[0].ben_last_name1,
            ben_last_name2: this.rowSelected[0].ben_last_name2,
            merge_activities: customMergeActivities,
            merge_info: customMergeData
        };
        console.log("Custom body", customBody);
        console.log("Rows Selected", this.rowSelected);
        console.log("Records to merge", this._records_to_merge);
        this.service.Post('merge-beneficiaries', customBody).subscribe(function (result) {
            _this.showLoading = false;
            if (closeModal) {
                _this.dialogRef.close(_this.data);
            }
        }, function (error) {
            _this.showLoading = false;
        });
    };
    MergeConfirmationComponent.prototype.setValues = function (group) {
        var _this = this;
        var defaultMainRecord;
        var _max = 0;
        this.showLoading = true;
        this._records_to_merge = [];
        // row.avg_dist = 1;
        group.value.forEach(function (record, i) {
            _this._records_to_merge.push(record);
            _this._records_to_merge = __spreadArrays(_this._records_to_merge);
            _this.getActivitiesQty(record);
            if (record.activities > _max) {
                _max = record.activities;
                defaultMainRecord = i;
            }
        });
        this.rowSelected.push(this._records_to_merge[defaultMainRecord]);
        this.showLoading = false;
    };
    MergeConfirmationComponent.prototype.ngAfterViewInit = function () {
        // this.checkControlButtons();
        var _this = this;
        if (this.isUpdate) {
            setTimeout(function () {
                _this.title = 'Merge Confirmation';
                _this.setValues(_this.row);
            }, 500);
        }
    };
    MergeConfirmationComponent.prototype.checkControlButtons = function () {
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
    MergeConfirmationComponent.prototype.previous = function () {
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
    MergeConfirmationComponent.prototype.next = function () {
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
    MergeConfirmationComponent.prototype.getActivitiesQty = function (itemRow) {
        if (itemRow.info_activity_assitance) {
            itemRow.activities = itemRow.info_activity_assitance.length;
        }
        else {
            itemRow.activities = 0;
        }
    };
    MergeConfirmationComponent = __decorate([
        core_1.Component({
            selector: 'app-merge-confirmation',
            templateUrl: './merge-confirmation.component.html',
            styleUrls: ['./merge-confirmation.component.scss']
        }),
        __param(5, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], MergeConfirmationComponent);
    return MergeConfirmationComponent;
}());
exports.MergeConfirmationComponent = MergeConfirmationComponent;
