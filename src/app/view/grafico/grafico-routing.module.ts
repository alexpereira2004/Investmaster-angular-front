import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DividendoEsperadoAlcancadoComponent } from "./dividendo-esperado-alcancado/dividendo-esperado-alcancado.component";

const routes: Routes = [
  {
    path: 'grafico',
    children: [
      {
        path: '',
        component: DividendoEsperadoAlcancadoComponent
      },
      {
        path: 'cadastro',
        component: DividendoEsperadoAlcancadoComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class GraficoRoutingModule { }
