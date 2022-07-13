import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportedUsersComponent } from './imported-users.component';

describe('ImportedUsersComponent', () => {
  let component: ImportedUsersComponent;
  let fixture: ComponentFixture<ImportedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportedUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
