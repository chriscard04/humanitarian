"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DataSetListModule = exports.routes = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var shared_module_1 = require("../../../shared/shared.module");
var dataset_list_component_1 = require("./dataset-list.component");
var add_component_1 = require("./add/add.component");
var confirmation_dialog_component_1 = require("src/shared/confirmation_dialog/confirmation_dialog.component");
var alert_dialog_component_1 = require("src/shared/alert_dialog/alert_dialog.component");
exports.routes = [
    {
        path: '',
        component: dataset_list_component_1.DataSetListComponent,
        data: {}
    },
];
var DataSetListModule = /** @class */ (function () {
    function DataSetListModule() {
    }
    DataSetListModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(exports.routes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule,
            ],
            declarations: [dataset_list_component_1.DataSetListComponent, add_component_1.AddComponent],
            entryComponents: [
                add_component_1.AddComponent,
                confirmation_dialog_component_1.ConfirmationDialogComponent,
                alert_dialog_component_1.AlertDialogComponent,
            ]
        })
    ], DataSetListModule);
    return DataSetListModule;
}());
exports.DataSetListModule = DataSetListModule;
