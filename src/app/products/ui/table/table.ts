import { Component,  input } from '@angular/core';
import { Product } from '../../data-access/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './table.html',
})
export class TableComponent {
  products = input.required<Product[]>();
}