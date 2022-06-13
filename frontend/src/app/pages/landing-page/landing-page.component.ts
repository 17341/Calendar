import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  selected = 'dayGridMonth';

  modalRef: MdbModalRef<ModalComponent> | null = null;
  constructor(
    private modalService: MdbModalService,
    private sharedService: SharedServiceService
  ) {}

  ngOnInit(): void {}

  onAdd() {
    this.modalRef = this.modalService.open(ModalComponent);
  }
  onChange(selected: any) {
    this.selected = selected;
  }
}
