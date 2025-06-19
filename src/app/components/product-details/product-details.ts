import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/productService';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../common/product';
import { CartService } from '../../services/cartService';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails implements OnInit {

    product: Product = null!
  
  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService:CartService
  ) {
    
  }

  ngOnInit(){
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    })
  }

  handleProductDetails(){
    const theProductId:number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(theProductId).subscribe(
      (data:any) =>{
        this.product = data;
      }
    )
  }

  addToCart() {
    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`)
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }

}
