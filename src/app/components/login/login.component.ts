import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalCadastroComponent } from '../modal-cadastro/modal-cadastro.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  cadastroForm!: FormGroup;
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private dialog: MatDialog, private service: ApiService
  ) {



  }

  ngOnInit(): void {
    this.criarFormulario();
  }



  criarFormulario() {
    this.cadastroForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      age: [null, [Validators.required]]


    }),
      this.loginForm = this.formBuilder.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required]]
      })

  }

  abrirModalCadastro() {
    this.dialog.open(ModalCadastroComponent, {

      width: '600px',
      autoFocus: false,
      maxHeight: '90vh',
      data: {
        data: this.criarDadosModal()
      }

    })
  }


  criarDadosModal(
    name = this.obterValorFormulario(this.cadastroForm, 'name'),
    email = this.obterValorFormulario(this.cadastroForm, 'email'),
    age = this.obterValorFormulario(this.cadastroForm, 'age')
  ) {

    const dadosModal = {
      name,
      email,
      age
    }

    return dadosModal;
    
  }


  login() {
    if (this.isValidaformulario()) {

      const { email } = this.criarDadosLogin();
      this.service.loginUsuario(this.criarDadosLogin()).pipe()


    }
  }


  

  isValidaformulario(): boolean {

    return this.loginForm.valid;
  }
  
  criarDadosLogin(
    email = this.obterValorFormulario(this.loginForm, 'email'),
    password = this.obterValorFormulario(this.loginForm, 'password')
  ) {

    const dadosLogin = {
      email,
      password
    }

    return dadosLogin;

  }

  obterValorFormulario(form: FormGroup, control: string) {

    return form.controls[control].value;
  }




}
