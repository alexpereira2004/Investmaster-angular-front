import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {

  titulo: string;

  ngOnInit(): void {
    this.titulo = "Dashboard";
  }

}
