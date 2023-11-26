import { useState } from "react";
import cartIconWhite from "/icon-cart-white.svg";
import minusIcon from "/icon-minus.svg";
import plusIcon from "/icon-plus.svg";
import productThumbnail from "/image-product-1-thumbnail.jpg";
import toast, { Toaster } from "react-hot-toast";

function HeroCaption({ addproduct }) {
  function sendData(number) {
    addproduct({
      image: productThumbnail,
      number: number,
      name: "Fall Limited Edition Sneakers",
      price: "125.00",
    });
    toast.success(
      number === 0 ? `Removed From Cart` : `${number} Added To Cart`
    );
  }

  return (
    <div className="hero-caption | fw-bold">
      <Toaster />
      <CaptionTexts />
      <CaptionPrices />
      <CaptionActions sendData={sendData} />
    </div>
  );
}

function CaptionTexts() {
  return (
    <>
      <p className="hero-caption__company | fs-100 clr-primary-100">
        SNEAKER COMPANY
      </p>
      <h1 className="hero-caption__heading | fs-810">
        Fall Limited Edition Sneakers
      </h1>
      <p className="hero-caption__desc | fs-310 fw-regular clr-neutral-400">
        These low-profile sneakers are your perfect casual wear companion.
        Featuring a durable rubber outer sole, they’ll withstand everything the
        weather can offer.
      </p>
    </>
  );
}

function CaptionPrices() {
  return (
    <div className="hero-caption__prices | fs-400">
      <span className="hero-caption__prices-wrap">
        <p className="hero-caption__price | fs-600">$125.00</p>
        <p className="hero-caption__offer | clr-primary-100">50%</p>
      </span>
      <s className="hero-caption__prev-price | clr-neutral-300">$250.00</s>
    </div>
  );
}

function CaptionActions({ sendData }) {
  const [number, setNumber] = useState(0);
  const handleNumber = (action) => {
    setNumber((prev) => (action === "inc" ? prev + 1 : prev - 1));
  };

  return (
    <div className="hero-caption__actions | fs-300">
      <div className="number-button | round-1">
        <button
          className="number-button__minus"
          onClick={
            number > 0
              ? () => setNumber((prev) => prev - 1)
              : () => toast.error("Can't decrease more")
          }
          style={{opacity: number === 0 && ".25"}}
        >
          <img src={minusIcon} alt="decrease" />
        </button>
        <p aria-label="number of order">{number}</p>
        <button
          className="number-button__plus"
          onClick={() => setNumber((prev) => prev + 1)}
        >
          <img src={plusIcon} alt="increase" />
        </button>
      </div>
      <button
        className="action-button | clr-neutral-100 round-1"
        onClick={() => sendData(number)}
      >
        <img src={cartIconWhite} alt={"Add to cart"} />
        Add to cart
      </button>
    </div>
  );
}

export default HeroCaption;
