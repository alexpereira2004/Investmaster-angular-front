import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaTotalInvestidoComponent } from "./meta-total-investido/meta-total-investido.component";

const routes: Routes = [
  {
    path: 'meta',
    children: [
      {
        path: '',
        component: MetaTotalInvestidoComponent
      },
      {
        path: 'total-investido',
        component: MetaTotalInvestidoComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetaRoutingModule { }
