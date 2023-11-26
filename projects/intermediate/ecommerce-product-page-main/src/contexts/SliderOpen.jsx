import { createContext, useContext, useState } from "react";

const SliderOpenContext = createContext();

export default function SliderOpenProvider({ children }) {
  const [sliderOpen, setSliderOpen] = useState(false);
  const handleSliderOpen = (bin, reverse = false) => {
    console.log("H");
    setSliderOpen((prev) => reverse ? !prev : bin)
  };
  return (
    <SliderOpenContext.Provider
      value={{ sliderOpen, setSliderOpen, handleSliderOpen }}
    >
      {children}
    </SliderOpenContext.Provider>
  );
}

export const useSliderOpenContext = () => {
  const data = useContext(SliderOpenContext);
  if (data === undefined) {throw new Error("Context used out of range")}
  return data
};
