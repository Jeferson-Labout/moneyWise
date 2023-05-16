import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { enviremonent } from 'src/enviremonents/enviremonent';
import { CadastroUsuario } from '../interfaces/cadastro-usuario';
import { UtilsService } from './utils.service';
import { LoginUsuario } from '../interfaces/loginUsuario';
import { DownloadImagem } from '../interfaces/downloadImage';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
    , private utilsService: UtilsService) { }

  cadastrarUsuario(usuario: any): Observable<CadastroUsuario> {
    const formData = new FormData();
    formData.append('name', usuario.name);
    formData.append('email', usuario.email);
    formData.append('age', usuario.age);
    formData.append('image', usuario.image);
    formData.append('password', usuario.password);
    formData.append('confirmPassword', usuario.confirmPassword);
    return this.http.post<CadastroUsuario>(enviremonent.BASE_URL + '/auth/register/user', formData).pipe(
      catchError((err) => {
        if (err.status === 0 && err.status !== 404) {
          this.utilsService.showError('Ocorreu um erro na API');

        } else if (err.status === 404) {

          this.utilsService.showError(err.error.message);
        }
        else {

          this.utilsService.showError('Ocorreu um erro no servidor ');
        }
        return throwError(() => err)

      })
    )

  }

  loginUsuario(user: any): Observable<LoginUsuario> {

    return this.http.post<LoginUsuario>(enviremonent.BASE_URL + '/auth/login', user).pipe(
      retry(2),
      catchError((err) => {
        if (err.status === 0 && err.status !== 404) {
          this.utilsService.showError('Ocorreu um erro na API');

        } else if (err.status === 404) {

          this.utilsService.showError(err.error.message);
        }
        else {

          this.utilsService.showError('Ocorreu um erro no servidor ');
        }
        return throwError(() => err)

      })
    )
  }
  downloadImagem(imgNome: string) : Observable<DownloadImagem> {
    const headers = new HttpHeaders().set('imgName', imgNome)
    return this.http.get<DownloadImagem>(enviremonent.BASE_URL + '/download/image', { headers : headers })
    .pipe(
      catchError((err) => {
        if (err.status === 0 && err.status !== 404) {
          this.utilsService.showError('Ocorreu um erro na API');

        } else if (err.status === 404) {

          this.utilsService.showError(err.error.message);
        }
        else {

          this.utilsService.showError('Ocorreu um erro no servidor ');
        }
        return throwError(() => err)

      })


    )
  }
}
