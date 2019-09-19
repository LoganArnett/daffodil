import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select, Action } from '@ngrx/store';

import { DaffNewsletterSubmission } from '../models/newsletter.model';
import { DaffNewsletterModule } from '../newsletter.module';
import { isObject } from 'util';

import { State, selectDaffNewsletterSuccess, selectDaffNewsletterError, selectDaffNewsletterLoading, submission } from '../selectors/newsletter.selector';
import { DaffStoreFacade } from 'libs/core/src';


@Injectable()
export class DaffNewsletterFacade<T extends DaffNewsletterSubmission> implements DaffStoreFacade<Action>{
  success$ : Observable<boolean> = this.store.select(selectDaffNewsletterSuccess);
  error$: Observable<string> = this.store.select(selectDaffNewsletterError);
  loading$: Observable<boolean> = this.store.select(selectDaffNewsletterLoading);
  submission$: Observable<T> = this.store.select(submission);

  constructor(private store: Store<State>){

  }
  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}