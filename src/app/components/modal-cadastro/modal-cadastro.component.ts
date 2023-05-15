import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { CadastroUsuario } from 'src/app/interfaces/cadastro-usuario';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FormValidations } from 'src/app/shared/validations/form-validations';

@Component({
  selector: 'app-modal-cadastro',
  templateUrl: './modal-cadastro.component.html',
  styleUrls: ['./modal-cadastro.component.scss']
})
export class ModalCadastroComponent implements OnInit, OnDestroy {
  cadastroForm!: FormGroup;
  visualizar!: string | ArrayBuffer | any;
  isDefault: boolean = true;
  destroy$: Subject<boolean> = new Subject<boolean>()
  isDefaultImage = '../../../assets/images/default.png';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
    ,private formBuilder: FormBuilder
    ,private service: ApiService
    ,private serviceLocalStorege: LocalstorageService
    ,private utilsService:UtilsService) {


  }

  ngOnInit() {
    this.criarFormulario()

  }



  criarFormulario() {
    this.cadastroForm = this.formBuilder.group({
      name: [this.data.data?.name, [Validators.required]],
      email: [this.data.data?.email, [Validators.required, Validators.email]],
      age: [this.data.data?.age, [Validators.required]],
      avatar: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, FormValidations.equalsTo('password')]],
    })
  }


  onChange(event: any) {

    if (event.target.files && event.target.files.length > 0) {

      this.isDefault = false;
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.visualizar = reader.result)

      reader.readAsDataURL(file);
      this.cadastroForm.patchValue({
        avatar: file
      })
    }
  }

  criarCadastroUsuario(
    name = this.obterValorFormulario(this.cadastroForm, 'name'),
    email = this.obterValorFormulario(this.cadastroForm, 'email'),
    age = this.obterValorFormulario(this.cadastroForm, 'age'),
    image = this.obterValorFormulario(this.cadastroForm, 'avatar'),
    password = this.obterValorFormulario(this.cadastroForm, 'password'),
    confirmPassword = this.obterValorFormulario(this.cadastroForm, 'confirmPassword')


  ) {

    const dadosUsuario = {
      name,
      email,
      age,
      image,
      password,
      confirmPassword
    }
    return dadosUsuario


  }

  obterValorFormulario(form: FormGroup, control: string) {

    return form.controls[control].value;
  }
  submit() {
    if (this.isValidFormulario()) {
      this.service.cadastrarUsuario(this.criarCadastroUsuario()).pipe(

        takeUntil(this.destroy$)

      ).subscribe((res: CadastroUsuario) => {

        this.utilsService.showSuccess(res.message)


        this.serviceLocalStorege.setLocalStorage('userInfo', JSON.stringify(res.user));
        this.atualizaPagina();
      })

    }
  }


  isValidFormulario(): boolean {

    return this.cadastroForm.valid;
  }

  atualizaPagina(){
    setTimeout(() => {
      location.reload();
    }, 3000);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
   
  }
}
