import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, combineLatest, map } from 'rxjs';
import { MostPopularCurrenciesEnum } from 'src/app/@core/data/enums/mostPopularCurrencies';
import { ConvertedCurrencyValue } from 'src/app/@core/data/modal/converted-currency-value';
import { Currencies, Currency } from 'src/app/@core/data/modal/currency';
import { CurrencyExchangeService } from 'src/app/@core/services/currency-exchange.service';

@Component({
  selector: 'app-exchange-home',
  templateUrl: './exchange-home.component.html',
  styleUrls: ['./exchange-home.component.scss'],
})
export class ExchangeHomeComponent implements OnInit {
  exchangeForm: FormGroup;
  mostPopularCurrenciesEnum = MostPopularCurrenciesEnum;
  convertedCurrencyValue: ConvertedCurrencyValue = new ConvertedCurrencyValue();
  allCurrencies: Currencies = new Currencies();
  fetchAllResult: any = [];
  mostPopularCurrenciesList: any = [];
  oneCurrency: Currency = new Currency();
  private combinedSubscription: Subscription;

  // peoperties
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

    this.combinedSubscription = combineLatest([
      this.CurrencyExchangeServ.getAllCurrencies(),
      this.CurrencyExchangeServ.fetchAll(this.ToProp?.value),
      this.CurrencyExchangeServ.fetchOne(this.exchangeForm?.value).pipe(
        map((res) => {
          return {
            from: this.FromProp?.value,
            to: this.ToProp?.value,
            rate: res.result[this.ToProp?.value],
          };
        })
      ),
      this.CurrencyExchangeServ.convert(this.exchangeForm.value).pipe(
        map((res) => {
          return new Object({
            convertedCurrency: this.ToProp?.value,
            convertedValue: res.result[this.ToProp?.value],
          });
        })
      ),
    ]).subscribe((combined: any) => {
      this.allCurrencies.currencies = combined[0].currencies;
      this.fetchAllResult = combined[1].results;
      this.oneCurrency = combined[2];
      this.convertedCurrencyValue = combined[3];
      // ==========
      this.mostPopularCurrenciesList = this.getMostPopularCurrencies();
    });
    
  }

  getLatestCurrencies() {
    this.CurrencyExchangeServ.getAllCurrencies().subscribe((res) => {
      this.allCurrencies.currencies = res.currencies;
    });
  }

  fetchAll() {
    this.CurrencyExchangeServ.fetchAll(this.ToProp?.value).subscribe((res) => {
      this.fetchAllResult = res.results;
      this.mostPopularCurrenciesList = this.getMostPopularCurrencies();
    });
  }

  fetchOne() {
    this.CurrencyExchangeServ.fetchOne(this.exchangeForm?.value).pipe(
        map((res) => {
          return {
            from: this.FromProp?.value,
            to: this.ToProp?.value,
            rate: res.result[this.ToProp?.value],
          };
        })
      )
      .subscribe((res) => (this.oneCurrency = res));
  }

  convertCurrency(val: any = null) {
    let transformValues = val ? val : this.exchangeForm.value;
    this.CurrencyExchangeServ.convert(transformValues)
      .pipe(
        map((res) => {
          return new Object({
            convertedCurrency: this.ToProp?.value,
            convertedValue: res.result[this.ToProp?.value],
          });
        })
      )
      .subscribe(
        (res: any) => {
          this.convertedCurrencyValue = res;
          this.fetchOne();
          this.fetchAll();
        },
        (err) => console.log(err)
      );
  }

  initialExchangeForm() {
    this.exchangeForm = this.fb.group({
      from: ['EUR', [Validators.required]],
      to: ['USD', [Validators.required]],
      amount: [1.0, [Validators.required]],
    });
  }

  onSubmit() {
    this.convertCurrency(this.exchangeForm.value);
  }

  swapValues() {
    const temp = this.FromProp?.value;
    this.FromProp?.setValue(this.ToProp?.value);
    this.ToProp?.setValue(temp);
  }
  // using this because api return values as an object not normal array
  getObjKeyName(obj: any) {
    var keys = Object.keys(obj);
    return keys[0];
  }
  getObjValue(obj: any) {
    var keys = Object.values(obj);
    return keys[0];
  }
  //just filter the mostPopularCurrencies came from api
  //dependent of my enum
  private getMostPopularCurrencies() {
    const result: string[] = [];

    for (let key in this.fetchAllResult) {
      let popularCurrencyObj: any = {};

      if (key in this.mostPopularCurrenciesEnum) {
        popularCurrencyObj[key] = this.fetchAllResult[key];
        result.push(popularCurrencyObj);
      }
    }
    return result;
  }

  ngOnDestroy() {
    this.combinedSubscription.unsubscribe();
    console.log('unsubscribe...');
  }
}
