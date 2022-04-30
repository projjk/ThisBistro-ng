import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.css']
})
export class SaveButtonComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  saved() {
    let button = document.querySelector("#submitButton");
    if (button) {
      button.innerHTML = "Saved";
      button.classList.remove("btn-outline-dark");
      button.classList.add("btn-outline-success");
      setTimeout(() => {
        if (button) {
          button.innerHTML = "Save";
          button.classList.remove("btn-outline-success");
          button.classList.add("btn-outline-dark");
          console.log(button)
        }
      }, 3000)
    }
  }

}
