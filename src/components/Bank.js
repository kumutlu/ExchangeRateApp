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
      {
        type: 'USD',
        value: 1000
      }
    ]
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
    // console.log(filtered);
    return filtered;
  };

  // buy = () => {
  //   const { userBalances, base, amount } = this.state;
  //   const destinationBalance = userBalances.filter(x => x.type === base)[0];
  //   console.log(destinationBalance);

  //   if (destinationBalance) {
  //     this.setState({
  //       userBalances: (userBalances[destinationBalance] = base)
  //     });
  //   } else {
  //     this.setState({
  //       userBalances: userBalances.push({ type: base, value: Number(amount) })
  //     });
  //   }
  // };
  buy = e => {
    e.preventDefault();
    const { amount, userBalances, exchangeTo, base, result } = this.state;

    if (amount === isNaN) {
      return;
    }
    // console.log(userBalances.filter(x => x.type === exchangeTo)[0].value);
    if (result > userBalances.filter(x => x.type === exchangeTo)[0].value) {
      alert('Insufficent Balance');
      return;
    }
    if (amount <= 0) {
      alert('Please Enter Positive Number');
      return;
    }

    const destinationBalance = userBalances.find(x => x.type === base);
    console.log(destinationBalance);
    const newBalances = userBalances.map(balance => {
      console.log(balance);
      if (balance.type === base) {
        return {
          type: base,
          value: Number(amount) + userBalances.find(x => x.type === base).value
        };
      }
      if (balance.type === exchangeTo) {
        return {
          type: exchangeTo,
          value:
            userBalances.find(x => x.type === exchangeTo).value - Number(result)
        };
      }
    });

    if (destinationBalance) {
      this.setState({
        userBalances: newBalances
      });
      // console.log(userBalances.filter(x => x.type === base)[0].value);
      // console.log(result);
    } else {
      this.setState({
        userBalances: [
          ...userBalances,
          {
            type: base,
            value: Number(amount)
          }
        ]
        // userBalances: userBalances.push({ type: base, value: Number(amount) })
      });

      //
    }

    // this.setState(prev => ({
    //   userBalances: [
    //     ...prev.userBalances,
    //     {
    //       type: exchangeTo,
    //       value:
    //         userBalances.filter(x => x.type === exchangeTo)[0].value -
    //         Number(result)
    //     }
    //   ]
    // }));
    // console.log(userBalances.filter(x => x.type === exchangeTo)[0].value);
  };

  render() {
    const { commission, currencies, amount, base, exchangeTo } = this.state;
    const values = this.deleteZero(this.state.userBalances);
    // console.log(values);
    const userHave = values.map(({ type }) => type);
    // console.log(userHave);
    return (
      <div>
        <div className='container3'>
          <h1> BANK </h1>{' '}
          <div>
            <div>
              <div> User Balance {<JsonToTable json={values} />} </div> <br />
              <div>
                <label className='payText1'> You Will Get </label>{' '}
                <label className='payText2'> You Will Pay </label>{' '}
              </div>{' '}
              <br />
              <br />
            </div>{' '}
          </div>{' '}
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
                  />{' '}
                  <select
                    id='soflow1'
                    name='base'
                    value={base}
                    onChange={this.handleSelect}
                  >
                    {' '}
                    {currencies.map(currency => (
                      <option key={currency} value={currency}>
                        {' '}
                        {currency}{' '}
                      </option>
                    ))}{' '}
                  </select>{' '}
                </form>{' '}
              </div>{' '}
            </span>{' '}
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
                    {' '}
                    {userHave
                      .filter(x => x !== this.state.base)
                      .map(x => (
                        <option key={x} value={x}>
                          {' '}
                          {x}{' '}
                        </option>
                      ))}{' '}
                  </select>{' '}
                </form>{' '}
              </div>{' '}
            </span>
            <div>
              <span>
                <div>
                  <form>
                    <input
                      className='input3'
                      disabled={true}
                      value={'Commission*: ' + commission + ' ' + base}
                    />{' '}
                  </form>{' '}
                </div>{' '}
              </span>{' '}
            </div>{' '}
          </div>{' '}
          <div>
            <br />
            <button
              type='button'
              value='Submit'
              className='buyButton'
              onClick={this.buy}
            >
              Buy{' '}
            </button>{' '}
          </div>{' '}
          <br />
          <div> * Commission Rate is 1 % </div>{' '}
        </div>{' '}
      </div>
    );
  }
}

export default Bank;
