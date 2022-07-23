import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BuildingManagementService} from '../../service/building-management.service';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {MatSelect} from '@angular/material/select';

@Component({
   selector: 'app-building-filter',
   templateUrl: './building-filter.component.html',
   styleUrls: ['./building-filter.component.css']
})
export class BuildingFilterComponent implements OnInit, AfterViewInit {
   collegeSelectValue: undefined;
   colleges: CollegeModel[];
   @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
   searchValue: string;
   filterValue: undefined;

   constructor(private buildingManagementService: BuildingManagementService) {
   }

   ngOnInit(): void {
      this.searchValue = '';
      this.collegeSelectValue = undefined;
      this.buildingManagementService.getColleges().subscribe(Response => {
         this.colleges = Response;
         console.log(Response);
      });
   }

   applyFilter(): void {
      console.log(this.searchValue);
      this.buildingManagementService.buildingFilterEvent.next([this.searchValue, this.filterValue]);
   }

   resetFilter(): void {
      // this.buildingRequestModel = new ClassroomRequestModel(1, 10);
      this.searchValue = '';
      this.filterValue = undefined;
      this.collegeSelectValue = undefined;
      this.buildingManagementService.buildingFilterEvent.next(['', undefined]);
   }

   ngAfterViewInit(): void {
      this.collegeSelect.valueChange.subscribe(value => {
         console.log('changed to ' + value);
         this.filterValue = value;
         this.collegeSelectValue = value;
         this.buildingManagementService.buildingFilterEvent.next([this.searchValue, value]);
      });
   }
}
