import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiPeriflComponent } from './mi-perifl.component';

describe('MiPeriflComponent', () => {
  let component: MiPeriflComponent;
  let fixture: ComponentFixture<MiPeriflComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiPeriflComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiPeriflComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
