import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../../styles/CardSlider.module.css";
import Image from "next/image";

interface Car {
  id: number;
  name: string;
  style: string;
  image: string;
}

interface CarSliderProps {
  cars: Car[];
}

const CardSlider: React.FC<CarSliderProps> = ({ cars }) => {
  const settings = {
    dots: true,
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 2.75,
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 2000, // Set the speed in milliseconds (e.g., 3000ms = 3 seconds)
    speed: 1000, // Set the speed of the slide animation in milliseconds
    easing: "ease-in-out", // Use "ease-in-out" for a smooth transition
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {cars.map((car) => (
          <div key={car.id} className={styles["car-card"]}>
            {/* Use next/image for optimized image loading */}
            <p className="p-2">
              <strong>Style:</strong> {car.style}
            </p>
            <Image src={car.image} alt={car.name} width={500} height={300} />
            {/* <h3>Name:{car.name}</h3> */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;
