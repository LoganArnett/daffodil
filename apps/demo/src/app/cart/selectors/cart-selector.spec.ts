import { TestBed, async } from "@angular/core/testing";
import { StoreModule, combineReducers, Store, select } from "@ngrx/store";

import { DaffCartReset, DaffCartLoadSuccess, DaffCart } from "@daffodil/cart";
import { DaffCartFactory, DaffCartItemFactory } from "@daffodil/cart/testing";

import * as fromCart from './cart-selector';

describe('selectCartState', () => {

  let store: Store<fromCart.CartState>;
  let cartFactory: DaffCartFactory;
  let cartItemFactory: DaffCartItemFactory;
  let mockCart: DaffCart;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          cart: combineReducers(fromCart.reducers),
        })
      ]
    });

    cartFactory = TestBed.get(DaffCartFactory);
    cartItemFactory = TestBed.get(DaffCartItemFactory);
    store = TestBed.get(Store);
  }));

  describe('selectCartItemCount', () => {

    beforeEach(() => {
      mockCart = cartFactory.create({
        items: cartItemFactory.createMany(2)
      });

      mockCart.items[0].qty = 2;
      mockCart.items[1].qty = 4;
      
      store.dispatch(new DaffCartReset());
      store.dispatch(new DaffCartLoadSuccess(mockCart));
    });
    
    it('selects total number of cartItems', () => {
      store.pipe(select(fromCart.selectCartItemCount)).subscribe((count) => {
        expect(count).toEqual(6);
      });
    });
  });

  describe('isCartEmpty', () => {

    describe('when cart is empty', () => {

      beforeEach(() => {
        mockCart = cartFactory.create();
        store.dispatch(new DaffCartReset());        
        store.dispatch(new DaffCartLoadSuccess(mockCart));
      });
      
      it('should return true', () => {
        store.pipe(select(fromCart.isCartEmpty)).subscribe((isCartEmpty) => {
          expect(isCartEmpty).toBeTruthy();
        });
      });
    });

    describe('when cart is not empty', () => {
      
      beforeEach(() => {
        mockCart = cartFactory.create({
          items: cartItemFactory.createMany(2)
        });
        store.dispatch(new DaffCartReset());
        store.dispatch(new DaffCartLoadSuccess(mockCart));
      });

      it('should return false', () => {
        store.pipe(select(fromCart.isCartEmpty)).subscribe((isCartEmpty) => {
          expect(isCartEmpty).toBeFalsy();
        });
      });
    });
  });
});
