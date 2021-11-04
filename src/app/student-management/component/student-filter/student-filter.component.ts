import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {StudentFilterModel} from '../../../shared/model/student-management/student-filter-model';
import {StudentManagementService} from '../../service/student-management.service';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';
import {MatSelect} from '@angular/material/select';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {combineAll} from 'rxjs/operators';

@Component({
  selector: 'app-student-filter',
  templateUrl: './student-filter.component.html',
  styleUrls: ['./student-filter.component.css']
})
export class StudentFilterComponent implements OnInit, AfterViewInit {
  studentFilterModel: StudentFilterModel = new StudentFilterModel();
  @ViewChild('collegeSelect', {static: true})  collegeSelect: MatSelect;
  @ViewChild('departmentSelect', {static: true})  departmentSelect: MatSelect;

  colleges: CollegeModel[];
  departments: DepartmentModel[];
  constructor(private studentManagementService: StudentManagementService ) { }



  ngOnInit(): void {
    this.departments = [
      {
        id: 1,
        code: '1',
        nameEn: 'Civil',
        nameAr: 'مدني'
      },
      {
        id: 2,
        code: '2',
        nameEn: 'Computer',
        nameAr: 'حاسبات'

      }
    ];
    this.studentManagementService.getAllColleges().subscribe(Response => {this.colleges = Response;
                                                                          console.log(Response);

      });
  }
  ngAfterViewInit(): void {
    this.collegeSelect.valueChange.subscribe(value => {
      if (this.collegeSelect.value !== undefined){
           this.departmentSelect.setDisabledState(false);
      }else{
         this.departmentSelect.setDisabledState(true);
         this.departmentSelect.value = undefined;
      }
      this.studentFilterModel.collegeId = value;
      console.log('value= ' + value);
      this.studentManagementService.studentFilterEvent.next(this.studentFilterModel);

    });

    this.departmentSelect.valueChange.subscribe(value => {

      this.studentFilterModel.departmentId = value;
      console.log('value= ' + value);
      this.studentManagementService.studentFilterEvent.next(this.studentFilterModel);

    });
  }
  applyFilter(): void {
    this.studentManagementService.studentFilterEvent.next(this.studentFilterModel);
  }

  resetFilter(): void {
    this.studentFilterModel = new StudentFilterModel();
    this.studentManagementService.studentFilterEvent.next(this.studentFilterModel);
  }
}
