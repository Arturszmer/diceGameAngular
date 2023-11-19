import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinByLinkComponent } from './join-by-link.component';

describe('JoinByLinkComponent', () => {
  let component: JoinByLinkComponent;
  let fixture: ComponentFixture<JoinByLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinByLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinByLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
