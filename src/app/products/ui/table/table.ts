import { Component, input, computed, signal, inject } from '@angular/core';
import { Product, ProductService } from '../../data-access/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './table.html',
})
export class TableComponent {
  private productService = inject(ProductService);

  // products = input.required<Product[]>();
  searchText = input.required<string>({});

  // newProducts = signal<Product[]>([]);

  products = this.productService.getProducts;

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

  async deleteProduct(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await this.productService.deleteProduct(id);

        // Opcional: filtra los productos localmente después de borrar
        // const updated = this.products().filter((p) => p.id !== id);
        // this.newProducts.set(updated); // Si usas esto como fuente de verdad
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert('No se pudo eliminar el producto.');
      }
    }
  }
}
