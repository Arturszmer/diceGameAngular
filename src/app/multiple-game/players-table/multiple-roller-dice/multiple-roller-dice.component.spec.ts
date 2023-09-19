import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleRollerDiceComponent } from './multiple-roller-dice.component';

describe('MultipleRollerDiceComponent', () => {
  let component: MultipleRollerDiceComponent;
  let fixture: ComponentFixture<MultipleRollerDiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleRollerDiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleRollerDiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
