import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { BenEvaluationComponent } from './ben-evaluation.component';
import { MergeConfirmationComponent } from './merge-confirmation/merge-confirmation.component';
import { MergeGraphComponent } from './merge-graph/merge-graph.component';

export const routes = [
  {
    path: '',
    component: BenEvaluationComponent,
    data: {},
  },
  {
    path: 'Graph',
    component: MergeGraphComponent,
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
  declarations: [BenEvaluationComponent, MergeConfirmationComponent, MergeGraphComponent],
  entryComponents: [
    MergeConfirmationComponent,
    MergeGraphComponent
  ]
})
export class BenEvaluationModule { }
