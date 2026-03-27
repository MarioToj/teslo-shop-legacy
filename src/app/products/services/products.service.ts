import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '../interfaces/products-response.interface';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  // Cache
  private productsCache = new Map<string, ProductsResponse>();
  private productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;
    const keyProducts = `${limit}-${offset}-${gender}`;

    if (this.productsCache.has(keyProducts)) {
      return of(this.productsCache.get(keyProducts)!);
    }

    return this.http
      .get<ProductsResponse>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender,
        },
      })
      .pipe(
        // tap((resp) => console.log(resp)),
        tap((resp) => this.productsCache.set(keyProducts, resp)),
      );
  }

  getProductById(id: string): Observable<Product> {
    const keyProduct = `${id}`;

    if (this.productCache.has(keyProduct)) {
      return of(this.productCache.get(keyProduct)!);
    }

    return this.http.get<Product>(`${baseUrl}/products/${id}`).pipe(
      // tap((resp) => console.log(resp)),
      tap((resp) => this.productCache.set(keyProduct, resp)),
    );
  }
}
