import { Component, OnInit } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-regra-cadastro',
  templateUrl: './regra-cadastro.component.html',
  styleUrl: './regra-cadastro.component.css'
})
export class RegraCadastroComponent implements OnInit {

  componenteSelecionado: string | null = null;

  ngOnInit(): void {
    this.componenteSelecionado = 'padrao';
  }
}
