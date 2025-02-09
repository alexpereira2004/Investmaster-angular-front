import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PrincipalComponent } from "./view/dashboard/principal/principal.component";

const routes: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        component: PrincipalComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
