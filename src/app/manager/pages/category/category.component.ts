import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ManagerService} from "../../../core/manager.service";
import {Category} from "../../../core/models/category";

declare var bootstrap: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryModal: any;
  deleteModal: any;
  currentCategoryId = 0;
  signal$: Subject<boolean> = new Subject<boolean>();
  categories: Category[] = [];
  modalTitle = '';
  deleteMessage = '';

  categoryForm = new FormGroup({
    arrangement: new FormControl('', [
      Validators.required,
      Validators.min(0)
    ]),
    name: new FormControl('', [
      Validators.required
    ]),
    id: new FormControl('', [
      Validators.required,
      Validators.min(0)
    ])
  });

  constructor(private managerService: ManagerService) {
  }

  ngOnInit(): void {
    this.managerService.getAllCategories().subscribe(res => {
      this.categories = res;
    })

    this.categoryModal = new bootstrap.Modal(document.getElementById('categoryModal'));
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
  }

  delete() {
    const id = this.currentCategoryId;
    if (!id) return;

    this.managerService.deleteCategory(id)
      .subscribe({
        next: res => {
          // Update the view
          this.categories.forEach((category, index) => {
            if (category.id === id) this.categories.splice(index, 1);
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
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      this.signal$.next(false);
      return;
    }

    // Adding a new category
    if (this.categoryForm.get("id")?.value === 0) {
      this.managerService.postCategory(this.categoryForm.value)
        .subscribe({
          next: res => {
            // Tell the child component to change the button value in its component.
            this.signal$.next(true);
            this.categories.push(res);
          },
          error: (err) => {
            this.signal$.next(false);
            if (!err.status) {
              this.categoryForm.setErrors({noConnection: true});
            } else {
              this.categoryForm.setErrors({unknownError: true})
            }
          }
        });
      return;
    }

    // Modifying an existing category
    this.managerService.putCategory(this.categoryForm.value)
      .subscribe({
          next: res => {
            // Tell the child component to change the button value in its component.
            this.signal$.next(true);

            const category = this.categories.find(c => c.id === res.id);
            if (category) {
              category.name = res.name;
              category.arrangement = res.arrangement;
            }
          },
          error: (err) => {
            this.signal$.next(false);
            if (!err.status) {
              this.categoryForm.setErrors({noConnection: true});
            } else {
              this.categoryForm.setErrors({unknownError: true})
            }
          }
        }
      )
  }

  edit(id: number) {
    // Keeping id for delete method
    this.currentCategoryId = id;

    if (id === 0) {
      this.categoryForm.reset({arrangement: 0, id: 0});
      this.modalTitle = "Add Category";
    } else {
      const category = this.categories.find(c => {
        return c.id === id
      });
      if (category == null) return;

      this.categoryForm.setValue(category);
      this.modalTitle = "Edit Category";
    }

    this.categoryModal.show()
  }

  toggleModal() {
    this.categoryModal.toggle();
    this.deleteModal.toggle();
  }
}
