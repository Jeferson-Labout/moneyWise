import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { enviremonent } from 'src/enviremonents/enviremonent';
import { CadastroUsuario } from '../interfaces/cadastro-usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  cadastrarUsuario(usuario: any): Observable<CadastroUsuario> {
    const formData = new FormData();
    formData.append('name', usuario.name);
    formData.append('email', usuario.email);
    formData.append('age', usuario.age);
    formData.append('avatar', usuario.avatar);
    formData.append('password', usuario.password);
    formData.append('confirmPassword', usuario.confirmPassword);
    return this.http.post<CadastroUsuario>(enviremonent.BASE_URL + '/auth/register/user', formData).pipe(
      catchError((err) => {
        if (err.status === 0 && err.status !== 404) {
          console.error('Ocorreu um erro na API');

        } else if (err.status === 404) {

          console.error(err.error.message);
        }
        else {

          console.error('Ocorreu um erro no servidor ');
        }
        return throwError(() => err)

      })
    )

  }

}
