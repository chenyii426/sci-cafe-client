import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'default',
        loadChildren: './dashboard-default/dashboard-default.module#DashboardDefaultModule'
      }, {
        path: 'approve',
        loadChildren: './dashboard-approve/dashboard-approve.module#DashboardApproveModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    SharedModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
