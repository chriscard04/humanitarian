"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GlobalFunctions = void 0;
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var form_fields_json_1 = require("../assets/data/form_fields.json");
// imports Excel:
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
var EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
var EXCEL_EXTENSION = '.xlsx';
var GlobalFunctions = /** @class */ (function () {
    function GlobalFunctions() {
        this.headers = [];
        this.form_fields = form_fields_json_1["default"];
        this.meses = [
            { index: 1, mes: 'ENERO', month: 'JANUARY' },
            { index: 2, mes: 'FEBRERO', month: 'FEBRUARY' },
            { index: 3, mes: 'MARZO', month: 'MARCH' },
            { index: 4, mes: 'ABRIL', month: 'APRIL' },
            { index: 5, mes: 'MAYO', month: 'MAY ' },
            { index: 6, mes: 'JUNIO', month: 'JUNE' },
            { index: 7, mes: 'JULIO', month: 'JULY' },
            { index: 8, mes: 'AGOSTO', month: 'AUGUST' },
            { index: 9, mes: 'SEPTIEMBRE', month: 'SEPTEMBER' },
            { index: 10, mes: 'OCTUBRE', month: 'OCTOBER' },
            { index: 11, mes: 'NOVIEMBRE', month: 'NOVEMBER' },
            { index: 12, mes: 'DICIEMBRE', month: 'DECEMBER' },
        ];
        /*
            // Exportar a Excel
            public exportToExcel(columns: any, data: any, title: string) {
                // se agregan los nombres de columnas
                this.headers = [];
                columns.forEach(col => this.headers.push(col.name));
                // se elimina la columna id_proceso de la data para que no se visualice en el exportable.
                const excel = data;
        
                // se agrega la data a la hoja de excel
                const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excel);
        
                // se recorren las columnas para modificarlas con los nombres definidos.
                const range = XLSX.utils.decode_range(worksheet['!ref']);
                for (let C = range.s.c; C <= range.e.c; ++C) {
                    const address = XLSX.utils.encode_col(C) + '1'; // <-- first row, column number C
                    if (!worksheet[address]) { continue; }
                    worksheet[address].v = this.headers[C];
                }
        
                const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
                const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                this.saveAsExcelFile(excelBuffer, title);
            }
        
            private saveAsExcelFile(buffer: any, fileName: string): void {
                const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
                FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
         */
    }
    GlobalFunctions.prototype.getMonths = function () {
        return this.meses;
    };
    GlobalFunctions.prototype.getAllMonths = function () {
        var temp_mes = this.meses;
        temp_mes.splice(0, 0, { index: 0, mes: 'TODOS', month: 'ALL' });
        return temp_mes;
    };
    GlobalFunctions.prototype.validateAllFormFields = function (formGroup) {
        var _this = this;
        Object.keys(formGroup.controls).forEach(function (field) {
            var control = formGroup.get(field); //{3}
            if (control instanceof forms_1.FormControl) { //{4}
                control.markAsTouched({ onlySelf: true });
            }
            else if (control instanceof forms_1.FormGroup) { //{5}
                _this.validateAllFormFields(control); //{6}
            }
        });
    };
    GlobalFunctions.prototype.successMessage = function (message) {
        if (message === void 0) { message = 'Cambios guardados correctamente'; }
        return {
            show: true,
            status: 'primary',
            text: message
        };
    };
    GlobalFunctions.prototype.errorMessage = function (message) {
        if (message === void 0) { message = 'Favor completar todos los campos'; }
        return {
            show: true,
            status: 'warn',
            text: message
        };
    };
    GlobalFunctions = __decorate([
        core_1.Injectable()
    ], GlobalFunctions);
    return GlobalFunctions;
}());
exports.GlobalFunctions = GlobalFunctions;
