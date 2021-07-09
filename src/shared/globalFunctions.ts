import { FormGroup, FormControl } from "@angular/forms";
import { Injectable } from '@angular/core';

// imports Excel:
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
interface Month {
    index: number,
    mes: string,
    month: string,
}

@Injectable()
export class GlobalFunctions {
    private headers: string[] = [];

    private meses: Month[] = [
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

    getMonths() {
        return this.meses;
    }
    getAllMonths() {
        const temp_mes = this.meses;
        temp_mes.splice(0, 0, { index: 0, mes: 'TODOS', month: 'ALL' });
        return temp_mes;
    }

    validateAllFormFields(formGroup: FormGroup) {         //{1}
        Object.keys(formGroup.controls).forEach(field => {  //{2}
            const control = formGroup.get(field);             //{3}
            if (control instanceof FormControl) {             //{4}
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {        //{5}
                this.validateAllFormFields(control);            //{6}
            }
        });
    }

    successMessage(message = 'Cambios guardados correctamente') {
        return {
            show: true,
            status: 'primary',
            text: message
        };
    }

    errorMessage(message = 'Favor completar todos los campos') {
        return {
            show: true,
            status: 'warn',
            text: message
        };
    }

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