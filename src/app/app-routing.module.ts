import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Guard } from './guards/guard.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    loadChildren:()=> import('./components/login/login.module').then((m)=> m.LoginModule)
  },
  {
    path:'dashboard',
    loadChildren:()=> import('./components/dashboard/dashboard.module').then((m)=> m.DashboardModule),
    canActivate:[Guard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
