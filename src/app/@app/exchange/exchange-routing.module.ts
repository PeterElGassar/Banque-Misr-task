import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeHomeComponent } from './exchange-home/exchange-home.component';
import { ExchangeDetailsComponent } from './exchange-details/exchange-details.component';


export const COMPONENTS = [
  ExchangeHomeComponent,
  ExchangeDetailsComponent
 ];
const routes: Routes = [
  {
    path: 'exchange-home',
    component: ExchangeHomeComponent,
  },
  {
    path: 'exchange-details',
    component: ExchangeDetailsComponent,
  },
  { path: '', redirectTo: 'exchange-home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExchangeRoutingModule {}
