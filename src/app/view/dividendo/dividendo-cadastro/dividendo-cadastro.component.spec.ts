import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividendoCadastroComponent } from './dividendo-cadastro.component';

describe('DividendoCadastroComponent', () => {
  let component: DividendoCadastroComponent;
  let fixture: ComponentFixture<DividendoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DividendoCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DividendoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
