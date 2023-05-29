import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  title: string = 'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive';
  maxTitleLength: number = 60;

  manipulatedtitle(): string {
    if(this.title.length > this.maxTitleLength) {
      return this.title.substring(0, this.maxTitleLength) + '...';
    }
    return this.title
  }
}