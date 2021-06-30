import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../../../shared/alert_dialog/alert_dialog.component';
import { WebApi } from 'src/app/security/_services/service';
import { ListService } from '../../list.service';

@Component({
    selector: 'app-abm-planilla-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
    public isUpdate: boolean;
    public row: any;
    public form: FormGroup;
    public title = 'Nuevo registro';
    public previousRow = false;
    public nextRow = false;
    public message = {
        show: false,
        status: 'primary',
        text: ''
    };
    showLoading = false;

    _suggested_duplicates: any = [];
    _temp: any = [];
    fechaDesde = new Date();
    fechaHasta = new Date();

    constructor(public dialogRef: MatDialogRef<AddComponent>,
        public fb: FormBuilder,
        public router: Router,
        public dialog: MatDialog,
        public service: ListService,
        @Inject(MAT_DIALOG_DATA) public data: any) {

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

    ngOnInit(): void {
    }

    public closeModal(): void {
        if (this.form.valid) {
            this.dialogRef.close();
        }
    }

    onDateChange() {
        console.log("Changeee")
        this.fechaDesde = this.form.controls.fecha_desde.value;
        this.fechaHasta = this.form.controls.fecha_hasta.value;
    }


    public onSubmit(values: any, closeModal = false): void {
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
    }

    setValues(row) {
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
        let temp_id_duplicates = row.suggested_duplicates;
        this.getActivitiesQty(row);
        row.avg_dist = 1;
        this._suggested_duplicates.push(row);
        if (temp_id_duplicates) {
            temp_id_duplicates.forEach(ben => {
                this.service.Get('beneficiaries/' + ben.id).subscribe((ben_suggested) => {
                    // If blank add '-' as indicative
                    ben_suggested.ben_first_name = ben_suggested.ben_first_name == '' ? '-' : ben_suggested.ben_first_name
                    ben_suggested.ben_middle_name = ben_suggested.ben_middle_name == '' ? '-' : ben_suggested.ben_middle_name
                    ben_suggested.ben_last_name1 = ben_suggested.ben_last_name1 == '' ? '-' : ben_suggested.ben_last_name1
                    ben_suggested.ben_last_name2 = ben_suggested.ben_last_name2 == '' ? '-' : ben_suggested.ben_last_name2
                    // Add the distances result from assessment
                    ben_suggested.avg_dist = ben.avg_dist;
                    ben_suggested.fn_dist = ben.fn_dist;
                    ben_suggested.mn_dist = ben.mn_dist;
                    ben_suggested.ln1_dist = ben.ln1_dist;
                    ben_suggested.ln2_dist = ben.ln2_dist;
                    ben_suggested.bd_dist = ben.bd_dist;
                    this.getActivitiesQty(ben_suggested);
                    this._suggested_duplicates.push(ben_suggested);
                    this._suggested_duplicates = [...this._suggested_duplicates];
                });
            });
        } else {
            console.log('no duplicates here!')
        }

        this.showLoading = false;


    }

    ngAfterViewInit() {
        this.checkControlButtons();

        if (this.isUpdate) {
            setTimeout(() => {
                this.title = 'Comparison';

                this.setValues(this.row);
            });
        }
    }

    checkControlButtons() {
        // ACTIVAR O DESACTIVAR BOTONES ATRAS Y SIGUIENTE
        const actualPosition = this.data.indexOf(this.row) + 1;
        const maxPosition = this.data.length;
        if (actualPosition === 1 && maxPosition === 1) {
            this.previousRow = true;
            this.nextRow = true;
        } else if (actualPosition > 1 && actualPosition < maxPosition) {
            this.previousRow = false;
            this.nextRow = false;
        } else if (actualPosition === 1 && actualPosition < maxPosition) {
            this.previousRow = true;
            this.nextRow = false;
        } else if (actualPosition === maxPosition && actualPosition > 1) {
            this.previousRow = false;
            this.nextRow = true;
        }
    }

    previous() {
        this.message.show = false;

        this.row = this.data[this.data.indexOf(this.row) - 1];
        this.checkControlButtons();
        setTimeout(() => {
            this.title = 'Editar';
            // SETEA VALORES INICIALES SI ES ACTUALIZACION
            this.setValues(this.row);
        });
    }

    next() {
        this.message.show = false;

        this.row = this.data[this.data.indexOf(this.row) + 1];
        this.checkControlButtons();
        setTimeout(() => {
            this.title = 'Editar';
            // SETEA VALORES INICIALES SI ES ACTUALIZACION
            this.setValues(this.row);
        });
    }

    getActivitiesQty(itemRow) {
        if (itemRow.info_activity_assitance) {
            itemRow.activities = itemRow.info_activity_assitance.length;
        } else {
            itemRow.activities = 0;
        }
    }

}
