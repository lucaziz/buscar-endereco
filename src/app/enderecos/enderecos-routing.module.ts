import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnderecosComponent } from './enderecos.component';

const routes: Routes = [
  {
    path: '',
    component: EnderecosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnderecosRoutingModule { }
