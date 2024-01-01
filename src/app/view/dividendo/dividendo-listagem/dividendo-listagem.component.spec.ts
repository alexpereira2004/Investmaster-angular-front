import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendoListagemComponent } from './dividendo-listagem.component';

describe('ListagemDividendoComponent', () => {
  let component: DividendoListagemComponent;
  let fixture: ComponentFixture<DividendoListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DividendoListagemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DividendoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
