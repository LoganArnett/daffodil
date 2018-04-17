import { NgModule } from '@angular/core';

import { environment } from 'environments/environment';
import { ProductService } from '@core/product/services/product.service';
import { ProductListContainer } from '@core/product/containers/product-list/product-list.component';
import { ProductTestingModule } from '@core/product/testing/product-testing.module';
import { CoreProductStateModule } from '@core/product/product-state.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    /**
     * Testing Environment Setup
     */
    environment.useMocks ? ProductTestingModule : [],
     
    /**
     * Ngrx/store
     */
    CoreProductStateModule,
    CommonModule
  ],
  declarations: [
    ProductListContainer
  ],
  exports: [
    ProductListContainer
  ],
  providers: [
    ProductService
  ]
})
export class CoreProductModule { }
