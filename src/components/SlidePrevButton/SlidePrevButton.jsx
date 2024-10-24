import { React } from "react";
import { useSwiper } from "swiper/react";
import { GrPrevious } from "react-icons/gr";

export function SlidePrevButton() {
  const swiper = useSwiper();

  return (
    <button className="slide-prev-button" onClick={() => swiper.slidePrev()}>
      <GrPrevious className="=slide-icon" />
    </button>
  );
}
