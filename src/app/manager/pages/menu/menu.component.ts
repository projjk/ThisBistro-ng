import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ManagerService} from "../../../core/manager.service";
import {ManagerMenu} from "../../../core/models/managerMenu";
import {Category} from "../../../core/models/category";

declare var bootstrap: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuModal: any;
  deleteModal: any;
  currentMenuId = 0;
  signal$: Subject<boolean> = new Subject<boolean>();
  menus: ManagerMenu[] = [];
  categories: Category[] = [];
  modalTitle = '';
  deleteMessage = '';

  menuForm = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.min(0)
    ]),
    arrangement: new FormControl('', [
      Validators.required,
      Validators.min(0)
    ]),
    name: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl(''),
    price: new FormControl('', [
      Validators.required,
      Validators.min(0)
    ]),
    hasPhoto: new FormControl(''),
    categoryId: new FormControl('', [
      Validators.required,
      Validators.min(0)
    ]),
  });

  constructor(private managerService: ManagerService) {
  }

  ngOnInit(): void {
    this.managerService.getAllMenus().subscribe(res => {
      this.menus = res;
    });

    this.managerService.getAllCategories().subscribe(res => {
      this.categories = res;
    });

    this.menuModal = new bootstrap.Modal(document.getElementById('menuModal'));
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
  }

  delete() {
    const id = this.currentMenuId;
    if (!id) return;

    this.managerService.deleteMenu(id)
      .subscribe({
        next: res => {
          // Update the view
          this.menus.forEach((menu, index) => {
            if (menu.id === id) this.menus.splice(index, 1);
          })
          this.deleteMessage = "Deleted";
        },
        error: (err) => {
          this.deleteMessage = err.error;
        }
      });

    setTimeout(() => {
      this.deleteMessage = "";
      this.deleteModal.hide();
    }, 2000)

    return;
  }

  onSubmit() {
    if (this.menuForm.invalid) {
      console.log(this.menuForm);
      this.menuForm.markAllAsTouched();
      this.signal$.next(false);
      return;
    }

    // adding a new menu
    if (this.menuForm.get("id")?.value === 0) {
      this.managerService.postMenu(this.menuForm.value)
        .subscribe({
          next: res => {
            // Tell the child component to change the button value in its component.
            this.signal$.next(true);
            this.menus.push(res);
          },
          error: (err) => {
            this.signal$.next(false);
          }
        });
      return;
    }

    // modifying an existing menu
    this.managerService.putMenu(this.menuForm.value)
      .subscribe({
          next: res => {
            // Tell the child component to change the button value in its component.
            this.signal$.next(true);

            const menu = this.menus.find(c => c.id === res.id);
            if (menu) {
              menu.name = res.name;
              menu.arrangement = res.arrangement;
            }
          },
          error: (err) => {
            this.signal$.next(false);
            if (!err.status) {
              this.menuForm.setErrors({ noConnection: true });
            } else if (err.status === 400) {
              this.menuForm.setErrors({ noUpdate: true });
            } else {
              this.menuForm.setErrors({ unknownError: true })
            }
          }
        }
      )
  }

  edit(id: number) {
    // Keeping id for delete method
    this.currentMenuId = id;

    if (id === 0) {
      this.menuForm.reset({arrangement: 0, id: 0, hasPhoto: false, price: 0});
      this.modalTitle = "Add Menu";
    } else {
      const menu = this.menus.find(c => {
        return c.id === id
      });
      if (menu == null) return;

      this.menuForm.get("id")?.setValue(menu.id);
      this.menuForm.get("arrangement")?.setValue(menu.arrangement);
      this.menuForm.get("name")?.setValue(menu.name);
      this.menuForm.get("price")?.setValue(menu.price);
      this.menuForm.get("description")?.setValue(menu.description);
      this.menuForm.get("hasPhoto")?.setValue(menu.hasPhoto); //@todo implement file upload
      (<HTMLInputElement>document.getElementById('formFile')).value = ""; // to reset the path
      this.menuForm.get("categoryId")?.patchValue(menu.categoryId);
      this.modalTitle = "Edit Menu";
    }

    this.menuModal.show()
  }

  toggleModal() {
    this.menuModal.toggle();
    this.deleteModal.toggle();
  }
}
