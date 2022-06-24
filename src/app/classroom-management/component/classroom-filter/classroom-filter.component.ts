import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ClassroomRequestModel} from '../../../shared/model/classroom-management/classroom-request-model';
import {ClassroomManagementService} from '../../service/classroom-management.service';
import {BuildingModel} from '../../../shared/model/building-management/building-model';
import {BuildingManagementService} from '../../../building-management/service/building-management.service';
import {MatSelect} from '@angular/material/select';
import {DepartmentModel} from '../../../shared/model/department-management/department-model';
import {DepartmentService} from '../../../department-management/service/department.service';

@Component({
  selector: 'app-classroom-filter',
  templateUrl: './classroom-filter.component.html',
  styleUrls: ['./classroom-filter.component.css']
})
export class ClassroomFilterComponent implements OnInit, AfterViewInit {
  classroomRequestModel: ClassroomRequestModel = new ClassroomRequestModel();
  searchValue: string;
  filterDepartment: null;
  filterBuilding?: null;
  buildings: BuildingModel[];
  departments: DepartmentModel[];
  @ViewChild('buildingSelect', {static: true})  buildingSelect: MatSelect;
  @ViewChild('departmentSelect', {static: true})  departmentSelect: MatSelect;

  constructor(private classroomManagementService: ClassroomManagementService,
              private buildingManagementService: BuildingManagementService,
              private departmentService: DepartmentService) {
  }

  ngOnInit(): void {
    this.searchValue = '';
    // @ts-ignore

    this.departmentService.getDepartments().subscribe(Response => {
      this.departments = Response;
    });
    this.buildingManagementService.getBuildings().subscribe(Response => {
      this.buildings = Response;
      console.log(Response);
    });
  }

  applyFilter(): void {
    this.classroomManagementService.classroomFilterEvent.next([this.searchValue, this.filterDepartment, this.filterBuilding]);
  }

  resetFilter(): void {
    // this.classroomRequestModel = new ClassroomRequestModel(1, 10);
    this.searchValue = ' ';
    this.filterBuilding = this.filterDepartment = null;
    this.classroomManagementService.classroomFilterEvent.next(['', null, null]);
  }

  ngAfterViewInit(): void {
    this.departmentSelect.valueChange.subscribe(value => {
      if (this.departmentSelect.value !== undefined){
        this.buildingSelect.setDisabledState(false);
      }else{
        this.buildingSelect.setDisabledState(true);
        this.buildingSelect.value = undefined;
        this.filterBuilding = undefined;
      }
      this.filterDepartment = value;
      this.classroomManagementService.classroomFilterEvent.next([this.searchValue, value, this.filterBuilding]);
    });
    this.buildingSelect.valueChange.subscribe(value => {
      this.filterBuilding = value;
      this.classroomManagementService.classroomFilterEvent.next([this.searchValue, this.filterDepartment, value]);
    });
  }
}
