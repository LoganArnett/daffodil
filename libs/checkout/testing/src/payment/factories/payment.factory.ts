import { Injectable } from '@angular/core';
import { PaymentInfo } from '@daffodil/checkout';

import { DaffModelFactory } from "@daffodil/core/testing";

export class MockPaymentInfo implements PaymentInfo {
  name = 'name';
  cardnumber = 1234123412341234;
  month = 10;
  year = 2021;
  securitycode = 123;
}

@Injectable({
  providedIn: 'root'
})
export class DaffPaymentFactory extends DaffModelFactory<PaymentInfo> {
  constructor(){
    super(MockPaymentInfo);
  }
}