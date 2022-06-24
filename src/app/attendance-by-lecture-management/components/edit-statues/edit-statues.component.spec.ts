import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectModule } from '@angular/material/select';

import { EditStatuesComponent } from './edit-statues.component';

describe('EditStatuesComponent', () => {
  let component: EditStatuesComponent;
  let fixture: ComponentFixture<EditStatuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStatuesComponent ]
    })
    .compileComponents();
  });
  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ MatSelectModule ],
      declarations: [ EditStatuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStatuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
