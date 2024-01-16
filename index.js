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
  afterRender(state);
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

            done(store.Home);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            done(store.Home);
          });
        break;

      case "Fasting":
        done();
        break;

      case "Workouts":
        done();
        break;

      default:
        done();
    }
  },
  already: (params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";

    render(store[view]);
  },
});

function afterRender(state) {
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });

  if (state.view === "Fasting") {
    renderFastingView();
  }

  if (state.view === "Workouts") {
    renderWorkoutsView();
  }
}

function handleFastingFormSubmit(event) {
  event.preventDefault();
  console.log("Fasting form submitted!");
  const formData = new FormData(event.target);
  console.log("Form data:", formData);
}

function handleWorkoutsFormSubmit(event) {
  event.preventDefault();
  console.log("Workouts form submitted!");
  const formData = new FormData(event.target);
  console.log("Form data:", formData);
}

function renderFastingView() {
  const fastingButton = document.querySelector("#fasting-button");
  fastingButton.addEventListener("click", () => {
    console.log("Fasting button clicked!");
  });

  const fastingForm = document.querySelector("#fasting-form");
  fastingForm.addEventListener("submit", handleFastingFormSubmit);
}

function renderWorkoutsView() {
  const workoutsButton = document.querySelector("#workouts-button");
  workoutsButton.addEventListener("click", () => {
    console.log("Workouts button clicked!");
  });

  const workoutsForm = document.querySelector("#workouts-form");
  workoutsForm.addEventListener("submit", handleWorkoutsFormSubmit);
}

router
  .on({
    "/": () => render(),
    "/fasting": () => render(store.Fasting),
    "/workouts": () => render(store.Workouts),
    ":view": (params) => {
      let view = capitalize(params.data.view);
      if (view in store) {
        render(store[view]);
      } else {
        render(store.Viewnotfound);
        console.log(`View ${view} not defined`);
      }
    },
  })
  .resolve();
