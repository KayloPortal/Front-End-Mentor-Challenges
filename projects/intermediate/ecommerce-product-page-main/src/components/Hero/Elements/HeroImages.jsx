import { useEffect, useState } from "react";
// import imagesData from "/src/assets/productImages.js";
import arrowRight from "/image-arrow-right.svg";
import arrowLeft from "/image-arrow-left.svg";
import { useImagesDataContext } from "../../../contexts/ImagesData";
import { useSliderOpenContext } from "../../../contexts/SliderOpen";

function HeroImages({ extraClassName }) {
  const imagesData = useImagesDataContext();
  const [selectedId, setSelectId] = useState(imagesData[0].id);

  // Elements

  const handleSelect = (id) => {
    setSelectId(id);
  };

  const handleSlide = (action) => {
    setSelectId((prevId) => {
      prevId = Number(prevId);
      return action === "inc"
        ? prevId !== imagesData.at(-1).id
          ? prevId + 1
          : prevId
        : prevId !== imagesData[0].id
        ? prevId - 1
        : prevId;
    });
  };

  return (
    <div className={`hero-images ${extraClassName ? extraClassName : ""}`}>
      <ImagesPreview handleSlide={handleSlide} selectedId={selectedId} />
      <ImagesList handleSelect={handleSelect} selectedId={selectedId} />
    </div>
  );
}

function ImagesPreview({ selectedId, handleSlide }) {
  const { handleSliderOpen } = useSliderOpenContext();
  const imagesData = useImagesDataContext();
  const images = imagesData.map((info) => (
    <img
      className={`hero-images__preview-image hero__image--display-${
        selectedId === info.id ? "visible" : "none"
      }`}
      key={info.id}
      src={info.image}
      alt={`product image ${info.id}`}
    />
  ));
  return (
    <>
      <img
        className="hero-images__preview-image display-none-desktop"
        src={imagesData[0].image}
        alt=""
        style={{
          opacity: 0,
          position: "relative",
          visibility: "hidden",
        }}
      />
      <div
        className="hero-images__preview"
        style={{ "--distance": `${-1 * (selectedId - 1) * 100}dvw` }}
        onClick={() => handleSliderOpen(true)}
      >
        {images}
      </div>
      <div className="hero-images__arrows display-none-desktop">
        <img
          src={arrowLeft}
          alt="previous image"
          className="arrow"
          onClick={() => handleSlide("dec")}
          style={{
            opacity: selectedId == imagesData[0].id ? ".75" : "1",
          }}
        />
        <img
          src={arrowRight}
          alt="next image"
          className="arrow"
          onClick={() => handleSlide("inc")}
          style={{
            opacity: selectedId == imagesData.at(-1).id ? ".75" : "1",
          }}
        />
      </div>
    </>
  );
}

function ImagesList({ handleSelect, selectedId }) {
  const imagesData = useImagesDataContext();
  return (
    <ul role="list" className="hero-images__list | display-none-mobile">
      {imagesData.map((info) => (
        <li key={info.id}>
          <button onClick={() => handleSelect(info.id)}>
            <div>
              <img
                src={info.thumbnail}
                className={`${
                  selectedId == info.id ? "selected" : ""
                } | round-2`}
                alt={`select product image ${info.id}`}
              />
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default HeroImages;
