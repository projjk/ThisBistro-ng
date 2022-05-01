import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ManagerService} from "../../../core/manager.service";
import {Order} from "../../../core/models/order";
declare var bootstrap: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderModal: any;
  deleteModal: any;
  currentOrder?: Order;
  signal$: Subject<boolean> = new Subject<boolean>();
  orders: Order[] = [];
  modalTitle = '';
  deleteMessage = '';
  orderStatusEnum = [ "Received", "Confirmed", "Ready", "Paid", "Cancelled" ];


  orderForm = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.min(1)
    ]),
    status: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(4)
    ]),
  });

  constructor(private managerService: ManagerService) {
  }

  ngOnInit(): void {
    this.managerService.getAllOrders().subscribe(res => {
      this.orders = res;
      console.log(this.orders)
    });

    this.orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
  }

  delete(event: Event) {
    const id = this.currentOrder?.id;
    if (!id) return;

    (event.target as HTMLInputElement).setAttribute("disabled", "disabled");
    this.managerService.deleteOrder(id)
      .subscribe({
        next: res => {
          // Update the view
          this.orders.forEach((order, index) => {
            if (order.id === id) this.orders.splice(index, 1);
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
      (event.target as HTMLInputElement).removeAttribute("disabled");
    }, 2000)

    return;
  }

  onSubmit() {
    if (this.orderForm.invalid) {
      console.log("invalid:",this.orderForm);
      this.orderForm.markAllAsTouched();
      this.signal$.next(false);
      return;
    }

    // modifying an existing order
    this.managerService.putOrder(this.orderForm.value)
      .subscribe({
          next: res => {
            // Tell the child component to change the button value in its component.
            this.signal$.next(true);

            const order = this.orders.find(c => c.id === res.id);
            if (order) {
              order.status = res.status;
            }
          },
          error: (err) => {
            console.log("error:",this.orderForm.value);
            console.log(err);
            this.signal$.next(false);
            if (!err.status) {
              this.orderForm.setErrors({ noConnection: true });
            } else if (err.status === 400) {
              this.orderForm.setErrors({ noUpdate: true });
            } else {
              this.orderForm.setErrors({ unknownError: true })
            }
          }
        }
      )
  }

  edit(id: number) {
    // Keeping id for delete method
    this.currentOrder = this.orders.find(o => o.id === id);

    if (id === 0) {
      this.orderForm.reset({arrangement: 0, id: 0, hasPhoto: false, price: 0});
      this.modalTitle = "Add Order";
    } else {
      const order = this.currentOrder;
      if (order == null) return;

      this.orderForm.get("id")?.setValue(order.id);
      this.orderForm.get("status")?.setValue(order.status);
      this.modalTitle = "Edit Order";
    }

    this.orderModal.show()
  }

  toggleModal() {
    this.orderModal.toggle();
    this.deleteModal.toggle();
  }
}
