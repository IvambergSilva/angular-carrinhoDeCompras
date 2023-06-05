import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  amount: number = 0
  initialValue: number = 0

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.amountValue.subscribe(amount => {
      this.amount = amount
    })
  }

  formatNumber(number: number): string {
    return number.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }

  addBorder(): void {
  }
}
