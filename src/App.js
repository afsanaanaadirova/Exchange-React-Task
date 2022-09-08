import React, { useEffect, useState } from "react";
import "./index.css";
import CurrencyRow from "./components/CurrencyRow";
import InputRow from "./components/Input.js";
import { FaExchangeAlt } from "react-icons/fa";
import ItemRow from "./components/ItemRow";

const BASE_URL = "https://api.exchangerate.host/latest";

const App = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <div className="main">
        <div className="main__form">
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          />
          <FaExchangeAlt className="exchange-icon" />
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={(e) => setToCurrency(e.target.value)}
            onChangeAmount={handleToAmountChange}
            amount={toAmount}
          />
        </div>
        <div className="main__form-second">
          <h6>Amount</h6>
          <div className="input-groups">
            <InputRow
              onChangeAmount={handleFromAmountChange}
              amount={fromAmount}
            />
            <InputRow onChangeAmount={handleToAmountChange} amount={toAmount} />
          </div>
        </div>
        <div className="main__items">
          <ItemRow
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            setExchangeRate={setExchangeRate}
            amount={amount}
          />
        </div>
      </div>
    </>
  );
};

export default App;
