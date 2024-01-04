import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivoListagemComponent } from './ativo-listagem.component';

describe('AtivoListagemComponent', () => {
  let component: AtivoListagemComponent;
  let fixture: ComponentFixture<AtivoListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtivoListagemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtivoListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
