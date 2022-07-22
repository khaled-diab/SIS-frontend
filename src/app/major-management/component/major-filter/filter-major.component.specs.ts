import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FilterMajorComponent} from './filter-major.omponent';

describe('FilterMajorComponent', () => {
   let component: FilterMajorComponent;
   let fixture: ComponentFixture<FilterMajorComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         declarations: [FilterMajorComponent]
      })
         .compileComponents();
   });

   beforeEach(() => {
      fixture = TestBed.createComponent(FilterMajorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
