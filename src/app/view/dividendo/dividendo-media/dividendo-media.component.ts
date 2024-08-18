import { Component, OnInit } from '@angular/core';
import { DividendoService } from "../../../service/dividendo/dividendo.service";
import { MediaDividendos, MediaDividendosValor } from "../../../model/media-dividendos";

@Component({
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
        console.log(result.total);
        this.mediaDividendos = result;
        this.mediaDividendosValor = this.mediaDividendos.total;
      },
      error: error => {

      }
    })
  }

}
