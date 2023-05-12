import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalCadastroComponent } from '../modal-cadastro/modal-cadastro.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  cadastroForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private dialog: MatDialog
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


    });

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

  obterValorFormulario(form: FormGroup, control: string) {

    return form.controls[control].value;
  }


  

}
