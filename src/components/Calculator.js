import React, { Component } from 'react';

import '../App.css';
class Converter extends Component {
  state = {
    currencies: [
      'BGN',
      'NZD',
      'ILS',
      'RUB',
      'CAD',
      'USD',
      'PHP',
      'CHF',
      'AUD',
      'JPY',
      'TRY',
      'HKD',
      'MYR',
      'HRK',
      'CZK',
      'IDR',
      'DKK',
      'NOK',
      'HUF',
      'GBP',
      'MXN',
      'THB',
      'ISK',
      'ZAR',
      'BRL',
      'SGD',
      'PLN',
      'INR',
      'KRW',
      'RON',
      'CNY',
      'SEK',
      'EUR'
    ],
    base: 'USD',
    rate: '',
    amount: '',
    convertTo: 'EUR',
    result: '0',
    date: ''
  };

  componentDidMount() {
    fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then(res => res.json())
      .then(data => {
        const rate = data.rates[this.state.convertTo].toFixed(2);
        const date = data.date;
        this.setState({
          rate,
          date
        });
      })
      .catch(err => console.log('err: ', err));
  }

  handleSelect = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      this.calculate
    );
  };

  handleInput = e => {
    this.setState(
      {
        amount: e.target.value
      },
      this.calculate
    );
  };

  calculate = () => {
    const amount = this.state.amount;
    if (amount === isNaN) {
      return;
    } else {
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
        .then(res => res.json())
        .then(data => {
          const result = (data.rates[this.state.convertTo] * amount).toFixed(2);
          const rate = data.rates[this.state.convertTo].toFixed(2);
          this.setState({
            result,
            rate
          });
        })
        .catch(err => console.log('err: ', err));
    }
  };

  render() {
    const {
      currencies,
      base,
      amount,
      convertTo,
      result,
      rate,
      date
    } = this.state;
    return (
      <div>
        <div className='showResult'>
          <h2>
            {amount} {base} = {result} {convertTo}
          </h2>
        </div>
        <div className='container'>
          <div>
            <span>
              <div>
                <form>
                  <input
                    className='input1'
                    type='number'
                    placeholder='0'
                    value={amount}
                    onChange={this.handleInput}
                  />
                  <select
                    id='soflow1'
                    name='base'
                    value={base}
                    onChange={this.handleSelect}
                  >
                    {currencies.map(currency => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </form>
              </div>
            </span>
            <span>
              <div>
                <form>
                  <input className='input2' disabled={true} value={result} />

                  <select
                    id='soflow2'
                    name='convertTo'
                    value={convertTo}
                    onChange={this.handleSelect}
                  >
                    {currencies.map(currency => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </form>
              </div>
            </span>
          </div>
          <div className='equalSign'>
            <h2>=</h2>
          </div>
          <br />

          <div className='subText'>
            Exchange Rate 1 {base} = {rate} {convertTo}
          </div>

          <div className='subText'>
            <p>Date: {date}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Converter;
