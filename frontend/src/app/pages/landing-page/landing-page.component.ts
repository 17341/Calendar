import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  selected = 'dayGridMonth';
  admin = false;
  hasteam = false;
  modalRef: MdbModalRef<ModalComponent> | null = null;
  constructor(
    private modalService: MdbModalService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authService.userByToken().subscribe(
      (data) => {
        if (data) {
          data.role == 'Team Leader' ? (this.admin = true) : false;
          data.company_id != null ? (this.hasteam = true) : false;
        }
      },
      (err) => {
        //console.log(err);
      }
    );
  }

  onAdd() {
    this.modalRef = this.modalService.open(ModalComponent);
  }
  onChange(selected: any) {
    this.selected = selected;
  }
}
