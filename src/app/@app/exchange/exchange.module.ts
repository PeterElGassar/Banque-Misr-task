import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { COMPONENTS, ExchangeRoutingModule } from './exchange-routing.module';
import { SharedModule } from 'src/app/@shered/shared.module';


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ExchangeRoutingModule,
    SharedModule,
  ]
})
export class ExchangeModule { }
