import { ProductsService } from '@/products/services/products.service';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCarousel } from '@/products/components/product-carousel/product-carousel';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarousel],
  templateUrl: './product-page.html',
})
export default class ProductPage {
  route = inject(ActivatedRoute);
  productService = inject(ProductsService);

  idSlug = toSignal(this.route.paramMap.pipe(map((p) => p.get('idSlug') ?? '')));
  productResource = rxResource({
    params: () => this.idSlug(),
    stream: ({ params }) => this.productService.getProductById(params),
  });
}
