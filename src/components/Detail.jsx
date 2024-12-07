import { useState, useEffect } from "react";
import { Badge, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { city } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [cityImage, setCityImage] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const kelvinToCelsius = (kelvin) => Math.floor(kelvin - 273.15);

  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  // Fetch current weather
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c6813ff5a5bacdfe42f90489a5ee4a8a`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeatherData(data);
        setCoordinates(data.coord);
      });
  }, [city]);

  // Fetch city photo
  useEffect(() => {
    fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=pJ4K2cXIuVczW_FZQtXCYSGefps-PLFwAa0PvTHehas&per_page=1&orientation=landscape`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setCityImage(data.results[0].urls.regular);
        }
      });
  }, [city]);

  // Fetch forecast
  useEffect(() => {
    if (coordinates) {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=c6813ff5a5bacdfe42f90489a5ee4a8a`
      )
        .then((response) => response.json())
        .then((data) => {
          const groupedForecast = groupByDay(data.list);
          setForecastData(groupedForecast);
        })
        .catch((error) => console.error("Error fetching forecast data:", error));
    }
  }, [coordinates]);

  const groupByDay = (list) => {
    if (!list || !Array.isArray(list)) return {};
    return list.reduce((acc, curr) => {
      const date = curr.dt_txt.split(" ")[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(curr);
      return acc;
    }, {});
  };

  if (!weatherData || !forecastData) {
    return <p>Loading...</p>;
  }

  return (
    <main className="bg-light">
      <Container className="">
        <Row className="pt-3 border rounded p-3">
          <Col xs={12} md={8} className="text-center mb-4">
            {cityImage ? (
              <img
                src={cityImage}
                alt={`City of ${city}`}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "10px"
                }}
              />
            ) : (
              <p>Loading image...</p>
            )}
          </Col>
          <Col xs={12} md={4}>
            <div className="d-flex flex-column h-100 w-100">
              <div className="text-center mb-3">
                <strong>
                  {date} {time}
                </strong>
              </div>
              <h1 className="fs-1 text-center">{city ? city.toUpperCase() : "Unknown City"}</h1>
              <div className="d-flex align-items-center justify-content-center my-3">
                <h1 className="mb-0">{kelvinToCelsius(weatherData.main.temp)}°C</h1>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                  style={{ maxWidth: "100px", height: "auto" }}
                />
              </div>
              <div className="text-start">
                <h4>
                  Feels like: <Badge>{kelvinToCelsius(weatherData.main.feels_like)}°C</Badge>
                </h4>
                <h4>{weatherData.weather[0].description}</h4>
                <h4>Pressure: {weatherData.main.pressure}</h4>
                <h4>Humidity: {weatherData.main.humidity}%</h4>
              </div>
            </div>
          </Col>
        </Row>

        <h2>5-Day Forecast</h2>
        {Object.entries(forecastData).map(([date, forecasts]) => (
          <div key={date}>
            <h4>
              <Badge>{date}</Badge>
            </h4>
            <Row>
              {forecasts.map((forecast, index) => (
                <Col key={index} xs={12} md={4} lg={3} className="mb-3">
                  <Card border="danger">
                    <Card.Body>
                      <Card.Title>{forecast.dt_txt.split(" ")[1]}</Card.Title>
                      <div className="d-flex align-items-center justify-content-center">
                        <h2>{Math.round(forecast.main.temp)}°C</h2>
                        <img
                          src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                          alt={forecast.weather[0].description}
                          style={{ maxWidth: "50px", height: "auto" }}
                        />
                      </div>
                      <p>{forecast.weather[0].description}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Container>
    </main>
  );
};

export default Detail;
