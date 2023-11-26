import { useLayoutEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import HeroCaption from "./components/Hero/Elements/HeroCaption";
import gsap, { Power4 } from "gsap";
function App() {
  const [products, setProducts] = useState([]);

  const addproduct = (product) => {
    setProducts((prev) => {
      let newProducts = [
        ...prev.filter((info) => info.name !== product.name),
        // product.number !== 0 ? product : null,
      ];
      product.number !== 0 && newProducts.push(product);
      return newProducts;
    });
  };

  // GSAP
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".navigation__item",
        { opacity: 0, y: -80 },
        {
          opacity: 1,
          y: 0,
          ease: Power4.easeInOut,
          duration: .5,
          stagger: 0.125,
        }
      );
      // gsap.fromTo("header");
      gsap.fromTo(
        ".header-line",
        { width: 0 },
        { width: "100%", duration: 1.5, ease: Power4.easeInOut }
      );
      gsap.fromTo(
        "header > *:not(.navigation)",
        { opacity: 0, y:-40, },
        { opacity: 1, y:0, delay: 0.25, duration: 1.5 }
      );
      gsap.fromTo(
        ".hero-images",
        { opacity: 0, y: 80 },
        { y: 0, opacity: 1, ease: Power4.easeOut, duration: 1.5, delay: .25 }
      );
      gsap.fromTo(
        ".hero-images__list div",
        { opacity: 0, y: 40 },
        {
          y: 0,
          opacity: 1,
          ease: Power4.easeInOut,
          duration: 0.325,
          // delay: 0.25,
          stagger: 0.25,
        }
      );
      // gsap.fromTo(
      //   ".hero-images__preview-image",
      //   {transform: "scale(1.5)"},
      //   {transform: "scale(0)", ease: Power4.easeOut, duration: 4}
      // )
      gsap.fromTo(
        ".hero-caption > *",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          ease: Power4.easeOut,
          duration: 1,
          stagger: 0.125,
          delay: .25,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Header products={products} />
      <Hero>
          <HeroCaption addproduct={addproduct} />
      </Hero>
    </>
  );
}

export default App;
