import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'confirmation-dialog',
    templateUrl: 'confirmation_dialog.component.html',
    styleUrls: ['./confirmation_dialog.component.scss'],
})
export class ConfirmationDialogComponent {
    public mensaje: string = 'Está seguro que desea eliminar '

    constructor(
        public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }
}
