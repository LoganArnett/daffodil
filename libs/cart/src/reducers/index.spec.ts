import { TestBed, async } from "@angular/core/testing";
import { StoreModule, combineReducers, Store, select } from "@ngrx/store";

import { DaffCartLoadSuccess, DaffCartReset } from "../actions/cart.actions";
import * as fromCart from './index';
import { DaffCartFactory } from '../../testing/src/factories/cart.factory';
import { DaffCart } from "../models/cart";

describe('selectCartState', () => {

  let store: Store<fromCart.CartState>;
  const cartFactory: DaffCartFactory = new DaffCartFactory();
  let mockCart: DaffCart;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          cart: combineReducers(fromCart.reducers),
        })
      ]
    });

    mockCart = cartFactory.create();
    store = TestBed.get(Store);
    store.dispatch(new DaffCartReset());
    store.dispatch(new DaffCartLoadSuccess(mockCart));
  }));

  describe('cartStateSelector', () => {
    
    it('selects cart state', () => {
      const expectedCartState = {
        cart: mockCart,
        loading: false,
        errors: []
      }

      store.pipe(select(fromCart.cartStateSelector)).subscribe((cart) => {
        expect(cart).toEqual(expectedCartState);
      });
    });
  });

  describe('selectCartValueState', () => {
    
    it('selects cartValue state', () => {
      store.pipe(select(fromCart.selectCartValueState)).subscribe((cart) => {
        expect(cart).toEqual(mockCart);
      });
    });
  });

  describe('selectCartLoadingState', () => {
    
    it('selects cart loading state', () => {
      store.pipe(select(fromCart.selectCartLoadingState)).subscribe((cartLoading) => {
        expect(cartLoading).toEqual(false);
      });
    });
  });
});
