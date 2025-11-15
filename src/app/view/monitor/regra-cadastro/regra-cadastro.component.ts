import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-regra-cadastro',
  templateUrl: './regra-cadastro.component.html',
  styleUrl: './regra-cadastro.component.css'
})
export class RegraCadastroComponent implements OnInit {

  @Input() codigo: string;
  componenteSelecionado: string | null = null;

  ngOnInit(): void {
    this.componenteSelecionado = 'padrao';
  }
}
