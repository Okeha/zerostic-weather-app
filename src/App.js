import WeatherCard from "./components/card";
import rainyImage from "./assets/images/rainy/background-rain-drops-close-up.jpg";
import sunnyImage from "./assets/images/sunny/blue-sky-background-with-clouds.jpg";
import cloudyImage from "./assets/images/cloudy/cloudy-sky-landscape-wallpaper.jpg";
import {
  Button,
  Divider,
  IconButton,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import Separator from "./components/separator";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { formatDate } from "./helper/helper";
import { ToastContainer, toast } from "react-toastify";

function App() {
  // const [open, setOpen] = useState(false);
  const [city, setCity] = useState("California");
  const [defaultImage, setDefaultImage] = useState(sunnyImage);
  const [anchorEl, setAnchorEl] = useState(null);
  const [recentSearch, setRecentSearch] = useState([]);
  const [weatherData, setWeatherData] = useState({
    location: {},
    current: {
      condition: {
        text: "",
        icon: "",
      },
    },
  });

  console.log(recentSearch);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target);
    const cityToSearch = e.target.city.value;
    setCity(`${cityToSearch}`);

    fetch(
      `http://api.weatherapi.com/v1/current.json?key=cb6693da66e04557811105127240103&q=${cityToSearch}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setWeatherData(data);

        if (recentSearch.length < 5) {
          recentSearch.push(data);
          let newSearchResults = recentSearch;
          setRecentSearch(newSearchResults);
        } else {
          recentSearch.shift();
          recentSearch.push(data);
          let newSearchResults = recentSearch;
          setRecentSearch(newSearchResults);
        }

        const weatherText = data.current.condition.text.toLowerCase();
        if (weatherText === "sunny") {
          setDefaultImage(sunnyImage);
        } else if (
          weatherText === "partly cloudy" ||
          weatherText === "clear" ||
          weatherText === "overcast"
        ) {
          setDefaultImage(cloudyImage);
        } else if (
          weatherText === "rainy" ||
          weatherText === "patchy rain nearby" ||
          weatherText === "light rain" ||
          weatherText === "heavy rain" ||
          weatherText === "thunderstorm"
        ) {
          setDefaultImage(rainyImage);
        } else {
          setDefaultImage(cloudyImage);
        }

        // console.log(defaultImage);
      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  // const viewHistory = () => {};

  useEffect(() => {
    async function getTemp() {
      fetch(
        `http://api.weatherapi.com/v1/current.json?key=cb6693da66e04557811105127240103&q=${city}`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data);
        })
        .catch((err) => {
          toast.error(`${err}`);
        });
    }

    getTemp();
  }, [city, defaultImage]);

  return (
    <div className="App">
      <div
        className="ui segment"
        style={{
          padding: 0,
          margin: 0,
          backgroundColor: "black",
          backgroundImage: `url(${defaultImage})`,
          // opacity: 0.4,
          backgroundSize: "cover",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="ui segment"
          style={{
            width: "60%",
            margin: 0,
            padding: "20px",
            /* From https://css.glass */
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "16px",
            boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5px)",
            webkitBackdropFilter: "blur(5px)",
          }}
        >
          <Separator size={10} />
          <form onSubmit={handleSubmit}>
            <TextField
              id="city"
              label="Search City..."
              InputProps={{
                style: {
                  borderRadius: "50px",
                },
              }}
              margin="normal"
              size="small"
              sx={{
                borderColor: "white",
                marginRight: "10px",
              }}
            ></TextField>
            <Button
              type="submit"
              variant="contained"
              style={{ borderRadius: "50px" }}
            >
              <IconButton>
                <Search style={{ color: "white" }} />
              </IconButton>
              Search
            </Button>
          </form>

          <Separator size={10} />
          <Button
            variant="contained"
            size="small"
            style={{ borderRadius: 0 }}
            onClick={handleOpen}
          >
            View Search History
          </Button>
          <Separator size={20} />
          <WeatherCard
            city={weatherData.location.name}
            time={formatDate(weatherData.location.localtime)}
            text={weatherData.current.condition.text}
            image={weatherData.current.condition.icon}
            temp_c={weatherData.current.temp_c}
            temp_f={weatherData.current.temp_f}
            wind_kph={weatherData.current.wind_kph}
            humidity={weatherData.current.humidity}
            cloud={weatherData.current.cloud}
          />
        </div>
      </div>
      <Popover
        id={id}
        open={open}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 0, left: 0 }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        {/* <div> */}

        <div className="ui segment" style={{ padding: "50px" }}>
          <div
            style={{ display: "flex", justifyContent: "end", padding: "10px" }}
            onClick={handleClose}
          >
            <Typography variant="h4" style={{ cursor: "pointer" }}>
              X
            </Typography>
          </div>
          <Separator size={50} />
          <Typography variant="h4">Search History</Typography>
          <Separator size={20} />
          <Divider />
          <Separator size={20} />
          <TableContainer style={{ overflow: "scroll" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">City</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Status</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">&deg;C</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">&deg;F</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Date</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {recentSearch.map((element, index) => (
                  <TableRow key={index}>
                    <TableCell>{element.location.name}</TableCell>
                    <TableCell>{element.current.condition.text}</TableCell>
                    <TableCell>{element.current.temp_c}</TableCell>
                    <TableCell>{element.current.temp_f}</TableCell>
                    <TableCell>
                      {formatDate(element.location.localtime)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Popover>
      <ToastContainer />
    </div>
  );
}

export default App;
