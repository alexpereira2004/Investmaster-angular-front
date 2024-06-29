import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendoEsperadoAlcancadoComponent } from './dividendo-esperado-alcancado.component';

describe('DividendoEsperadoAlcancadoComponent', () => {
  let component: DividendoEsperadoAlcancadoComponent;
  let fixture: ComponentFixture<DividendoEsperadoAlcancadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DividendoEsperadoAlcancadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DividendoEsperadoAlcancadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
