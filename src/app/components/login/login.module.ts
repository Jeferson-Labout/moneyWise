import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from 'src/app/shared/shared-material/shared-material.module';
import { ModalCadastroComponent } from '../modal-cadastro/modal-cadastro.component';


@NgModule({
  declarations: [
    LoginComponent,
    ModalCadastroComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    SharedMaterialModule
  ]
})
export class LoginModule { }
