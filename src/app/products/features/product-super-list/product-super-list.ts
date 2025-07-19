import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../data-access/product.service';
import { BeautyListComponent } from '../../ui/beauty-list/beauty-list';

@Component({
  selector: 'app-product-super-list',
  standalone: true,
  imports: [BeautyListComponent],
  templateUrl: './product-super-list.html',
  providers: [ProductService],
})
export default class ProductSuperList {
  productService = inject(ProductService);

  searchText = signal('');
}
