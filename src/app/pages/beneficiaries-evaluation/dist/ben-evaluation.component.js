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
exports.BenEvaluationComponent = void 0;
var core_1 = require("@angular/core");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var moment = require("moment");
var merge_confirmation_component_1 = require("./merge-confirmation/merge-confirmation.component");
var shared_classess_1 = require("src/shared/shared-classess");
var BenEvaluationComponent = /** @class */ (function () {
    function BenEvaluationComponent(dialog, service, _snackBar) {
        this.dialog = dialog;
        this.service = service;
        this._snackBar = _snackBar;
        this.funder = [];
        this.calculated = [];
        this.pending = [];
        this.groups = [];
        this.editing = {};
        this.rows = [];
        this.data = [];
        this.ColumnMode = ngx_datatable_1.ColumnMode;
        this.isEditable = {};
        this.merging = false;
        this.saveEnabled = false;
        this.showLoading = false;
        this.drawer_beneficiary = new shared_classess_1.Beneficiary();
        this.drawer_activities = [];
        this.getData();
    }
    BenEvaluationComponent.prototype.getData = function () {
        var _this = this;
        this.showLoading = true;
        this.service.Get('group-beneficiaries').subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                if (item.ben_birthday) {
                    if (moment(new Date()).month() >= moment(item.ben_birthday).month()) {
                        item.age = moment(new Date()).year() - moment(item.ben_birthday).year();
                    }
                    else {
                        item.age = moment(new Date()).year() - moment(item.ben_birthday).year() - 1;
                    }
                }
                item.merging = false;
                item.separating = false;
                item.flagging = false;
                _this.getDuplicatesQty(item);
            }
            _this.rows = data;
            _this.showLoading = false;
        });
    };
    BenEvaluationComponent.prototype.ngOnInit = function () {
    };
    BenEvaluationComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.table.groupHeader.toggleExpandGroup(_this.table.bodyComponent.groupedRows[0]);
        }, 1500);
    };
    BenEvaluationComponent.prototype.openDrawerActivities = function (data) {
        var _this = this;
        this.drawer_activities = [];
        !this.drawerActivities.opened ? this.drawerActivities.open() : false;
        this.drawer_beneficiary = data;
        console.table(data);
        this.drawer_beneficiary.info_activity_assitance.forEach(function (id_activity) {
            _this.service.Get('infoactivities/' + id_activity).subscribe(function (data) {
                _this.drawer_activities.push(data);
            });
        });
        console.log(this.drawer_beneficiary.info_activity_assitance);
        setTimeout(function () {
            _this.table.recalculateColumns();
            _this.table.recalculate();
            _this.table.resize;
        }, 500);
    };
    BenEvaluationComponent.prototype.closeDrawerActivities = function () {
        var _this = this;
        this.drawerActivities.opened ? this.drawerActivities.close() : false;
        setTimeout(function () {
            _this.table.recalculateColumns();
            _this.table.recalculate();
            _this.table.resize;
        }, 500);
    };
    BenEvaluationComponent.prototype.updateValue = function (event, cell, rowIndex) {
        var _rowindex = [];
        _rowindex = rowIndex.split('-');
        console.log('Event>: ', event);
        console.log('Cell>: ', cell);
        console.log('rowIndex>: ', _rowindex[0], _rowindex[1]);
        // this.editing[rowIndex + '-' + cell] = false;
        // console.table(this.rows[rowIndex][cell]);
        // this.rows[rowIndex][cell] = event.target.value;
        this.rows = __spreadArrays(this.rows);
    };
    BenEvaluationComponent.prototype.toggleGroup = function (group) {
        var _this = this;
        // Collapse all open groups
        this.table.bodyComponent.rowExpansions.forEach(function (row) {
            _this.table.groupHeader.toggleExpandGroup(row);
        });
        // open the current clicked group
        this.table.groupHeader.toggleExpandGroup(group);
    };
    BenEvaluationComponent.prototype.saveMerge = function (group) {
        var _this = this;
        var dialogRef = this.dialog.open(merge_confirmation_component_1.MergeConfirmationComponent, {
            data: group,
            width: '1300px',
            disableClose: true
        });
        dialogRef.componentInstance.row = group;
        dialogRef.componentInstance.isUpdate = true;
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('Result', result);
            _this.getData();
        });
    };
    BenEvaluationComponent.prototype.cancelMerge = function (group, event) {
        event.stopPropagation();
        this.table.groupHeader.toggleExpandGroup(group);
        /*
        this._snackBar.open('Changes Canceled!', '', {
          duration: 4500,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        }); */
    };
    BenEvaluationComponent.prototype.onDetailToggle = function (event) {
        // console.log('Detail Toggled', event);
    };
    BenEvaluationComponent.prototype.getDuplicatesQty = function (itemRow) {
        if (itemRow.suggested_duplicates) {
            itemRow.duplicates_qty = itemRow.suggested_duplicates.length;
        }
        else {
            itemRow.duplicates_qty = 0;
        }
    };
    BenEvaluationComponent.prototype.checkGroup = function (event, row, rowIndex, group) {
        if (event != undefined) {
            /*   console.log("Event: ", event)
                console.log("Row: ", row)
                console.log("RIndex: ", rowIndex)
                console.log("Group: ", group)
             */
            if (event.checked) {
                if (event.source.id == 'merging' + rowIndex) {
                    row.separating = false;
                    row.flagging = false;
                }
                else if (event.source.id == 'separating' + rowIndex) {
                    row.merging = false;
                    row.flagging = false;
                }
                else {
                    row.merging = false;
                    row.separating = false;
                }
            }
            // Count check in a group
            var checkcount_1 = 0;
            group.forEach(function (row) {
                if (row.separating == true || row.merging == true || row.flagging == true) {
                    checkcount_1 += 1;
                }
            });
            // Enable save in a group once the checks are complete within the group
            if (checkcount_1 == group.length) {
                this.saveEnabled = true;
            }
            else {
                this.saveEnabled = false;
            }
        }
        /*
        let groupStatus = 'Pending';
        let expectedPaymentDealtWith = true;
    
        row.exppayyes = 0;
        row.exppayno = 0;
        row.exppaypending = 0;
    
        if (event.target.checked) {
          if (event.target.value === '0') {
            // expected payment yes selected
            row.exppayyes = 1;
          } else if (event.target.value === '1') {
            // expected payment yes selected
            row.exppayno = 1;
          } else if (event.target.value === '2') {
            // expected payment yes selected
            row.exppaypending = 1;
          }
        }
    
        if (group.length === 2) {
          // There are only 2 lines in a group
          // tslint:disable-next-line:max-line-length
          if (
            ['Calculated', 'Funder'].indexOf(group[0].source) > -1 &&
            ['Calculated', 'Funder'].indexOf(group[1].source) > -1
          ) {
            // Sources are funder and calculated
            // tslint:disable-next-line:max-line-length
            if (group[0].startdate === group[1].startdate && group[0].enddate === group[1].enddate) {
              // Start dates and end dates match
              for (let index = 0; index < group.length; index++) {
                if (group[index].source !== row.source) {
                  if (event.target.value === '0') {
                    // expected payment yes selected
                    group[index].exppayyes = 0;
                    group[index].exppaypending = 0;
                    group[index].exppayno = 1;
                  }
                }
    
                if (group[index].exppayyes === 0 && group[index].exppayno === 0 && group[index].exppaypending === 0) {
                  expectedPaymentDealtWith = false;
                }
                console.log('expectedPaymentDealtWith', expectedPaymentDealtWith);
              }
            }
          }
        } else {
          for (let index = 0; index < group.length; index++) {
            if (group[index].exppayyes === 0 && group[index].exppayno === 0 && group[index].exppaypending === 0) {
              expectedPaymentDealtWith = false;
            }
            console.log('expectedPaymentDealtWith', expectedPaymentDealtWith);
          }
        }
    
        // check if there is a pending selected payment or a row that does not have any expected payment selected
        if (
          group.filter(rowFilter => rowFilter.exppaypending === 1).length === 0 &&
          group.filter(rowFilter => rowFilter.exppaypending === 0 && rowFilter.exppayyes === 0 && rowFilter.exppayno === 0)
            .length === 0
        ) {
          console.log('expected payment dealt with');
    
          // check if can set the group status
          const numberOfExpPayYes = group.filter(rowFilter => rowFilter.exppayyes === 1).length;
          const numberOfSourceFunder = group.filter(rowFilter => rowFilter.exppayyes === 1 && rowFilter.source === 'Funder')
            .length;
          const numberOfSourceCalculated = group.filter(
            rowFilter => rowFilter.exppayyes === 1 && rowFilter.source === 'Calculated'
          ).length;
          const numberOfSourceManual = group.filter(rowFilter => rowFilter.exppayyes === 1 && rowFilter.source === 'Manual')
            .length;
    
          console.log('numberOfExpPayYes', numberOfExpPayYes);
          console.log('numberOfSourceFunder', numberOfSourceFunder);
          console.log('numberOfSourceCalculated', numberOfSourceCalculated);
          console.log('numberOfSourceManual', numberOfSourceManual);
    
          if (numberOfExpPayYes > 0) {
            if (numberOfExpPayYes === numberOfSourceFunder) {
              groupStatus = 'Funder Selected';
            } else if (numberOfExpPayYes === numberOfSourceCalculated) {
              groupStatus = 'Calculated Selected';
            } else if (numberOfExpPayYes === numberOfSourceManual) {
              groupStatus = 'Manual Selected';
            } else {
              groupStatus = 'Hybrid Selected';
            }
          }
        }
    
        group[0].groupstatus = groupStatus; */
    };
    __decorate([
        core_1.ViewChild('myTable')
    ], BenEvaluationComponent.prototype, "table");
    __decorate([
        core_1.ViewChild('drawerActivities')
    ], BenEvaluationComponent.prototype, "drawerActivities");
    __decorate([
        core_1.ViewChild('draweContent')
    ], BenEvaluationComponent.prototype, "draweContent");
    BenEvaluationComponent = __decorate([
        core_1.Component({
            selector: 'app-ben-evaluation',
            templateUrl: './ben-evaluation.component.html',
            styleUrls: ['./ben-evaluation.component.scss']
        })
    ], BenEvaluationComponent);
    return BenEvaluationComponent;
}());
exports.BenEvaluationComponent = BenEvaluationComponent;
