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
exports.TestComponent = void 0;
var core_1 = require("@angular/core");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var moment = require("moment");
var TestComponent = /** @class */ (function () {
    function TestComponent(service) {
        var _this = this;
        this.service = service;
        this.funder = [];
        this.calculated = [];
        this.pending = [];
        this.groups = [];
        this.editing = {};
        this.rows = [];
        this.ColumnMode = ngx_datatable_1.ColumnMode;
        this.service.Get('group-beneficiaries').subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                if (item.ben_birthday) {
                    item.age = moment(new Date()).year() - moment(item.ben_birthday).year();
                }
            }
            _this.rows = data;
        });
        /*  this.fetch(data => {
           this.rows = data;
         }); */
    }
    TestComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', '../../../assets/data/forRowGrouping.json');
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    TestComponent.prototype.getGroupRowHeight = function (group, rowHeight) {
        var style = {};
        style = {
            height: group.length * 40 + 'px',
            width: '100%'
        };
        return style;
    };
    TestComponent.prototype.checkGroup = function (event, row, rowIndex, group) {
        var groupStatus = 'Pending';
        var expectedPaymentDealtWith = true;
        row.exppayyes = 0;
        row.exppayno = 0;
        row.exppaypending = 0;
        if (event.target.checked) {
            if (event.target.value === '0') {
                // expected payment yes selected
                row.exppayyes = 1;
            }
            else if (event.target.value === '1') {
                // expected payment yes selected
                row.exppayno = 1;
            }
            else if (event.target.value === '2') {
                // expected payment yes selected
                row.exppaypending = 1;
            }
        }
        if (group.length === 2) {
            // There are only 2 lines in a group
            // tslint:disable-next-line:max-line-length
            if (['Calculated', 'Funder'].indexOf(group[0].source) > -1 &&
                ['Calculated', 'Funder'].indexOf(group[1].source) > -1) {
                // Sources are funder and calculated
                // tslint:disable-next-line:max-line-length
                if (group[0].startdate === group[1].startdate && group[0].enddate === group[1].enddate) {
                    // Start dates and end dates match
                    for (var index = 0; index < group.length; index++) {
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
        }
        else {
            for (var index = 0; index < group.length; index++) {
                if (group[index].exppayyes === 0 && group[index].exppayno === 0 && group[index].exppaypending === 0) {
                    expectedPaymentDealtWith = false;
                }
                console.log('expectedPaymentDealtWith', expectedPaymentDealtWith);
            }
        }
        // check if there is a pending selected payment or a row that does not have any expected payment selected
        if (group.filter(function (rowFilter) { return rowFilter.exppaypending === 1; }).length === 0 &&
            group.filter(function (rowFilter) { return rowFilter.exppaypending === 0 && rowFilter.exppayyes === 0 && rowFilter.exppayno === 0; })
                .length === 0) {
            console.log('expected payment dealt with');
            // check if can set the group status
            var numberOfExpPayYes = group.filter(function (rowFilter) { return rowFilter.exppayyes === 1; }).length;
            var numberOfSourceFunder = group.filter(function (rowFilter) { return rowFilter.exppayyes === 1 && rowFilter.source === 'Funder'; })
                .length;
            var numberOfSourceCalculated = group.filter(function (rowFilter) { return rowFilter.exppayyes === 1 && rowFilter.source === 'Calculated'; }).length;
            var numberOfSourceManual = group.filter(function (rowFilter) { return rowFilter.exppayyes === 1 && rowFilter.source === 'Manual'; })
                .length;
            console.log('numberOfExpPayYes', numberOfExpPayYes);
            console.log('numberOfSourceFunder', numberOfSourceFunder);
            console.log('numberOfSourceCalculated', numberOfSourceCalculated);
            console.log('numberOfSourceManual', numberOfSourceManual);
            if (numberOfExpPayYes > 0) {
                if (numberOfExpPayYes === numberOfSourceFunder) {
                    groupStatus = 'Funder Selected';
                }
                else if (numberOfExpPayYes === numberOfSourceCalculated) {
                    groupStatus = 'Calculated Selected';
                }
                else if (numberOfExpPayYes === numberOfSourceManual) {
                    groupStatus = 'Manual Selected';
                }
                else {
                    groupStatus = 'Hybrid Selected';
                }
            }
        }
        group[0].groupstatus = groupStatus;
    };
    TestComponent.prototype.updateValue = function (event, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        this.rows = __spreadArrays(this.rows);
    };
    TestComponent.prototype.toggleExpandGroup = function (group) {
        console.log('Toggled Expand Group!', group);
        this.table.groupHeader.toggleExpandGroup(group);
    };
    TestComponent.prototype.onDetailToggle = function (event) {
        console.log('Detail Toggled', event);
    };
    __decorate([
        core_1.ViewChild('myTable')
    ], TestComponent.prototype, "table");
    TestComponent = __decorate([
        core_1.Component({
            selector: 'row-grouping-demo',
            templateUrl: './test.component.html'
        })
    ], TestComponent);
    return TestComponent;
}());
exports.TestComponent = TestComponent;
