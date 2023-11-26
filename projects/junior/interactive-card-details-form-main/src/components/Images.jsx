/* eslint-disable react/prop-types */
import "./Images.css";
import frontImage from "/bg-card-front.png"
import backImage from "/bg-card-back.png"

function Images({ cardInfo: { holder, number, month, year, cvc } }) {
  const subStringKeys = [0, 4, 8, 12, 16];
  return (
    <div className="images">
      <div className="images__wrap images__front-wrap">
        <img
          className="images__card-front"
          src={frontImage}
          alt="card's front"
        />
        <div className="wrap-texts">
          <div className="wrap-texts__circles">
            <div className="wrap-texts__circle" data-size="large"></div>
            <div className="wrap-texts__circle" data-size="small"></div>
          </div>
          <p className="wrap-texts__card | fs-410 f-letter-spacing-200">
            {subStringKeys.map((key, index) => {
              if (index == subStringKeys.length - 1) return false;
              let section = "";
              for (let i = key; i < subStringKeys[index + 1]; i++) {
                section += number[i] ? number[i] : "0";
              }
              return <span key={index}>{section}</span>;
            })}
            {/* Result: <span>0000</span> <span>0000</span> <span>0000</span> <span>0000</span> */}
          </p>
          <div className="wrap-texts__details | fs-210 f-letter-spacing-100">
            <p className="wrap-texts__holder">
              {holder ? holder.toUpperCase() : "JANE APPLESEED"}
            </p>
            <p className="wrap-texts__date">
              {month.padEnd(2, "0")}/{year.padEnd(2, "0")}
            </p>
          </div>
        </div>
      </div>
      <div className="images__wrap images__back-wrap">
        <img
          className="images__card-back"
          src={backImage}
          alt="card's back"
        />
        <div className="wrap-texts wrap-texts--back">
          <p className="wrap-texts__cvc | fs-210 f-letter-spacing-200">{cvc.padEnd(3, "0")}</p>
        </div>
      </div>
    </div>
  );
}

export default Images;
