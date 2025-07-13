import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../data-access/product.service';
import { TableComponent } from '../../ui/table/table';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './product-list.html',
  providers: [ProductService],
})
export default class ProductList {
  productService = inject(ProductService);

  searchText = signal('');
}
