import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { HistoriaComponent } from './historia.component';

export const routes = [
  {
    path: '',
    component: HistoriaComponent,
    data: {},
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule,
  ],
  declarations: [HistoriaComponent],
})
export class HistoriaModule { }
