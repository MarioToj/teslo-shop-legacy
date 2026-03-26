import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from '@/products/components/product-card/product-card';
import { ProductsService } from '@/products/services/products.service';
import { Pagination } from '@/shared/components/pagination/pagination';

import { PaginationService } from '@/shared/components/pagination/pagination.service';

@Component({
  selector: 'home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})
export default class HomePage {
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  productsResource = rxResource({
    params: () => this.paginationService.currentPage() - 1,
    stream: ({ params }) =>
      this.productsService.getProducts({
        offset: params * 9,
      }),
  });
}
