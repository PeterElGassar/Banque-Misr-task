import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyExchangeService } from 'src/app/@core/services/currency-exchange.service';

@Component({
  selector: 'app-exchange-home',
  templateUrl: './exchange-home.component.html',
  styleUrls: ['./exchange-home.component.scss'],
})
export class ExchangeHomeComponent implements OnInit {
  exchangeForm: FormGroup;

  currentSelectedCurrencyRate: any=null ;
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
  mostPopularCurrencies2: any = [
  ];

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
  }

  getLatestCurrencies() {
    this.CurrencyExchangeServ.getAllCurrencies().subscribe((res) => {
      this.currencies = res.currencies;
    });
  }

  fetchAll() {
    this.CurrencyExchangeServ.fetchAll().subscribe((res) => {
      this.fetchAllResult = res.results;
      this.mostPopularCurrencies2 = this.getMostPopularCurrencies();
      console.log('mostPopularCurrencies', this.mostPopularCurrencies2);
    });
  }

  fetchOne() {
    this.CurrencyExchangeServ.fetchOne(this.exchangeForm?.value).subscribe((res) => {
      debugger;
      this.currentSelectedCurrencyRate = res;
      
    });
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
    this.CurrencyExchangeServ
    .convert(this.exchangeForm.value).subscribe(
      (res: any) => {
        console.log(res);
        this.fetchAll();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getObjKeyName(obj: any) {
    var keys = Object.keys(obj);
    return keys[0];
  }
  getObjValue(obj: any) {
    var keys = Object.values(obj);
    return keys[0];
  }
}
