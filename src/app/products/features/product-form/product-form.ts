import { Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Product,
  ProductCreate,
  ProductService,
} from '../../data-access/product.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  //styleUrl: './task-form.component.scss',
  providers: [ProductService],
})
export default class ProductForm {
  private _formBuilder = inject(FormBuilder);
  private _productService = inject(ProductService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  loading = signal(false);
  idProduct = signal<string | null>(null);
  //idProduct = input<string>();

  form = this._formBuilder.group({
    nombre: this._formBuilder.control('', Validators.required),
    marca: this._formBuilder.control('', Validators.required),
    modelo: this._formBuilder.control('', Validators.required),
    stock: this._formBuilder.control(0, Validators.required),
    sku: this._formBuilder.control('', Validators.required),
    precio: this._formBuilder.control(0, Validators.required),
    imagen: this._formBuilder.control('', Validators.required),
    descripcion: this._formBuilder.control('', Validators.required),
  });

  constructor() {
    /*effect(() => {
      const id = this.idProduct();
      if (id) {
        this.getProduct(id);
      }
    });*/

    this._route.paramMap.subscribe((params) => {
      const id = params.get('idProduct');
      if (id) {
        this.idProduct.set(id);
        this.getProduct(id);
      }
    });
  }

  async submit() {
    if (this.form.invalid) return;

    this.loading.set(true);
    try {
      // console.log('entro a abel');
      // this.loading.set(true);
      const { nombre, marca, modelo, imagen, stock, precio, sku, descripcion } =
        this.form.value;
      const product: ProductCreate = {
        nombre: nombre || '',
        marca: marca || '',
        modelo: modelo || '',
        stock: stock || 0,
        precio: precio || 0,
        sku: sku || '',
        imagen: imagen || '',
        descripcion: descripcion || '',
      };

      const id = this.idProduct();

      if (id) {
        await this._productService.update(product, id);
      } else {
        await this._productService.create(product);
      }

      toast.success(`Product ${id ? 'actualizado' : 'creado'}  correctamente.`);
      this._router.navigateByUrl('/products');
    } catch (error) {
      toast.success('Ocurrio un problema al guardar.');
    } finally {
      this.loading.set(false);
    }
  }

  async getProduct(id: string) {
    const productSnapshot = await this._productService.getProduct(id);

    if (!productSnapshot.exists()) return;

    const product = productSnapshot.data() as Product;

    this.form.patchValue(product);
  }
}
