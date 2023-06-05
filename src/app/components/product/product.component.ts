import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  constructor(
    private cartService: CartService,
  ) {}


  
  maxTitleLength: number = 45;
  
  @Input()  productImg: string = ''
  @Input()  productTitle: string = ''
  @Input()  productId: number = 0
  @Input()  productPrice: number = 0
  
  productQuantity: number = 1
  
  summation: number = 0

  @ViewChild('btnLess') btnLess!: ElementRef
  ngOnInit(): void {
  }
  
  manipulatedtitle(): string {
    if(this.productTitle.length > this.maxTitleLength) {
      return this.productTitle.substring(0, this.maxTitleLength) + '...';
    }
    return this.productTitle
  }

  addQuantityProduct() {
    this.productQuantity += 1;
    this.summation += this.productPrice
    this.setUpdateAmount(this.summation)
    console.log(this.summation);
    
    
    if(this.productQuantity > 0) {
      this.addClass()
    }
  }

  removeQuantityProduct() {    
    if(this.productQuantity > 1) {
      this.productQuantity -= 1
      this.summation -= this.productPrice
      this.setUpdateAmount(-this.productPrice)
    }

    if(this.productQuantity == 1) {
      this.removeClass()
    }
    // if(this.productQuantity == 0) {
    //   this.deleteProduct()
    // }
  }
  products: Product[] = [];

  deleteProduct(productId: number) {
    this.cartService.productsSubject.subscribe((products: Product[]) => {
      this.products = products;

      let index = this.products.findIndex(product => product.id === productId)
      console.log(this.products);
      if (index !== -1) {
        this.products.splice(index, 1);
        
        this.cartService.removeProduct(this.products, productId)
        this.cartService.updateQuantityProductsInCart(this.products)
        this.cartService.productRemovedSubject.next();
        
      }
    })
  }
  
  setUpdateAmount(productValue: number) {
    this.cartService.updateAmount(productValue);
  }

  addClass() :void {
    this.btnLess.nativeElement.classList.add('hover-substract')
  }

  removeClass() :void {
    this.btnLess.nativeElement.classList.remove('hover-substract')
  }
}

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}