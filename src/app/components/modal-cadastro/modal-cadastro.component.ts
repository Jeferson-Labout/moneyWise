import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-cadastro',
  templateUrl: './modal-cadastro.component.html',
  styleUrls: ['./modal-cadastro.component.scss']
})
export class ModalCadastroComponent implements OnInit {
  cadastroForm!: FormGroup;
  visualizar!: string | ArrayBuffer | any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) {


  }
  ngOnInit() {
    this.criarFormulario()

  }



  criarFormulario() {
    this.cadastroForm = this.formBuilder.group({
      name: [this.data.data?.name,[ Validators.required]],
      email: [this.data.data?.email, [Validators.required, Validators.email]],
      age: [this.data.data?.age, [Validators.required]],
      avatar: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    })
  }


  onChange(event: any){

    if(event.target.files && event.target.files.length > 0){
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      this.cadastroForm.patchValue({
        avatar : file
      })
    }
  }
}
