import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from '@/products/components/product-card/product-card';
import { ProductsService } from '@/products/services/products.service';

@Component({
  selector: 'home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
})
export default class HomePage {
  productsService = inject(ProductsService);

  productsResource = rxResource({
    stream: () => this.productsService.getProducts({}),
  });
}
