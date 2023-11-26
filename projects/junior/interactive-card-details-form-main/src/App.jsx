import { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Images from "./components/Images";
import ThankYou from "./components/ThankYou";
import gsap from "gsap";
import { Power4 } from "gsap/gsap-core";

function App() {
  const [cardInfo, setCardInfo] = useState({
    holder: "",
    number: "",
    month: "",
    year: "",
    cvc: "",
  });
  const [submited, setSubmited] = useState(false);

  const submitHandler = () => {
    setSubmited(true);
  };

  const cardInfoHandler = (name, value) => {
    setCardInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    if (submited === true) {
      gsap.fromTo(
        ".ty-modal > *",
        { opacity: 0, y: 40 },
        { opacity: 1, duration: .625, y: 0, stagger: 0.0675 }
      );
    }
  }, [submited]);

  // GSAP Animating
  useLayoutEffect(() => {
    gsap.fromTo(
      ".images > *",
      {
        opacity: 1,
        y: 80,
      },
      { opacity: 1, y: 0, duration: 2, ease: Power4.easeInOut }
    );

    gsap.fromTo(".images > *", { opacity: 0 }, { opacity: 1, duration: 1 });

    gsap.fromTo(
      ".form-wrap, .form-button",
      { opacity: 0, y: 25 },
      {
        y: 0,
        opacity: 1,
        ease: Power4.ease,
        duration: 0.75,
        delay: 1.125,
        stagger: 0.25,
      }
    );
  }, []);

  return (
    <main className="main">
      <section className="container ">
        <Images cardInfo={cardInfo} />
        {submited ? (
          <ThankYou />
        ) : (
          <Form
            submitHandler={submitHandler}
            cardInfo={cardInfo}
            cardInfoHandler={cardInfoHandler}
          />
        )}
      </section>
    </main>
  );
}

export default App;
