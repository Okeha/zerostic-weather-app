import { Grid, Switch, Typography } from "@mui/material";
import Separator from "./separator";
import { useState } from "react";

export default function WeatherCard({
  city,
  time,
  text,
  image,
  temp_c,
  temp_f,
  wind_kph,
  humidity,
  cloud,
}) {
  const [tempToggle, setTempToggle] = useState("default checked");

  const [temp, setTemp] = useState(``);
  const [unit, setUnit] = useState("C");

  const handleToggle = () => {
    if (tempToggle === "") {
      setTemp(`${temp_c}`);
      setUnit("C");
      setTempToggle("default checked");
    } else {
      setTemp(`${temp_f}`);
      setUnit("F");
      setTempToggle("");
    }
  };
  return (
    <div style={{ color: "white", margin: "0", textAlign: "center" }}>
      <Typography variant="p" style={{ color: "white" }}>
        &deg;C
        {/* <Switch */}
        <Switch onClick={handleToggle} tempToggle />
        &deg;F
      </Typography>
      <Separator size={10} />

      <Typography variant="p">{time}</Typography>

      <Separator size={"10"} />

      <Typography variant="h4" style={{ fontWeight: "500" }}>
        {city}
      </Typography>
      <Separator size={10} />

      <Typography variant="h6">{text}</Typography>
      <Separator size={10} />
      <img src={image} alt="weather widget" />
      <Typography variant="h3" style={{ fontWeight: "bolder" }}>
        {temp}&deg;{unit}
      </Typography>

      <Grid container spacing={2} style={{ padding: "10px" }}>
        <Grid item xs>
          <Typography variant="p">Cloudy</Typography>
          <Separator size={10} />
          <Typography variant="p">{cloud}%</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="p">Humidity</Typography>
          <Separator size={10} />
          <Typography variant="p">{humidity}%</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="p">Wind</Typography>
          <Separator size={10} />
          <Typography variant="p">{wind_kph} kph</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

// const cardProps = PropTypes({

// })
