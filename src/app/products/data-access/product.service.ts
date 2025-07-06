import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
} from '@angular/fire/firestore';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthStateService } from '../../shared/data-access/auth-state.service';

export interface Product {
  id: string;
  nombre: string;
  modelo: string;
  marca: string;
  precio: number;
  sku: string;
  stock: number;
  imagen: string;
  descripcion: string;
}

export type ProductCreate = Omit<Product, 'id'>;

const PATH = 'productos';

@Injectable()
export class ProductService {
  private _firestore = inject(Firestore);
  private _authState = inject(AuthStateService);

  private _collection = collection(this._firestore, PATH);
  private _query = query(
    this._collection,
    where('userId', '==', this._authState.currentUser?.uid)
  );

  loading = signal<boolean>(true);

  getProducts = toSignal(
    (
      collectionData(this._query, { idField: 'id' }) as Observable<Product[]>
    ).pipe(
      tap(() => {
        this.loading.set(false);
      }),
      catchError((error) => {
        this.loading.set(false);
        return throwError(() => error);
      })
    ),
    {
      initialValue: [],
    }
  );

  constructor() {
    console.log(this._authState.currentUser);
    if (!this._authState.currentUser?.uid) {
      throw new Error('No user logged in at service initialization.');
    }
  }

  getProduct(id: string) {
    const docRef = doc(this._collection, id);
    return getDoc(docRef);
  }

  create(product: ProductCreate) {
    return addDoc(this._collection, {
      ...product,
      userId: this._authState.currentUser?.uid,
    });
  }

  update(product: ProductCreate, id: string) {
    const docRef = doc(this._collection, id);
    return updateDoc(docRef, {
      ...product,
      userId: this._authState.currentUser?.uid,
    });
  }
}
