import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivoCadastroComponent } from './ativo-cadastro.component';

describe('AtivoCadastroComponent', () => {
  let component: AtivoCadastroComponent;
  let fixture: ComponentFixture<AtivoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtivoCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtivoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
