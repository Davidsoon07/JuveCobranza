import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaFoto } from './captura-foto';

describe('CapturaFoto', () => {
  let component: CapturaFoto;
  let fixture: ComponentFixture<CapturaFoto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapturaFoto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapturaFoto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
