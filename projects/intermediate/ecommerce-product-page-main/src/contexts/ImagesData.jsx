import { createContext, useContext } from "react";
import imagesData from "./../assets/productImages.js";

const ImagesDataContext = createContext();

export default function ImagesDataProvider({ children }) {
  return (
    <ImagesDataContext.Provider value={imagesData}>
      {children}
    </ImagesDataContext.Provider>
  );
}

export const useImagesDataContext = () => {
  const data = useContext(ImagesDataContext);
  return imagesData;
};
