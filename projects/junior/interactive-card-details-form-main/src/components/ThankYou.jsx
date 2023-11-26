import "./ThankYou.css";
import approvedImage from "/icon-complete.svg";

function ThankYou() {
  return (
    <div className="ty-modal">
      <img src={approvedImage} alt="Complete" />
      <p className="ty-modal__heading | fs-500 f-letter-spacing-100">THANK YOU</p>
      <p className="ty-modal__desc | fs-200">We’ve added your card details</p>
      <a target="blank" href="https://www.frontendmentor.io/profile/KayloPortal"><button className="ty-modal__button form-button">Continue</button></a>
    </div>
  );
}

export default ThankYou;
