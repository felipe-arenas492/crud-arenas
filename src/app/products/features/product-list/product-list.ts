import { Component, inject } from '@angular/core';
import { ProductService } from '../../data-access/product.service';
import { RouterLink } from '@angular/router';
import { TableComponent } from '../../ui/table/table';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterLink, TableComponent],
  templateUrl: './product-list.html',
  providers: [ProductService]
})
export default class ProductList{
  productService = inject(ProductService)
}