import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComumComponent } from './comum.component';

describe('ComumComponent', () => {
  let component: ComumComponent;
  let fixture: ComponentFixture<ComumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
