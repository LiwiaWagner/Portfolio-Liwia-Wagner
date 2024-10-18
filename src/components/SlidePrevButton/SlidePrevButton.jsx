import { React } from "react";
import { useSwiper } from "swiper/react";

export function SlidePrevButton() {
  const swiper = useSwiper();

  return (
    <button className="slide-prev-button" onClick={() => swiper.slidePrev()}>
      Prev
    </button>
  );
}
