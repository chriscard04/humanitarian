import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { DataSetListComponent } from './dataset-list.component';
import { AddComponent } from './add/add.component';
import { ConfirmationDialogComponent } from 'src/shared/confirmation_dialog/confirmation_dialog.component';
import { AlertDialogComponent } from 'src/shared/alert_dialog/alert_dialog.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


export const routes = [
  {
    path: '',
    component: DataSetListComponent,
    data: {},
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,

    SharedModule,
  ],
  declarations: [DataSetListComponent, AddComponent],
  entryComponents: [
    AddComponent,
    ConfirmationDialogComponent,
    AlertDialogComponent,
  ],
})
export class DataSetListModule { }
