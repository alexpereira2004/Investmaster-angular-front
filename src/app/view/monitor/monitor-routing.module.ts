import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitorListagemComponent } from "./monitor-listagem/monitor-listagem.component";

const routes: Routes = [
  { path: '', component: MonitorListagemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }
