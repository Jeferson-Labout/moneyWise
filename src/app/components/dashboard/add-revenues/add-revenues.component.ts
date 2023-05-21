import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-add-revenues',
  templateUrl: './add-revenues.component.html',
  styleUrls: ['./add-revenues.component.scss']
})
export class AddRevenuesComponent implements OnInit {

  cadastroForm!: FormGroup;
  typeRevenue!: string;
  revenues!: Category[];

  constructor(private formBuilder: FormBuilder, @Inject(DOCUMENT) private document: any) {


  }
  ngOnInit(): void {
    this.criarFormulario();
    this.dataFutura();
    this.revenues = [
      {
        name: 'Sálario'
      },
      {
        name: 'Outros'
      },
      {
        name: 'Férias '
      },
      {
        name: 'Notas'
      }
    ]
  }

  criarFormulario() {

    this.cadastroForm = this.formBuilder.group({
      typeRevenue: [null, Validators.required],
      value: [null, Validators.required],
      dateEntry: [null, Validators.required],
      fixedRevenue: [0, Validators.required],
    });
  }

  dataFutura() {
    const inputData = this.document.querySelector('#dateEntry');
    let date = new Date();

    let mes: any = date.getMonth() + 1;
    let dia: any = date.getDate();
    let ano = date.getFullYear();

    if (mes < 10) {
      mes = '0' + mes.toString();
    }
    if (dia < 10) {
      dia = '0' + dia.toString();
    }

    let maxData = ano + '-' + mes + '-' + dia;
    inputData.max = maxData;
  }

  submit() {
    this.cadastroForm.patchValue({
      typeRevenue: this.typeRevenue
    })

  }
}
