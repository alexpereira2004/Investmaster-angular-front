import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemDividendoComponent } from './listagem-dividendo.component';

describe('ListagemDividendoComponent', () => {
  let component: ListagemDividendoComponent;
  let fixture: ComponentFixture<ListagemDividendoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemDividendoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemDividendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
