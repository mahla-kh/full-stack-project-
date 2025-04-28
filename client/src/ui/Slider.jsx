import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Import Swiper JS
// import { Swiper, SwiperSlide } from "swiper/react";

function Slider() {
  return (
    <div className="container mx-auto p-4">
      <swiper-container
        space-between="50"
        slides-per-view="3"
        navigation
        pagination="true"
        scrollbar="true"
        class="mySwiper"
      >
        <swiper-slide>
          <div className="bg-blue-500 p-10 text-white text-center rounded-lg">
            <h2>Slide 1</h2>
            <p>This is the first slide content.</p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div className="bg-red-500 p-10 text-white text-center rounded-lg">
            <h2>Slide 2</h2>
            <p>This is the second slide content.</p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div className="bg-green-500 p-10 text-white text-center rounded-lg">
            <h2>Slide 3</h2>
            <p>This is the third slide content.</p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div className="bg-yellow-500 p-10 text-white text-center rounded-lg">
            <h2>Slide 4</h2>
            <p>This is the fourth slide content.</p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div className="bg-purple-500 p-10 text-white text-center rounded-lg">
            <h2>Slide 5</h2>
            <p>This is the fifth slide content.</p>
          </div>
        </swiper-slide>
      </swiper-container>
    </div>
  );
}

export default Slider;
