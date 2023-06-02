import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CurrencyExchangeService } from 'src/app/@core/services/currency-exchange.service';

@Component({
  selector: 'app-exchange-details',
  templateUrl: './exchange-details.component.html',
  styleUrls: ['./exchange-details.component.scss'],
})
export class ExchangeDetailsComponent implements OnInit {
  exchangeForm: FormGroup;

  currentSelectedCurrencyRate: any = null;
  // convertCurrency: any = null;
  currencies: any[] = [];
  fetchAllResult: any = [];

  // fetchOne
  oneCurrency: any = {
    from: 'USD',
    to: 'EGP',
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

  fromCurrencyParam: string;
  toCurrencyParam: string;
  fromCurrencyName: string;
  amount: string;

  constructor(
    private CurrencyExchangeServ: CurrencyExchangeService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.fromCurrencyParam = params['fromCurrency'];
      this.toCurrencyParam = params['toCurrency'];
      this.amount = params['amount'];
      // Use the ID parameter value as needed
    });
  }

  ngOnInit(): void {
    this.initialExchangeForm();
    this.getAllCurrencies();
    this.fetchOne();
    this.convertCurrency();
  }

  getAllCurrencies() {
    this.CurrencyExchangeServ.getAllCurrencies().subscribe((res) => {
      this.currencies = res.currencies;

      for (let key in this.currencies) {
        if (this.fromCurrencyParam == key)
          this.fromCurrencyName = this.currencies[key];
      }
    });
  }

  fetchOne() {
    this.CurrencyExchangeServ.fetchOne(this.exchangeForm?.value).pipe(
        map((res) => {
          return {
            from: this.ToProp?.value,
            to: this.FromProp?.value,
            rate: res.result[this.ToProp?.value],
          };
        })
      )
      .subscribe((res) => (this.oneCurrency = res));
  }

  convertCurrency(val: any = null) {
    let transformValues = val ? val : this.exchangeForm.value;
    this.CurrencyExchangeServ.convert(transformValues).pipe(
        map((res) => {
          return new Object({
            convertedCurrency: this.ToProp?.value,
            convertedValue: res.result[this.ToProp?.value],
          });
        })
      ).subscribe(
        (res) => {
          this.convertedCurrencyValue = res;
          this.fetchOne();
        },
        (err) => console.log(err)
      );
  }

  initialExchangeForm() {
    this.exchangeForm = this.fb.group({
      from: [this.fromCurrencyParam, [Validators.required]],
      to: [this.toCurrencyParam, [Validators.required]],
      amount: [this.amount, [Validators.required]],
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

  
}
