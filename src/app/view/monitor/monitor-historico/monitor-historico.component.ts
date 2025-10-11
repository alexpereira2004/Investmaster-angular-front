import { Component } from '@angular/core';

@Component({
  selector: 'app-monitor-historico',
  templateUrl: './monitor-historico.component.html',
  styleUrl: './monitor-historico.component.css'
})
export class MonitorHistoricoComponent {

  teste($event: Event) {
    const input = $event.target as HTMLInputElement;
    console.log('Valor selecionado:', input.value);
  }
}
