import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  maxTitleLength: number = 60;
  
  @Input()
  productImg: string = ''
  @Input()
  productTitle: string = '';
  @Input()
  productPrice: string = ''
  @Input()
  productQuantity: string = ''

  manipulatedtitle(): string {
    if(this.productTitle.length > this.maxTitleLength) {
      return this.productTitle.substring(0, this.maxTitleLength) + '...';
    }
    return this.productTitle
  }
}