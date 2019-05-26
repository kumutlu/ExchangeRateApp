import React, { Component } from 'react';
import { JsonToTable } from 'react-json-to-table';

import '../App.css';

class Bank extends Component {
  state = {
    base: 'EUR',
    rate: '',
    amount: '',
    result: '0',
    commission: '0.0',
    exchangeTo: 'USD',
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
    userBalances: [
      { type: 'USD', value: 1000 },
      { type: 'EUR', value: 1000 },
      { type: 'TRY', value: 0 },
      { type: 'CAD', value: 200 },
      { type: 'ABC', value: 0 }
    ]
  };

  toggleDiv = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

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

  handleSwap = e => {
    const base = this.state.base;
    const exchangeTo = this.state.exchangeTo;
    e.preventDefault();
    this.setState(
      {
        exchangeTo: base,
        base: exchangeTo
      },
      this.calculate
    );
  };

  calculate = () => {
    const { amount } = this.state;
    if (amount === isNaN) {
      return;
    } else {
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
        .then(res => res.json())
        .then(data => {
          const rate = data.rates[this.state.exchangeTo];
          const commission = (amount * 0.01).toFixed(2);
          const result = (
            data.rates[this.state.exchangeTo] * amount +
            commission * rate
          ).toFixed(2);
          this.setState({
            commission,
            rate,
            result
          });
        })
        .catch(err => console.log('err: ', err));
    }
  };

  deleteZero = userBalances => {
    const filtered = userBalances.filter(function(userBalances) {
      return userBalances.value !== 0;
    });
    console.log(filtered);
    return filtered;
  };

  buy = () => {
    const {
      amount,
      userBalances,
      exchangeTo,
      currencies,
      base,
      result
    } = this.state;
    if (amount === isNaN) {
      return;
    } else {
      if (
        amount > 0 &&
        // result <= userBalances.value &&
        base !== exchangeTo
      ) {
        userBalances.push({ type: base, value: Number(amount) });
      } else {
      }
    }
  };

  // buyButton = e => {
  //   this.setState(
  //     {
  //       amount: e.target.value
  //     },
  //     this.buy
  //   );
  // };

  render() {
    const {
      commission,
      currencies,
      amount,
      result,
      base,
      exchangeTo
    } = this.state;
    const values = this.deleteZero(this.state.userBalances);
    console.log(values);
    const userHave = values.map(({ type }) => type);
    console.log(userHave);
    return (
      <div>
        <div className='container3'>
          <h1>BANK</h1>
          <div>
            <div>
              {/* <button className='bankButton button3' onClick={this.toggleDiv}>
                Show Balances
              </button>
              <br />
              <div>
                {this.state.show && 'User Balance ='}

                <br />
              </div> */}
              <div onClick={this.buy}>
                {' '}
                User Balance {<JsonToTable json={values} />}
              </div>
              <br />
              <div>
                <label className='payText1'>You Will Get</label>
                <label className='payText2'>You Will Pay</label>
              </div>
              <br />
              <br />
            </div>
          </div>
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
                  <input
                    className='input2'
                    disabled={true}
                    value={this.state.result}
                  />

                  <select
                    id='soflow2'
                    name='exchangeTo'
                    value={exchangeTo}
                    onChange={this.handleSelect}
                  >
                    {userHave.map(userHave => (
                      <option key={userHave} value={userHave}>
                        {userHave}
                      </option>
                    ))}
                  </select>
                </form>
              </div>
            </span>

            <div>
              <span>
                <div>
                  <form>
                    <input
                      className='input3'
                      disabled={true}
                      value={'Commission*: ' + commission + ' ' + base}
                    />
                  </form>
                </div>
              </span>
            </div>
          </div>
          <div>
            <br />

            <button
              type='button'
              value='Submit'
              className='buyButton'
              onClick={this.buy}
            >
              Buy
            </button>
          </div>
          <br />

          <div>*Commission Rate is 1%</div>
        </div>
      </div>
    );
  }
}

export default Bank;
