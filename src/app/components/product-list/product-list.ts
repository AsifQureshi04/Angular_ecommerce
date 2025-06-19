import { Component, DoCheck } from '@angular/core';
import { ProductService } from '../../services/productService';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cartService';


@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  previousKeyword: string = "";

  productCategory: string = '';
  searchMode: boolean = false;

  thePageNumber:number = 1;
  thePageSize:number = 5;
  theTotalElements:number = 0;
  message: string = "Initial Message";

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private theCartService: CartService
  ) {
    
  }

  // ngDoCheck(): void {
  //  console.log("Message is:", this.message)
  // }

  ngOnInit(): void{
    console.log("sdfsf")
    this.route.paramMap.subscribe(()=>{
          this.listProducts();
    })
  }

  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
  }

  handleSearchProducts(){
    const keyword = this.route.snapshot.paramMap.get('keyword')!;

    if(this.previousKeyword != keyword){
      this.thePageNumber = 1;
    }

    this.previousKeyword = keyword;
    console.log(`keyword=${keyword}, thePageNumber=${this.thePageNumber}`);

    this.productService.searchProductsPaginate(this.thePageNumber,
                                               this.thePageSize,
                                               keyword).subscribe(this.processResult())
  }

  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }else{
      this.currentCategoryId = 1;
    }

    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1
    }
    
    this.previousCategoryId = this.currentCategoryId
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`)

    this.productService.getProductListPaginate(this.thePageNumber-1,
                                               this.thePageSize,
                                               this.currentCategoryId).subscribe(this.processResult())
  }

  updatePageSize(pageSize:string){
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  processResult(){
    return (data:any)=>{
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number+1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
    }
  }

  addToCart(product:Product){
    console.log(`Adding to cart: ${product.name}, ${product.unitPrice}`)
    const theCartItem = new CartItem(product);
    this.theCartService.addToCart(theCartItem);
  }
}
