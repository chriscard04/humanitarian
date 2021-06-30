import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'alert-dialog',
    templateUrl: 'alert_dialog.component.html',
    styleUrls: ['alert_dialog.component.scss'],
})
export class AlertDialogComponent {
    title = 'Alerta';

    constructor(
        public dialogRef: MatDialogRef<AlertDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,) {
    }
}
