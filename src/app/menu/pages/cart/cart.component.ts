import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../../core/customer.service";
import {Cart} from "../../../core/models/cart";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts: Cart[] = [];
  cartTotal = 0;
  modal = {
    title: "Placing order...",
    body: "Please wait for a while..."
  };
  private apiCall?: Subscription;

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.customerService.getAllCarts().subscribe(res => {
        this.carts = res;
        this.calculatePrice();
      }
    );
  }

  // I really like a synchronized cart feature.
  // To avoid loosing the last state, every quantity change is submitted to the server, instead of keeping them in memory.
  updateQuantity(id: number, increase: boolean) {
    let currentCart = this.carts.find(cart => {
      return cart.id === id;
    });
    if (!currentCart) {
      console.error("Cannot find the cart item!");
      return;
    }

    if (increase) {
      if (currentCart.quantity >= 50) {
        return;
      }
      currentCart.quantity++;
      this.customerService.cartCount$.next(this.customerService.cartCount$.value + 1);
    } else {
      if (currentCart.quantity <= 1) {
        // if there was pending update, then ignore it.
        this.apiCall && this.apiCall.unsubscribe();
        this.deleteCart(currentCart.id);
        return;
      }
      currentCart.quantity--;
      this.customerService.cartCount$.next(this.customerService.cartCount$.value - 1);
    }

    this.calculatePrice()

    // Cancel the previous pending calls so that previous values wouldn't be updated to the view when clicked several times in a short time period.
    this.apiCall && this.apiCall.unsubscribe();
    this.apiCall = this.customerService.putCart(id, currentCart.quantity)
      .subscribe(res => {
        if (currentCart) {
          currentCart.quantity = res.quantity;
        }
      });
  }

  private calculatePrice() {
    this.cartTotal = 0;
    this.carts.forEach(cart => {
      this.cartTotal += cart.menuPrice * cart.quantity;
    })
  }

  private deleteCart(id: number) {
    this.customerService.deleteCart(id)
      .subscribe(res => {
        // Delete the item from carts in memory and update the view.
        this.carts.forEach((cart, index) => {
          if (cart.id === id) this.carts.splice(index, 1);
        })

        this.calculatePrice();
      });
  }

  placeOrder() {
    this.customerService.postOrder().subscribe({
      next: () => {
        this.modal.title = "Thank you!";
        this.modal.body = "<p>We received your order.</p><p>We will send you an email when your meal is ready.</p>";
        this.customerService.cartCount$.next(0);
        setTimeout(() => {this.carts = [];}, 1000);

      },
      error: (err) => {
        if (err.status === 404) {
          this.modal.title = "Oops";
          this.modal.body = "You have no items in your cart.";
        } else {
          this.modal.title = "Oops";
          this.modal.body = "Something went wrong.";
        }
      }
    });
  }
}
