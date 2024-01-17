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
    const fastingForm = document.querySelector("#fasting-form");
    fastingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("Fasting form submitted!");

      // Get the form element and create inputList inside the event handler
      const inputList = event.target.elements;
      console.log("Input Element List", inputList);

      // Create a request body object for fasting form inside the event handler
      const fastingRequestData = {
        user: "Antonio",
        startDateTime: inputList["start-time"].value,
        endDateTime: inputList["end-time"].value,
        duration: inputList.duration.value,
        notes: inputList.notes.value,
      };

      console.log("Fasting Request Body", fastingRequestData);

      axios
        // Make a POST To track your fasting
        .post(`${process.env.CAPSTONE_API}/Fasting`, fastingRequestData)
        .then((response) => {
          // Then push the new data onto the state attribute
          store.Fasting.Fasting.push(response.data);
          router.navigate("/Fasting");
        })
        // If there is an error log it to the console
        .catch((error) => {
          console.log("It puked", error);
        });
    });
  }

  if (state.view === "Workouts") {
    const workoutsForm = document.querySelector("#workouts-form");
    workoutsForm.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("Workouts form submitted!");

      // Get the form element and create inputList inside the event handler
      const inputList = event.target.elements;
      console.log("Input Element List", inputList);

      const workoutsRequestData = {
        user: "Anonymous User",
        exercise: inputList.exercise.value,
        duration: inputList.duration.value,
        intensity: inputList.intensity.value,
        notes: inputList.notes.value,
        // Add other relevant properties for your workout data
      };
      console.log("Workouts Request Body", workoutsRequestData);

      axios
        // Make a POST To track your workout
        .post(`${process.env.CAPSTONE_API}/Workouts`, workoutsRequestData)
        .then((response) => {
          // Then push the new data onto the state attribute
          store.Workouts.Workouts.push(response.data);
          router.navigate("/Workouts");
        })
        // If there is an error log it to the console
        .catch((error) => {
          console.log("It puked", error);
        });
    });
  }
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

//
