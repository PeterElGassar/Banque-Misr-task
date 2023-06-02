import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { COMPONENTS, ExchangeRoutingModule } from './exchange-routing.module';
import { SharedModule } from 'src/app/@shered/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,
    ExchangeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ExchangeModule { }
