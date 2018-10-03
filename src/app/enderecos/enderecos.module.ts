import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';

import { EnderecosRoutingModule } from './enderecos-routing.module';
import { EnderecosComponent } from './enderecos.component';
import { BuscaEnderecosComponent } from './busca-enderecos/busca-enderecos.component';
import { ListaEnderecosComponent } from './lista-enderecos/lista-enderecos.component';
import { CepMaskDirective } from '../shared/directives/cep-mask.directive';

@NgModule({
  imports: [
    CommonModule,
    EnderecosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FlexLayoutModule
  ],
  declarations: [
    EnderecosComponent, 
    BuscaEnderecosComponent, 
    ListaEnderecosComponent,
    CepMaskDirective
  ]
})
export class EnderecosModule { }
