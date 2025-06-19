import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api';
  
  constructor(private http: HttpClient) { }

  getProductListPaginate(pageNumber: number,
                        pageSize:number,
                        categoryId: number): Observable<GetResponseProducts>{
    const searchUrl = `${this.baseUrl}/products/search/findByCategoryId?id=${categoryId}`
                      +`&page=${pageNumber}&size=${pageSize}`;

    return this.http.get<GetResponseProducts>(searchUrl); 
  }

  searchProductsPaginate(pageNumber: number,
                        pageSize:number,
                        theKeyword: string): Observable<GetResponseProducts>{
    const searchUrl = `${this.baseUrl}/products/search/findByNameContaining?name=${theKeyword}`
                      +`&page=${pageNumber}&size=${pageSize}`;

    return this.http.get<GetResponseProducts>(searchUrl);

  }

  getProductList(categoryId: number): Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/products/search/findByCategoryId?id=${categoryId}`;
    return this.getProducts(searchUrl)

  }

  getProductCategories(): Observable<ProductCategory[]> {
    const searchUrl = `${this.baseUrl}/product_category`;
    return this.http.get<GetResponseProductsCategories>(searchUrl).pipe(
      map(response => response._embedded.productCategory)
    )
  }

  searchProduct(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/products/search/findByNameContaining?name=${keyword}`;
    return this.getProducts(searchUrl)
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.http.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProduct(theProductId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/products/${theProductId}`;
    return this.http.get<Product>(productUrl);
  }
}

interface GetResponseProducts {
  _embedded:{
    products:Product[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}

interface GetResponseProductsCategories {
  _embedded:{
    productCategory:ProductCategory[];
  }
}

