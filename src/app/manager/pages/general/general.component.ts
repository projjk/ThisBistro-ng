import {Component, OnInit, ViewChild} from '@angular/core';
import {ManagerService} from "../../../core/manager.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Subject} from "rxjs";


@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  signal$: Subject<boolean> = new Subject<boolean>();
  generalForm = new FormGroup({
    openHour: new FormControl('', [
      Validators.required
    ]),
    closeHour: new FormControl('', [
      Validators.required
    ]),
    isOpen: new FormControl(false)
  });

  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    this.managerService.getConfig().subscribe(res => {
      this.generalForm.setValue(res);
    })
  }

  onSubmit() {
    if (this.generalForm.invalid) {
      return;
    }

    this.managerService.putConfig(this.generalForm.value)
      .subscribe({
          next: res => {
            // Tell the child component to do execute saved() in its component.
            this.signal$.next(true);
          },
          error: (err) => {
            if (!err.status) {
              this.generalForm.setErrors({ noConnection: true });
            } else {
              this.generalForm.setErrors({ unknownError: true })
            }
          }
        }
      )
  }
}
