import { useState, useEffect } from "react";
import { Button, Col, Container, InputGroup, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import WeatherSlider from "./WeatherSlider";

const Home = () => {
  const [city, setCity] = useState("");
  const [recentCities, setRecentCities] = useState(() => {
    const storedCities = localStorage.getItem("recentCities");
    return storedCities ? JSON.parse(storedCities) : [];
  });

  const navigate = useNavigate();

  const handleNavigate = () => {
    if (city.trim() === "") {
      alert("Please enter a city name!");
      return;
    }

    if (!recentCities.includes(city)) {
      const updatedCities = [city, ...recentCities].slice(0, 5);
      setRecentCities(updatedCities);
      localStorage.setItem("recentCities", JSON.stringify(updatedCities));
    }

    navigate(`/detail/${city}`);
  };

  return (
    <Container fluid className="text-center bg-color">
      <Row className="pt-3">
        <Col xs={12}>
          <WeatherSlider recentCities={recentCities} />
        </Col>
      </Row>

      <Row className="justify-content-around vh-100">
        <Col xs={12} md={8}>
          <h1 className="my-5">Weather</h1>
          <InputGroup className="mb-3">
            <Button variant="danger" id="button-addon1" onClick={handleNavigate}>
              Search
            </Button>
            <Form.Control
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
              placeholder="Please enter your city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
