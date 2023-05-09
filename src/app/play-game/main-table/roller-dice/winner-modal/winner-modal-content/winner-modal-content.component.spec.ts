import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerModalContentComponent } from './winner-modal-content.component';

describe('WinnerModalContentComponent', () => {
  let component: WinnerModalContentComponent;
  let fixture: ComponentFixture<WinnerModalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinnerModalContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinnerModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
