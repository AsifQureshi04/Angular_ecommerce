import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cartService';

@Component({
  selector: 'app-card-status',
  standalone: false,
  templateUrl: './card-status.html',
  styleUrl: './card-status.scss'
})
export class CardStatus implements OnInit {
  totalPrice:number = 0.00;
  totalQuantity:number = 0;

  constructor(private cartService: CartService) {   }

  ngOnInit() : void{
    this.updateCartStatus();
  }

  updateCartStatus() {
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )

  }
}
