import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../../../shared/alert_dialog/alert_dialog.component';
import { WebApi } from 'src/app/security/_services/service';
import { ListService } from '../../list.service';
import { SankeyGraph } from 'd3-sankey';
// import { ListService } from '../beneficiaries-list.service';
declare let google: any
@Component({
    selector: 'app-merge-confirmation',
    templateUrl: './merge-confirmation.component.html',
    styleUrls: ['./merge-confirmation.component.scss'],
})
export class MergeConfirmationComponent implements OnInit {
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

    _records_to_merge: any = [];
    _temp: any = [];
    fechaDesde = new Date();
    fechaHasta = new Date();

    isEditable = {};
    rowSelected = [];

    /* 
    * Sankey Data Fields
    */
    sankey_title = 'Merging Chris';
    sankey_type = 'Sankey';

    sankey_height = 350;
    sankey_width = 750;

    sankey_data = [
        ["Chris", "Cod 1.1.1", 1],
        ["Cod 1.1.1", "Christofher", 1],

        ["Christian", "Cod 1.1.1", 1],
        ["Cod 1.1.1", "Christofher", 1],
    ];

    sankey_columnNames = ['From', 'To', 'Weight'];
    sankey_colors = [
        '#33a02c',
        '#1f78b4',
        '#a6cee3',
        '#b2df8a',
    ]

    sankey_options = {
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

    constructor(public dialogRef: MatDialogRef<MergeConfirmationComponent>,
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
        this.setSankey()
        google.charts.load('current', { 'packages': ['sankey'] });
        setTimeout(() => {
            google.charts.setOnLoadCallback(this.drawChart(this.sankey_data));
        }, 1000);

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

    onSelect({ selected }) {
        console.log('Select Event', selected, 'Row', this.rowSelected);
        if (selected) {
            this.rowSelected.splice(0, this.rowSelected.length);
            this.rowSelected.push(...selected);
        }
    }

    setSankey() {
        this.sankey_data = [];

        this._records_to_merge.forEach((row, i) => {
            if (row.id != this.rowSelected[0].id) {
                if (row.info_activity_assitance) {
                    row.info_activity_assitance.forEach(id_activity => {
                        this.service.Get('infoactivities/' + id_activity).subscribe((activity) => {
                            let tempArr1 = [row.ben_first_name + '-' + (i + 1), activity.info_activity_task, 1]
                            let tempArr2 = [activity.info_activity_task, this.rowSelected[0].ben_first_name, 1]
                            this.sankey_data.push(tempArr1);
                            this.sankey_data.push(tempArr2);
                        });
                    });
                }
            }
        });

        setTimeout(() => {
            google.charts.load(this.drawChart(this.sankey_data));
        }, 1000);

        // setTimeOut()
        // console.log(this.sankey_data)
        // this.drawChart(this.sankey_data)
        // google.charts.load('current', { 'packages': ['sankey'] });
        // google.charts.setOnLoadCallback(this.drawChart(this.sankey_data));

    }



    drawChart(newData: any) {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'From');
        data.addColumn('string', 'To');
        data.addColumn('number', 'Weight');
        data.addRows(newData);
        let sankey_colors = [
            '#33a02c',
            '#1f78b4',
            '#a6cee3',
            '#b2df8a',
        ]
        // Sets chart options.
        let options = {
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

    }














    updateValue(event, cell, rowIndex) {
        this.showLoading = true;

        console.log('Event>: ', event)
        console.log('Cell>: ', cell)
        console.log('rowIndex>: ', rowIndex)

        this.showLoading = false;

        // this.editing[rowIndex + '-' + cell] = false;

        // console.table(this.rows[rowIndex][cell]);
        this._records_to_merge[rowIndex][cell] = event.target.value;

        this._records_to_merge = [...this._records_to_merge];
    }






    public onSubmit(values: any, closeModal = false): void {
        // this.showLoading = true;
        let customBody = {};
        let customMergeData = [];
        let customMergeActivities = [];
        this.message.show = false;

        this._records_to_merge.forEach(row => {
            if (row.id != this.rowSelected[0].id) {
                let tempObj = { merge_status: 'merged', merge_date: new Date(), merge_data: row };
                customMergeData.push(tempObj);
                if (row.info_activity_assitance) {
                    row.info_activity_assitance.forEach(activity => {
                        customMergeActivities.push(activity)
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
        }

        console.log("Custom body", customBody);
        console.log("Rows Selected", this.rowSelected);
        console.log("Records to merge", this._records_to_merge);

        this.service.Post('merge-beneficiaries', customBody).subscribe(result => {
            this.showLoading = false;

            if (closeModal) {
                this.dialogRef.close(this.data);
            }
        },
            error => {
                this.showLoading = false;
            });

    }

    setValues(group) {
        let defaultMainRecord;
        let _max = 0
        this.showLoading = true;
        this._records_to_merge = [];
        // row.avg_dist = 1;
        group.value.forEach((record, i) => {
            this._records_to_merge.push(record);
            this._records_to_merge = [...this._records_to_merge];
            this.getActivitiesQty(record);
            if (record.activities > _max) {
                _max = record.activities;
                defaultMainRecord = i;
            }
        });

        this.rowSelected.push(this._records_to_merge[defaultMainRecord])

        this.showLoading = false;
    }

    ngAfterViewInit() {
        // this.checkControlButtons();

        if (this.isUpdate) {
            setTimeout(() => {
                this.title = 'Merge Confirmation';
                this.setValues(this.row);
            }, 500);
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
