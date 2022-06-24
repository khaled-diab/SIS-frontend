import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {CollegeModel} from '../../../shared/model/college-management/college-model';
import {CollegeManagementService} from '../../service/college-management.service';

@Component({
  selector: 'app-create-college',
  templateUrl: './save-college.component.html',
  styleUrls: ['./save-college.component.css']
})
export class SaveCollegeComponent implements OnInit {

  collegeModel: CollegeModel;

  constructor(private breakpointObserver: BreakpointObserver,
              private collegeManagementService: CollegeManagementService) {
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(value => {
      if (value.matches) {
        this.fetchDataFromRouter(history.state);
      }
    });
  }

  save(): void {
    this.collegeManagementService.collegeSaveEvent.next(this.collegeModel);
  }


  public cancel(): void {
    // this.bsModalRef.hide();
  }

  private fetchDataFromRouter(data: any): void {
    if (data.id === undefined) {
      this.collegeModel = new CollegeModel();
    } else {
      this.collegeModel = {...history.state};
    }
  }
}
