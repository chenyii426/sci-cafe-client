import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import { WithBgImageComponent } from './with-bg-image/with-bg-image.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

export const RegistrationRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Registration'
    },
    children: [
      {
        path: 'with-bg-image',
        component: WithBgImageComponent,
        data: {
          breadcrumb: 'Registration'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RegistrationRoutes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [WithBgImageComponent]
})
export class RegistrationModule { }
