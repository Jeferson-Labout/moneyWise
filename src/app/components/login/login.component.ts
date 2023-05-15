import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalCadastroComponent } from '../modal-cadastro/modal-cadastro.component';
import { ApiService } from 'src/app/services/api.service';
import { Subject, takeUntil } from 'rxjs';
import { LoginUsuario } from 'src/app/interfaces/loginUsuario';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  cadastroForm!: FormGroup;
  loginForm!: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private formBuilder: FormBuilder,
    private dialog: MatDialog
    , private service: ApiService
    , private localStorage: LocalstorageService
    , private utilService: UtilsService
    , private router: Router
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
      this.service.loginUsuario(this.criarDadosLogin())
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: LoginUsuario) => {

          let { token } = res;
          this.localStorage.setLocalStorage('token',JSON.stringify(token))
          this.localStorage.setLocalStorage('user', JSON.stringify(email))
          this.utilService.showSuccess('Login realizado com sucesso')
          this.navigationUrl('dashboard')


        })


    }
  }

  navigationUrl(url: string) {
    this.router.navigate([`/${url}`])
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
