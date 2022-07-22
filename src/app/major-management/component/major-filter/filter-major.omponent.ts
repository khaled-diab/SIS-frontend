import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSelect} from '@angular/material/select';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {DepartmentService} from '../../../department-management/service/department.service';
import {MajorRequestModel} from '../../../shared/model/major-management/major-request-model';
import {MajorManagementServiceModule} from '../../service/major-management-service.module';

@Component({
   selector: 'app-major-filter',
   templateUrl: './filter-major.component.html',
   styleUrls: ['./filter-major.component.css']
})
export class FilterMajorComponent implements OnInit, AfterViewInit {
   majorRequestModel: MajorRequestModel = new MajorRequestModel();
   @ViewChild('collegeSelect', {static: true}) collegeSelect: MatSelect;
   @ViewChild('departmentSelect', {static: true}) departmentSelect: MatSelect;

   colleges: CollegeModel[];
   departments: DepartmentModel[];

   constructor(private majorManagementServiceModule: MajorManagementServiceModule,
               private collegeManagementService: CollegeManagementService,
               private departmentService: DepartmentService) {
   }

   ngOnInit(): void {
      this.collegeManagementService.getAllColleges().subscribe(Response => {
         this.colleges = Response;
      });
      this.departmentService.getDepartments();
   }

   ngAfterViewInit(): void {
      this.collegeSelect.valueChange.subscribe(value => {
         if (this.collegeSelect.value !== undefined) {
            this.departmentSelect.setDisabledState(false);
            this.departments = this.departmentService.getDepartmentsByCollege(this.collegeSelect.value);
         } else {
            this.departmentSelect.setDisabledState(true);
         }
         this.majorRequestModel.filterCollege = value;
         this.majorManagementServiceModule.majorFilterEvent.next(this.majorRequestModel);
      });

      this.departmentSelect.valueChange.subscribe(value => {
         this.majorRequestModel.filterDepartment = value;
         this.majorManagementServiceModule.majorFilterEvent.next(this.majorRequestModel);
      });

   }

   applyFilter(): void {
      this.majorManagementServiceModule.majorFilterEvent.next(this.majorRequestModel);
   }

   resetFilter(): void {
      this.collegeSelect.value = undefined;
      this.departmentSelect.value = undefined;
      this.departmentSelect.setDisabledState(true);
      this.majorRequestModel = new MajorRequestModel();
      this.majorManagementServiceModule.majorFilterEvent.next(this.majorRequestModel);
   }
}
