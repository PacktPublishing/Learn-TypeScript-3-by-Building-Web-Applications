import {Authenticated, Traced, Transactional, ValidNumber} from "./02-cross-cutting-utils";

class NewBankService {
  constructor() {
  }

  @Traced
  @Authenticated
  @Transactional
  public depositMoney(@ValidNumber({min: 0}) amount: number): void {
    // try to do something interesting
  }
}

new NewBankService().depositMoney(500);
