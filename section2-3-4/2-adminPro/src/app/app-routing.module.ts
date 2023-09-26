import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import {  PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

const routes: Routes = [
  //path :  'dashboard' PagesRouting
  //path : 'auth AuthRouting
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: '**',
    component: NoPageFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),PagesRoutingModule,AuthRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
