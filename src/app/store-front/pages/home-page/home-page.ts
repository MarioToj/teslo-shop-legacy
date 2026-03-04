import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FrontProductCard } from '@/products/components/front-product-card/front-product-card';
import { ProductsService } from '@/products/services/products.service';

@Component({
  selector: 'home-page',
  imports: [FrontProductCard],
  templateUrl: './home-page.html',
})
export default class HomePage {
  productsService = inject(ProductsService);
}
