import ImagesDataProvider from "./ImagesData";
import SliderOpenProvider from "./SliderOpen";

export default function Providers({ children }) {
  <SliderOpenProvider>
    <ImagesDataProvider>{children}</ImagesDataProvider>
  </SliderOpenProvider>;
}
