import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AcademicYearService } from '../../service/academic-year.service';

@Component({
  selector: 'app-academic-year-filter',
  templateUrl: './academic-year-filter.component.html',
  styleUrls: ['./academic-year-filter.component.css']
})
export class AcademicYearFilterComponent implements OnInit {
  dataSource = new MatTableDataSource;
  searchValue = ' ';

  constructor(private service : AcademicYearService) { }

  ngOnInit(): void {
    this.searchValue = '';
  }
  applyFilter(event:any){
    this.service.academicYearFilterEvent.next([this.searchValue]);

  }

}
