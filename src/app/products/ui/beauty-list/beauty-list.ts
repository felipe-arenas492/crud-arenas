import { Component, input, computed, signal } from '@angular/core';
import { Product } from '../../data-access/product.service';
// import { RouterLink } from '@angular/router';
// import { combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-beauty-list',
  standalone: true,
  // imports: [RouterLink],
  templateUrl: './beauty-list.html',
})
export class BeautyListComponent {
  products = input.required<Product[]>();
  searchText = input.required<string>({});

  newProducts = signal<Product[]>([]);
  // Computed signal que filtra los productos basado en el texto de búsqueda
  filteredProducts = computed(() => {
    const products = this.products();
    const search = this.searchText().toLowerCase().trim();

    // Si no hay texto de búsqueda, retorna todos los productos
    if (!search) {
      return products;
    }

    // Filtra productos que coincidan con el texto de búsqueda en cualquier campo
    return products.filter(
      (product) =>
        product.nombre.toLowerCase().includes(search) ||
        product.marca.toLowerCase().includes(search)
    );
  });
}
