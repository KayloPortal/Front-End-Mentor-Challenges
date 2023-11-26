/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Form.css";
import RedMark from "./RedMark";

function Form({
  // eslint-disable-next-line react/prop-types
  cardInfo,
  // eslint-disable-next-line react/prop-types
  cardInfoHandler,
  submitHandler,
}) {
  const charLimits = {
    holder: false,
    number: 16,
    month: 2,
    year: 2,
    cvc: 3,
  };
  const numericLimits = {
    month: 12,
  };
  const [checks, setChecks] = useState({
    holder: true,
    number: true,
    month: true,
    year: true,
    cvc: true,
  });

  const numberSort = (string) => {
    return string
      .toString()
      .replace(" ", "")
      .split("")
      .map((num, index) => {
        if ([3, 7, 11].includes(index)) {
          return `${num} `;
        }
        return num;
      })
      .join("");
  };

  const validator = (e) => {
    e.preventDefault()
    setChecks((prev) => {
      let isAllOk = true;
      const newChecks = { ...prev };
      Object.keys(checks).forEach((key) => {
        if (cardInfo[key].length === 0) {
          newChecks[key] = "Can't be blank";
          isAllOk = false;
        } else if (
          charLimits[key] &&
          cardInfo[key].match(/[0-9]/g).length !== charLimits[key]
        ) {
          newChecks[key] =
            cardInfo[key].length !== charLimits[key]
              ? `It must be ${charLimits[key]} characters`
              : "Wrong format, numbers only";
          isAllOk = false;
        } else if (
          numericLimits[key] &&
          Number(cardInfo[key]) > numericLimits[key]
        ) {
          newChecks[key] = `Highest is ${numericLimits[key]}`;
          isAllOk = false;
        } else {
          newChecks[key] = true;
        }
      });
      isAllOk && submitHandler();
      return newChecks;
    });
  };

  const handler = (e) => {
    let { name, value } = e.target;
    if (name !== "holder") {
      value = value.replaceAll(" ", "");
    }
    if (charLimits[name] && charLimits[name] < value.length) {
      value = value.substring(0, value.length - 1);
    }
    cardInfoHandler(name, value);
  };
  return (
    <form className="form" onSubmit={validator}>
      <label className="form-wrap">
        <p>CARDHOLDER NAME</p>
        <input
        className={`${checks.holder !== true && "red-border"}`}
          value={cardInfo.holder ? cardInfo.holder : ""}
          name="holder"
          placeholder="e.g. Jane Appleaeed"
          type="text"
          onChange={handler}
        />
        <RedMark mark={checks.holder} />
      </label>
      <label className="form-wrap">
        <p>CARD NUMBER</p>
        <input
        className={`${checks.number !== true && "red-border"}`}
          value={cardInfo.number ? numberSort(cardInfo.number) : ""}
          name="number"
          placeholder="e.g. 1234 5678 9123 0000"
          type="text"
          onChange={handler}
        />  
        <RedMark mark={checks.number} />
      </label>
      <label className="form-wrap" data-details="exp-date">
        <p>EXP. DATE (MM,YY)</p>
        <div className="input-wrap">
          <div>
            <input
            className={`${checks.month !== true && "red-border"}`}
              value={cardInfo.month ? cardInfo.month : ""}
              name="month"
              placeholder="MM"
              type="text"
              onChange={handler}
            />
            <RedMark mark={checks.month} />
          </div>
          <div>
            <input
            className={`${checks.year !== true && "red-border"}`}
              value={cardInfo.year ? cardInfo.year : ""}
              name="year"
              placeholder="YY"
              type="text"
              onChange={handler}
            />
            <RedMark mark={checks.year} />
          </div>
        </div>
      </label>
      <label className="form-wrap" data-details="cvc">
        <p>CVC</p>
        <div>
          <input
          className={`${checks.cvc !== true && "red-border"}`}
            value={cardInfo.cvc ? cardInfo.cvc : ""}
            name="cvc"
            placeholder="e.g. 123"
            type="text"
            onChange={handler}
          />
          <RedMark mark={checks.cvc} />
        </div>
      </label>
      <button className="form-button">
        Confirm
      </button>
    </form>
  );
}

export default Form;
