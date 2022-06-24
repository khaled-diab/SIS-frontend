import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SectionManagementService} from '../../service/sectionManagement.service';

@Component({
  selector: 'app-delete-section-modal',
  templateUrl: './delete-section-modal.component.html',
  styleUrls: ['./delete-section-modal.component.css']
})
export class DeleteSectionModalComponent implements OnInit {

  constructor(private bsModalRef: BsModalRef, private sectionManagementService: SectionManagementService) {
  }

  ngOnInit(): void {
  }


  close(): void {
    this.bsModalRef.hide();
  }

  deleteSection(): void {
    this.sectionManagementService.sectionDeleteEvent.next(null);
    this.bsModalRef.hide();
  }
}
