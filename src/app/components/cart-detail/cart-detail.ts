import { Component } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cartService';

@Component({
  selector: 'app-cart-detail',
  standalone: false,
  templateUrl: './cart-detail.html',
  styleUrl: './cart-detail.scss'
})
export class CartDetail {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {

  }

  ngOnInit() : void{
    this.listCartDetails();
  }

  listCartDetails() {
    this.cartItems = this.cartService.cartItems;
    
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    console.log(`totalPrice:${this.totalPrice}`);

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.computeCartTotal();

    console.log(`totalQuantity:${this.totalQuantity}`);

  }

  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }

  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

remove(theCartItem: CartItem) {
  this.cartService.remove(theCartItem);
}

}
