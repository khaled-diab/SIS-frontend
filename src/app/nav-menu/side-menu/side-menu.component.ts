import {AfterViewInit, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit, AfterViewInit {

  @ViewChild('collegeManagementExpansion') collegeManagementExpansion: MatExpansionPanel;
  @ViewChild('studentManagementExpansion') studentManagementExpansion: MatExpansionPanel;
  @ViewChild('collegeManagementExpansion2') collegeManagementExpansion2: MatExpansionPanel;
  @ViewChild('collegeManagementExpansion3') collegeManagementExpansion3: MatExpansionPanel;
  expansionList: MatExpansionPanel[] = [];

  constructor(private renderer: Renderer2) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.expansionList.push(
      this.collegeManagementExpansion,
      this.studentManagementExpansion,
      this.collegeManagementExpansion2,
      this.collegeManagementExpansion3
    );
  }

  closeOtherExpansions(collegeManagementExpansion: MatExpansionPanel): void {
    this.expansionList
      .filter(value => value !== collegeManagementExpansion)
      .forEach(value => value.close());
  }
  closeOtherExpansions2(studentManagementExpansion: MatExpansionPanel): void {
    this.expansionList
      .filter(value => value !== studentManagementExpansion)
      .forEach(value => value.close());
  }
}
