import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoresAleatoriasService {

  constructor() { }

  get() {

    const cores = [
      'rgb(255,99,71)',  // Vermelho Tomate
      'rgb(0,191,255)',  // Azul Céu
      'rgb(255,165,0)',  // Laranja
      'rgb(135,206,250)', // Azul Claro
      'rgb(255,69,0)',   // Vermelho Laranja
      'rgb(70,130,180)', // Azul Aço
      'rgb(255,140,0)',  // Laranja Escuro
      'rgb(173,216,230)', // Azul Pálido
      'rgb(255,20,147)', // Rosa Forte
      'rgb(64,224,208)',  // Turquesa,
      'rgb(135,255,71)',
      'rgb(66,109,9)',
      'rgb(255,212,0)',
      'rgb(46,77,95)',
      'rgb(255,69,0)',
      'rgb(50,8,8)',
      'rgb(255,140,0)',
      'rgb(49,204,255)',
      'rgb(255,20,147)',
      'rgb(64,224,208)'
    ];

    return cores[Math.floor(Math.random() * cores.length)];

  }
}
