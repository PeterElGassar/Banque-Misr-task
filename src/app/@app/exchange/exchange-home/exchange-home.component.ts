import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { CurrencyExchangeService } from 'src/app/@core/services/currency-exchange.service';

@Component({
  selector: 'app-exchange-home',
  templateUrl: './exchange-home.component.html',
  styleUrls: ['./exchange-home.component.scss'],
})
export class ExchangeHomeComponent implements OnInit {
  exchangeForm: FormGroup;

  currentSelectedCurrencyRate: any = null;
  // convertCurrency: any = null;
  currencies: any[] = [];
  fetchAllResult: any = [];
  mostPopularCurrencies: any = [
    'JPY',
    'GBP',
    'AUD',
    'CAD',
    'CHF',
    'CNH',
    'HKD',
    'NZD',
    'AED',
  ];
  mostPopularCurrencies2: any = [];

  // fetchOne
  oneCurrency: any = {
    from: 'EUR',
    to: 'USD',
    rate: 0,
  };

  // fetchOne
  convertedCurrencyValue: any = {
    convertedCurrency: '',
    convertedValue: 0,
  };

  get FromProp() {
    return this.exchangeForm.get('from');
  }

  get ToProp() {
    return this.exchangeForm.get('to');
  }
  get AmountProp() {
    return this.exchangeForm.get('amount');
  }

  constructor(
    private CurrencyExchangeServ: CurrencyExchangeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initialExchangeForm();
    this.getLatestCurrencies();
    this.fetchAll();
    this.fetchOne();
    this.convertCurrency();
  }

  getLatestCurrencies() {
    this.CurrencyExchangeServ.getAllCurrencies().subscribe((res) => {
      this.currencies = res.currencies;
    });
  }

  fetchAll(from: any = null) {
    this.CurrencyExchangeServ.fetchAll(this.ToProp?.value).subscribe((res) => {
      this.fetchAllResult = res.results;

      this.mostPopularCurrencies2 = this.getMostPopularCurrencies();
    });
  }

  // 1
  fetchOne() {
    this.CurrencyExchangeServ.fetchOne(this.exchangeForm?.value)
      .pipe(
        map((res) => {
          return new Object({
            from: this.FromProp?.value,
            to: this.ToProp?.value,
            rate: res.result[this.ToProp?.value],
          });
        })
      )
      .subscribe((res) => (this.oneCurrency = res));
  }

  // 2
  convertCurrency(val: any = null) {
    let transformValues = this.exchangeForm.value;

    this.CurrencyExchangeServ.convert(val ? val : transformValues)
      .pipe(
        map((res) => {
          return new Object({
            convertedCurrency: this.ToProp?.value,
            convertedValue: res.result[this.ToProp?.value],
          });
        })
      )
      .subscribe(
        (res) => {
          this.convertedCurrencyValue = res;
          this.fetchOne();
          this.fetchAll(this.FromProp?.value);
          console.log('new data', this.mostPopularCurrencies2);

          // this.mostPopularCurrencies2 = this.getMostPopularCurrencies();
        },
        (err) => console.log(err)
      );
  }

  private getMostPopularCurrencies() {
    const result: string[] = [];

    for (let key in this.fetchAllResult) {
      let obj: any = {};
      if (this.mostPopularCurrencies.includes(key)) {
        obj[key] = this.fetchAllResult[key];
        result.push(obj);
      }
    }
    return result;
  }

  initialExchangeForm() {
    this.exchangeForm = this.fb.group({
      from: ['EUR', [Validators.required]],
      to: ['USD', [Validators.required]],
      amount: [1, [Validators.required]],
    });
  }

  onSubmit() {
    this.convertCurrency(this.exchangeForm.value);
  }

  getObjKeyName(obj: any) {
    var keys = Object.keys(obj);
    return keys[0];
  }
  getObjValue(obj: any) {
    var keys = Object.values(obj);
    return keys[0];
  }

  swapValues() {

    let temp;

    //swap variables
    temp = this.FromProp?.value;

    this.FromProp?.setValue(this.ToProp?.value);
    this.ToProp?.setValue(temp);

    console.log(`The value of a after swapping: ${this.ToProp?.value}`);
    console.log(`The value of b after swapping: ${this.FromProp?.value}`);
  }
}
