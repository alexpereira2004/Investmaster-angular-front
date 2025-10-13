import { Component, OnInit } from '@angular/core';
import { DividendoService } from "../../../service/dividendo/dividendo.service";
import { MediaDividendos, MediaDividendosValor } from "../../../model/media-dividendos";

@Component({
  standalone: false,
  selector: 'app-dividendo-media',
  templateUrl: './dividendo-media.component.html',
  styleUrls: ['./dividendo-media.component.css']
})
export class DividendoMediaComponent implements OnInit {

  constructor(private dividendoService: DividendoService) { }

  mediaDividendos : MediaDividendos | undefined;
  mediaDividendosValor : MediaDividendosValor[] = []

  ngOnInit(): void {
    this.dividendoService.buscarMediaDividendos().subscribe({
      next: (result: MediaDividendos) => {
        this.mediaDividendos = result;
        this.mediaDividendosValor = this.mediaDividendos.total;
      },
      error: error => {

      }
    })
  }

  atualizar($event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    if (selectedValue == 'A') {
      this.mediaDividendosValor = this.mediaDividendos.acoes;
    } else if (selectedValue == 'F') {
      this.mediaDividendosValor = this.mediaDividendos.fundos;
    } else if (selectedValue == 'B') {
      this.mediaDividendosValor = this.mediaDividendos.outros;
    } else if (selectedValue == 'T') {
      this.mediaDividendosValor = this.mediaDividendos.total;
    }
  }
}
