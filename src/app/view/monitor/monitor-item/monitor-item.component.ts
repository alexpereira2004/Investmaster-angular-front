import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-monitor-item',
  templateUrl: './monitor-item.component.html',
  styleUrl: './monitor-item.component.css'
})
export class MonitorItemComponent {

  @Input() codigo!: string;
  @Input() nome!: string;
  @Input() situacao!: string;

  @Output() nomeMudou = new EventEmitter<string>();

  primeiroClique = true;

  atualizaDados() {
    if (this.primeiroClique) {

      this.primeiroClique = false;
    }
  }
}
