import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';

import { ProductGridContainer } from './product-grid.component';
import { DaffProductFactory } from '../../../testing/src';
import { ProductGridLoad } from '../../actions/product-grid.actions';
import * as fromProductGrid from '../../selectors/product-grid.selectors';
import * as fromProductEntities from '../../selectors/product-entities.selectors';
import { Product } from '../../models/product';
import { productGridReducer } from '../../reducers/product-grid.reducer';
import { productEntitiesReducer } from '../../reducers/product-entities.reducer';

describe('ProductGridContainer', () => {
  let component: ProductGridContainer;
  let fixture: ComponentFixture<ProductGridContainer>;
  let store;
  let initialLoading: boolean;
  let initialProducts: Product[];
  const productFactory = new DaffProductFactory();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          productGrid: combineReducers(productGridReducer),
          productEntities: combineReducers(productEntitiesReducer),
        })
      ],
      declarations: [ ProductGridContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGridContainer);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    initialLoading = false;
    initialProducts = new Array(productFactory.create());

    spyOn(fromProductGrid, 'selectProductGridLoadingState').and.returnValue(initialLoading);
    spyOn(fromProductEntities, 'selectAllProducts').and.returnValue(initialProducts);
    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngInit', () => {
    
    it('dispatches a ProductGridLoad action', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new ProductGridLoad());
    });

    it('initializes loading$', () => {
      component.loading$.subscribe((loading) => {
        expect(loading).toEqual(initialLoading);
      });
    });

    it('initializes products$', () => {
      component.products$.subscribe((products) => {
        expect(products).toEqual(initialProducts);
      });
    });
  });
});
