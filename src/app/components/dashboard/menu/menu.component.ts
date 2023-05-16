import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DownloadImagem } from 'src/app/interfaces/downloadImage';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  messageHour!: string;
  nomeUsuario!: SafeResourceUrl;
  imageUsuario!: SafeResourceUrl;
  isDefaultImage = '../../../../assets/images/default.png'
  constructor(private localStorage: LocalstorageService

    , private apiService: ApiService
    , private sanitizer: DomSanitizer
    , private router: Router) {


  }
  ngOnInit(): void {
    this.getNomeUsuario();
    this.getImgUsuario();
  }


  getMessageHour(message: string) {
    this.messageHour = message;
  }

  getNomeUsuario() {
    const nomeUsuario = this.localStorage.getLocalStorage('userInfo');
    this.nomeUsuario = nomeUsuario.name


  }

  getImgUsuario() {
    const imageUsuario = this.localStorage.getLocalStorage('userInfo');
    this.apiService.downloadImagem(imageUsuario.image).subscribe((res: DownloadImagem) => {

      let url = 'data:image/jpg;base64,' + res.image

      this.imageUsuario = this.sanitizer.bypassSecurityTrustResourceUrl(url)

    })



  }
  logout() {

    this.localStorage.removeLocalStorage('token')

    this.router.navigate(['/']);

  }
}
