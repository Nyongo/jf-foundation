import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyFocusComponent } from './key-focus.component';

describe('KeyFocusComponent', () => {
  let component: KeyFocusComponent;
  let fixture: ComponentFixture<KeyFocusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeyFocusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
