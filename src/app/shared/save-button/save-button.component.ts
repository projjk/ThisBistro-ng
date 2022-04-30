import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.css']
})
export class SaveButtonComponent implements OnInit {
  @Input() signal$?: Observable<boolean>;

  constructor() {
  }

  ngOnInit(): void {
    if (this.signal$ != null) {
      this.signal$.subscribe(res => {
        // When signal received, execute the following methods
        this.changeButton(res);
      })
    }
  }

  private changeButton(success: boolean) {
    let cssClass = "btn-outline-success";
    let buttonValue = "Saved";
    let button = document.querySelector("#submitButton");

    if (!success) {
      cssClass = "btn-outline-danger"
      buttonValue = "Failed"
    }

    if (button) {
      button.innerHTML = buttonValue;
      button.classList.remove("btn-outline-dark");
      button.classList.add(cssClass);
      setTimeout(() => {
        if (button) {
          button.innerHTML = "Save";
          button.classList.remove(cssClass);
          button.classList.add("btn-outline-dark");
        }
      }, 3000)
    }
  }
}
