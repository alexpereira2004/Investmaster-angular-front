import { Component } from '@angular/core';

@Component({
  selector: 'app-monitor-historico',
  templateUrl: './monitor-historico.component.html',
  styleUrl: './monitor-historico.component.css'
})
export class MonitorHistoricoComponent {

  pesquisarHistorico($event: Event) {
    // @TODO
    const input = $event.target as HTMLInputElement;
    console.log('Valor selecionado:', input.value);
  }
}
