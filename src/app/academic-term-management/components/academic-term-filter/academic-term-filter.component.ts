import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { AcademicYearService } from 'src/app/academic-year-management/service/academic-year.service';
import { AcademicTermRequestModel } from 'src/app/shared/model/academicTerm-management/academic-term-request-model';
import { AcademicYear } from 'src/app/shared/model/academicYear-Management/academic-year';
import { AcademicTermService } from '../../service/academic-term.service';
@Component({
  selector: 'app-academic-term-filter',
  templateUrl: './academic-term-filter.component.html',
  styleUrls: ['./academic-term-filter.component.css']
})
export class AcademicTermFilterComponent implements OnInit {
  academicTermRequestModel: AcademicTermRequestModel = new AcademicTermRequestModel();
  searchValue='';
  filterAcademicYear: number;
  academicYears: AcademicYear[];
 
  @ViewChild('academicYearSelect', {static: true})  academicYearSelect: MatSelect;
  constructor(private academicTerm : AcademicTermService,
              private academicyear :AcademicYearService) { }

  ngOnInit(): void {
    this.academicyear.getAcademicYears().subscribe(Response => {
      this.academicYears = Response;
      console.log(Response);
    });
   }
   applyFilter(): void {
    this.academicTerm.academicTermFilterEvent.next([this.searchValue, this.filterAcademicYear]);
  }

  resetFilter(): void {
    this.academicTerm.academicTermFilterEvent.next(['', null]);
  }

  ngAfterViewInit(): void {
    this.academicYearSelect.valueChange.subscribe(value => {
     
      this.filterAcademicYear = value;
      this.academicTerm.academicTermFilterEvent.next([this.searchValue, this.filterAcademicYear]);
    });
   
  }

}
