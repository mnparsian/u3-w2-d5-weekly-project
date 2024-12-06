import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Card, Container } from "react-bootstrap";

const WeatherSlider = ({ recentCities }) => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const promises = recentCities.map(async (city) => {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c6813ff5a5bacdfe42f90489a5ee4a8a`);
          const data = await response.json();
          return {
            name: city,
            temp: `${Math.round(data.main.temp)}°C`,
            description: data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
          };
        });
        const results = await Promise.all(promises);
        setWeatherData(results);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (recentCities.length > 0) {
      fetchWeatherData();
    }
  }, [recentCities]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  if (!weatherData || weatherData.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Slider {...settings}>
        {weatherData.map((city, index) => (
          <div key={index} className="d-flex justify-content-center">
            <Card style={{ width: "30rem" }} className="p-3 shadow-lg bg-light">
              <div className="d-flex align-items-center">
                <div style={{ flex: "1", textAlign: "center" }}>
                  <img src={city.icon} alt={city.description} style={{ width: "100px", height: "100px" }} />
                </div>

                <div style={{ flex: "2", textAlign: "center" }}>
                  <Card.Body>
                    <Card.Title className="display-4">{city.temp}</Card.Title>
                    <Card.Text className="fs-5 text-muted">{city.name.toUpperCase()}</Card.Text>
                    <Card.Text className="text-muted">{city.description}</Card.Text>
                  </Card.Body>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export default WeatherSlider;
