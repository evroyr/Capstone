import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";

const router = new Navigo("/");

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
    ${Header(state)}
    ${Nav(store.Links)}
    ${Main(state)}
    ${Footer()}
  `;
  router.updatePageLinks();
}

router.hooks({
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";

    switch (view) {
      case "Home":
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&q=orlando`,
          )
          .then((response) => {
            const kelvinToFahrenheit = (kelvinTemp) =>
              Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

            store.Home.weather = {
              city: response.data.name,
              temp: kelvinToFahrenheit(response.data.main.temp),
              feelsLike: kelvinToFahrenheit(response.data.main.feels_like),
              description: response.data.weather[0].main,
            };

            render(store[view]);
            done();
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            done();
          });
        break;
      // Add more cases for other views if needed
      default:
        done();
    }
  },
});

router
  .on({
    "/": () => render(),
    ":view": (params) => {
      let view = capitalize(params.view);
      if (view in store) {
        render(store[view]);
      } else {
        render(store.Viewnotfound);
        console.log(`View ${view} not defined`);
      }
    },
  })
  .resolve();

// Add your form event listeners outside of the router.hooks block
document.querySelector("#fasting-form").addEventListener("submit", (event) => {
  // Your Intermittent Fasting form handling code
});

document.querySelector("#workout-form").addEventListener("submit", (event) => {
  // Your Workouts form handling code
});
