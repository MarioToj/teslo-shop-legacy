import { ProductsService } from '@/products/services/products.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.html',
})
export default class ProductPage implements OnInit {
  idSlug = signal<string>('');

  route = inject(ActivatedRoute);
  productService = inject(ProductsService);

  productResource = rxResource({
    params: () => this.idSlug(),
    stream: ({ params }) => this.productService.getProductById(params),
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const id = param.get('idSlug');
      if (id) {
        this.idSlug.set(id);
      }
    });
  }
}
