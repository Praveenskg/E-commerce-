import Carousel from "react-bootstrap/Carousel";
import img1 from "./assets/1st.jpg";
import img2 from "./assets/2nd.jpg";
import img3 from "./assets/3rd.jpg";
import img4 from "./assets/4th.jpg";
import img5 from "./assets/5th.jpg";
import Map from "./Components/Map";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    document.title = "Praveen Store ";
  }, []);
  return (
    <div>
      <Carousel variant="dark" interval={2500}>
        <Carousel.Item>
          <img
            className="d-block  w-100"
            src={img1}
            alt="First Slide"
            style={{ height: 800, width: 100 }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img2}
            alt="Second Slide"
            style={{ height: 800, width: 100 }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img3}
            alt="Third Slide"
            style={{ height: 800, width: 100 }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img4}
            alt="fourth Slide"
            style={{ height: 800, width: 100 }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img5}
            alt="Fifth Slide"
            style={{ height: 800, width: 100 }}
          />
        </Carousel.Item>
      </Carousel>
      <Map />
    </div>
  );
}
