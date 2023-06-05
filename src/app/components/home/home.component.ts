import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService, Product } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private http: HttpClient,
  ) {}



  productImg: string = ''
  productTitle: string = ''
  productId: number = 0
  productPrice: number = 0
  
  quantityProductsInCart: number = 0

  initialValue: number = 0

  products:Product[] = []
    
  ngOnInit(): void {
    this.loadDataFromApi()
    this.cartService.productRemoved$.subscribe(() => {
      this.updateQuantityProductsInCart();
    });
  }
  
  loadDataFromApi(){
    this.http.get<any>('/assets/database/db.json').subscribe(data => {
      this.products = data.products
      this.quantityProductsInCart = this.products.length
      this.products.map((element) => {
        this.initialValue += element.price
      });
      this.cartService.updateAmount(this.initialValue);
      this.cartService.productsSubject.next(this.products);
    })
  }

  @ViewChild('titleCart') titleCart!: ElementRef

  updateQuantityProductsInCart(): void {
    this.quantityProductsInCart = this.cartService.getQuantityProductsInCart();
    if(this.quantityProductsInCart == 0) {
      this.titleCart.nativeElement.textContent = 'Carrinho vazio'    
    }
  }
  
  summation: number = 0
}