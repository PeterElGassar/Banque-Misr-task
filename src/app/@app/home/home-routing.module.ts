import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import all components of home module inside this array 
export const COMPONENTS = [
 HomeComponent

];

const routes: Routes = [

  {
    path: '',
    component: HomeComponent, 
    children: [
      // {
      //   path: 'list',
      //   component: ProductsListComponent
      // },
      // {
      //   path: 'search',
      //   component: ProductsSearchComponent
      // },

      {
        path: '**',
        redirectTo: 'list',
        
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
