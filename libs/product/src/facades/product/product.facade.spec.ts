import { TestBed } from '@angular/core/testing';

import { DaffProductFacade } from './product.facade';
import { MockStore } from '@ngrx/store/testing';
import { State, reducers } from '../../reducers';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { DaffProductLoad, DaffProductLoadSuccess } from '../../actions/product.actions';

describe('DaffProductFacade', () => {
  let store: MockStore<Partial<State>>;
  let facade: DaffProductFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        StoreModule.forRoot({
          product: combineReducers(reducers),
        })
      ],
      providers: [
        DaffProductFacade,
      ]
    })

    store = TestBed.get(Store);
    facade = TestBed.get(DaffProductFacade);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should be able to dispatch an action to the store', () => {
    spyOn(store, 'dispatch');
    const action = {type: 'SOME_TYPE'};

    facade.dispatch(action);
    expect(store.dispatch).toHaveBeenCalledWith(action);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  describe('loading$', () => {
    it('should be false if the product state is not loading', () => {
      const expected = cold('a', { a: false });
      expect(facade.loading$).toBeObservable(expected);
    });
  
    it('should be true if the product state is loading', () => {
      const expected = cold('a', { a: true });
      store.dispatch(new DaffProductLoad("1"));
      expect(facade.loading$).toBeObservable(expected);
    });
  });

  describe('product$', () => {
    it('should initially be undefined', () => {
      const initial = cold('a', { a: undefined });
      expect(facade.product$).toBeObservable(initial);
    });

    it('should be an observable of the currently selected product', () => {
      const product = {id: '1', name: 'Some Name'};
      const expected = cold('a', { a: product});
      store.dispatch(new DaffProductLoad(product.id));
      store.dispatch(new DaffProductLoadSuccess(product));
      expect(facade.product$).toBeObservable(expected);
    })
  });
});
