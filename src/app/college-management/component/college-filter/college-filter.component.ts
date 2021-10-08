import {Component, OnInit} from '@angular/core';
import {CollegeFilterModel} from '../../model/college-filter-model';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-college-filter',
  templateUrl: './college-filter.component.html',
  styleUrls: ['./college-filter.component.css']
})
export class CollegeFilterComponent implements OnInit {
  collegeFilterModel: CollegeFilterModel = new CollegeFilterModel();
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
