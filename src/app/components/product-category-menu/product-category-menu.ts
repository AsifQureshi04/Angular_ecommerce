import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/productService';

@Component({
  selector: 'app-product-category-menu',
  standalone: false,
  templateUrl: './product-category-menu.html',
  styleUrl: './product-category-menu.scss'
})
export class ProductCategoryMenu implements OnInit {

  productCategories: ProductCategory[] = [];
  
  constructor(private productService: ProductService) {
    
  }

  ngOnInit(){
    this.listProductCategories();
  }

  listProductCategories(){
    this.productService.getProductCategories().subscribe(
      (data:any) =>{
        // console.log("Product Cateogries = " + JSON.stringify(data));
        this.productCategories = data;
      }
    )
  }
}
