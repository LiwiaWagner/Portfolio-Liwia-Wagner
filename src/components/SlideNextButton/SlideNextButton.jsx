import { React } from "react";
import { useSwiper } from "swiper/react";
import { GrNext } from "react-icons/gr";

export function SlideNextButton() {
  const swiper = useSwiper();

  return (
    <button className="slide-next-button" onClick={() => swiper.slideNext()}>
      <GrNext />
    </button>
  );
}
