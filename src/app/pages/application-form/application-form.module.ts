import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { ApplicationFormComponent } from './application-form.component';
import { GlobalFunctions } from 'src/shared/globalFunctions';

export const routes = [
  {
    path: '',
    component: ApplicationFormComponent,
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
  declarations: [ApplicationFormComponent],
  providers: [GlobalFunctions]
})
export class ApplicationFormModule { }
