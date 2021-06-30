"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.scheduleModel = exports.DataSetListComponent = void 0;
var core_1 = require("@angular/core");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var add_component_1 = require("./add/add.component");
var confirmation_dialog_component_1 = require("src/shared/confirmation_dialog/confirmation_dialog.component");
var DataSetListComponent = /** @class */ (function () {
    function DataSetListComponent(dialog, service) {
        this.dialog = dialog;
        this.service = service;
        this.loadingIndicator = true;
        this.rows = [];
        this.data = [];
        this.temp = [];
        this.count_unique = 0;
        this.count_review = 0;
        this.count_possibles = 0;
        this.total_datasets = 0;
        this.message = {
            show: false,
            status: 'warn',
            text: ''
        };
        this.showLoading = false;
        this.rowSelected = [];
        /* Filters */
        this.filterName = '';
        this.filterDescription = '';
        this.drawer_activities = [];
        this.getData();
    }
    DataSetListComponent.prototype.ngOnInit = function () { };
    DataSetListComponent.prototype.getData = function () {
        var _this = this;
        this.showLoading = true;
        this.service.Get('datasets').subscribe(function (data) {
            data.forEach(function (dataset) {
                dataset.total = dataset.beneficiaries.length;
            });
            _this.service.Get('datasets/count').subscribe(function (data) {
                _this.total_datasets = data;
            });
            _this.temp = __spreadArrays(data);
            _this.rows = data;
            _this.data = data;
            _this.showLoading = false;
        });
    };
    DataSetListComponent.prototype.openDrawerActivities = function (data) {
        var _this = this;
        this.drawer_activities = [];
        !this.drawerActivities.opened ? this.drawerActivities.open() : false;
        setTimeout(function () {
            _this.table.recalculateColumns();
            _this.table.recalculate();
            _this.table.resize;
        }, 500);
    };
    DataSetListComponent.prototype.closeDrawerActivities = function () {
        var _this = this;
        this.drawerActivities.opened ? this.drawerActivities.close() : false;
        setTimeout(function () {
            _this.table.recalculateColumns();
            _this.table.recalculate();
            _this.table.resize;
        }, 500);
    };
    DataSetListComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        console.log('Select Event', selected, 'Row', this.rowSelected);
        if (selected) {
            this.rowSelected.splice(0, this.rowSelected.length);
            (_b = this.rowSelected).push.apply(_b, selected);
            this.drawerActivities.opened ? this.openDrawerActivities(selected[0]) : false;
        }
    };
    DataSetListComponent.prototype.filterByColumn = function (event, colName) {
        this.data = this.rows;
        if (event.target.value) {
            // get the value of the key pressed and make it lowercase
            var val_1 = event.target.value.toLowerCase();
            // get the amount of columns in the table
            var colsAmt = Object.keys(this.rows[0]).length - 1;
            // get the key names of each column in the dataset
            var keys = Object.keys(this.rows[0]);
            // assign filtered matches to the active datatable
            this.data = this.rows.filter(function (item) {
                // verify the data is not empty to .toString
                if (item[colName] !== null && item[colName] !== undefined) {
                    // check for a match
                    if (item[colName].toString().toLowerCase().indexOf(val_1) !== -1 ||
                        !val_1) {
                        // found match, return true to add to result set
                        return true;
                    }
                }
            });
        }
        // whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    };
    DataSetListComponent.prototype.filterDatatable = function (event) {
        this.data = this.rows;
        // get the value of the key pressed and make it lowercase
        var val = event.target.value.toLowerCase();
        // get the amount of columns in the table
        var colsAmt = Object.keys(this.rows[0]).length - 1;
        // get the key names of each column in the dataset
        var keys = Object.keys(this.rows[0]);
        // assign filtered matches to the active datatable
        this.data = this.rows.filter(function (item) {
            // iterate through each row's column data
            for (var i = 0; i < colsAmt; i++) {
                // verify the data is not empty to .toString
                if (item[keys[i]] !== null && item[keys[i]] !== undefined) {
                    // check for a match
                    if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 ||
                        !val) {
                        // found match, return true to add to result set
                        return true;
                    }
                }
            }
        });
        // whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    };
    DataSetListComponent.prototype["import"] = function () {
        var _this = this;
        this.message.show = false;
        var dialogRef = this.dialog.open(add_component_1.AddComponent, {
            data: this.data,
            width: '1300px',
            disableClose: true
        });
        dialogRef.componentInstance.row = null;
        dialogRef.componentInstance.isUpdate = false;
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === null || result === undefined) {
                _this.rows = __spreadArrays(_this.rows);
            }
            else {
                _this.rows = __spreadArrays(result);
            }
            _this.data = _this.rows;
        });
    };
    DataSetListComponent.prototype.newMerge = function () {
        var _tempSelectedId = [];
        this.rowSelected.forEach(function (rowSel) {
            _tempSelectedId.push(rowSel.id);
        });
        this.service.Post('assess-manual?perc=' + 0, { selectedben: _tempSelectedId }).subscribe(function (data) {
            console.log("data: ", data);
        });
    };
    DataSetListComponent.prototype.update = function (row) {
    };
    DataSetListComponent.prototype["delete"] = function (row) {
        var _this = this;
        var dialogRef = this.dialog.open(confirmation_dialog_component_1.ConfirmationDialogComponent, {
            data: row.nombre_banco,
            width: '600px',
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === null || result === undefined) {
                _this.rows = __spreadArrays(_this.rows);
            }
            else {
                _this.showLoading = true;
                /*         this.service.Delete('pla_bancos', row.idreg_banco).subscribe((data) => {
                          this.message = {
                            show: true,
                            status: 'warn',
                            text: 'Se ha eliminado ' + row.nombre_banco,
                          };
                
                          const index = this.rows.indexOf(row);
                          if (index > -1) {
                            this.rows.splice(index, 1);
                          }
                
                          this.rows = [...this.rows];
                
                          this.data = this.rows;
                
                          this.showLoading = false;
                        }); */
            }
        });
    };
    __decorate([
        core_1.ViewChild(ngx_datatable_1.DatatableComponent)
    ], DataSetListComponent.prototype, "table");
    __decorate([
        core_1.ViewChild('drawerActivities')
    ], DataSetListComponent.prototype, "drawerActivities");
    __decorate([
        core_1.ViewChild('draweContent')
    ], DataSetListComponent.prototype, "draweContent");
    DataSetListComponent = __decorate([
        core_1.Component({
            selector: 'app-dataset-list',
            templateUrl: './dataset-list.component.html',
            styleUrls: ['./dataset-list.component.scss']
        })
    ], DataSetListComponent);
    return DataSetListComponent;
}());
exports.DataSetListComponent = DataSetListComponent;
var scheduleModel = /** @class */ (function () {
    function scheduleModel() {
        this.hour = '';
        this.program = '';
        this.title = '';
        this.length = '';
        this.badge = '';
    }
    return scheduleModel;
}());
exports.scheduleModel = scheduleModel;
