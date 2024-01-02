import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { GotyComponent } from './pages/goty/goty.component';

const routes: Routes = [
  {
    path:'index',
    component: IndexComponent
  },
  {
    path: 'goty',
    component: GotyComponent
  },
  {
    path: '**',
    redirectTo: 'index',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
