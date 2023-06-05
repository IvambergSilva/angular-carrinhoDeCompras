import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private amountSubject = new BehaviorSubject<number>(0);
  amountValue = this.amountSubject.asObservable()
  quantityProductsInCart: number = 0

  value:number = 0

  productRemovedSubject = new Subject<void>()
  productRemoved$ = this.productRemovedSubject.asObservable();

  productsSubject = new BehaviorSubject<Product[]>([]);

  updateAmount(amount: number) {
    const currentValue = this.amountSubject.value;
    this.amountSubject.next(currentValue + amount);
  }

  removeProduct(products: Product[], productId: number) {
    products.map((element) => {
      this.value += element.price
      this.amountSubject.next(this.value);
    })
    this.value = 0
  }

  formatNumber(number: number): string {
    return number.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }

  updateQuantityProductsInCart(products:Product[]) {
    this.quantityProductsInCart = products.length
    console.log(this.quantityProductsInCart);
    return this.quantityProductsInCart;
  }

  getQuantityProductsInCart(): number {
    return this.quantityProductsInCart;
  }
}


export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}