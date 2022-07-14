import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ClassroomRequestModel} from '../../../shared/model/classroom-management/classroom-request-model';
import {ClassroomManagementService} from '../../service/classroom-management.service';
import {BuildingModel} from '../../../shared/model/building-management/building-model';
import {BuildingManagementService} from '../../../building-management/service/building-management.service';
import {MatSelect} from '@angular/material/select';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {DepartmentService} from '../../../department-management/service/department.service';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {CollegeManagementService} from '../../../college-management/service/college-management.service';

@Component({
  selector: 'app-classroom-filter',
  templateUrl: './classroom-filter.component.html',
  styleUrls: ['./classroom-filter.component.css']
})
export class ClassroomFilterComponent implements OnInit, AfterViewInit {
  classroomRequestModel: ClassroomRequestModel = new ClassroomRequestModel();
  searchValue: string;
  filterCollege: null;
  filterBuilding?: null;
  buildings: BuildingModel[];
  departments: DepartmentModel[];
  colleges: CollegeModel[];
  @ViewChild('buildingSelect', {static: true})  buildingSelect: MatSelect;
  @ViewChild('collegeSelect', {static: true})  collegeSelect: MatSelect;

  constructor(private classroomManagementService: ClassroomManagementService,
              private buildingManagementService: BuildingManagementService,
              private collegeService: CollegeManagementService) {
  }

  ngOnInit(): void {
    this.searchValue = '';
    // @ts-ignore

    this.collegeService.getAllColleges().subscribe(Response => {
      this.colleges = Response;
    });
    this.buildingManagementService.getBuildings().subscribe(Response => {
      this.buildings = Response;
      console.log(Response);
    });
  }

  applyFilter(): void {
    this.classroomManagementService.classroomFilterEvent.next([this.searchValue, this.filterCollege, this.filterBuilding]);
  }

  resetFilter(): void {
    // this.classroomRequestModel = new ClassroomRequestModel(1, 10);
    this.searchValue = ' ';
    this.filterBuilding = this.filterCollege = null;
    this.classroomManagementService.classroomFilterEvent.next(['', null, null]);
  }

  ngAfterViewInit(): void {
    this.collegeSelect.valueChange.subscribe(value => {
      if (this.collegeSelect.value !== undefined){
        this.buildingSelect.setDisabledState(false);
      }else{
        this.buildingSelect.setDisabledState(true);
        this.buildingSelect.value = undefined;
        this.filterBuilding = undefined;
      }
      this.filterCollege = value;
      this.classroomManagementService.classroomFilterEvent.next([this.searchValue, value, this.filterBuilding]);
    });
    this.buildingSelect.valueChange.subscribe(value => {
      this.filterBuilding = value;
      this.classroomManagementService.classroomFilterEvent.next([this.searchValue, this.filterCollege, value]);
    });
  }
}
