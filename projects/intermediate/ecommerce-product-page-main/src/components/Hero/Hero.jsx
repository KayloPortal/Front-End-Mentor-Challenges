import "./Hero.css";
import HeroImages from "./Elements/HeroImages";
import SliderOpenProvider, {
  useSliderOpenContext,
} from "../../contexts/SliderOpen.jsx";
import Providers from "../../contexts/Providers";
import ImagesDataProvider from "../../contexts/ImagesData";

function Hero({ children }) {
  return (
    <SliderOpenProvider>
      <ImagesDataProvider>
        <main className="hero">
          <div className="container hero-container">
            <HeroImages />
            {children}
            <SliderModal />
          </div>
        </main>
      </ImagesDataProvider>
    </SliderOpenProvider>
  );
}

function SliderModal() {
  const { handleSliderOpen, sliderOpen } = useSliderOpenContext();
  if (sliderOpen === false) return null
  return (
    <div className="slider-modal">
      <div
        className="slider-modal__backdrop"
        onClick={() => handleSliderOpen(false)}
      ></div>
      <div>
        <button
          className="slider-modal__button"
          onClick={() => handleSliderOpen(false)}
        >
          <svg className="slider-modal__icon">
            <use xlinkHref="/icon-close.svg#icon-close"></use>
          </svg>
        </button>
        <HeroImages extraClassName={"slider-modal__content"} />
      </div>
    </div>
  );
}

export default Hero;
