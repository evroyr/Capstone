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
        user: "Anonymous User",
        startTime: new Date(inputList["start-time"].value),
        endTime: new Date(inputList["end-time"].value),
        duration: parseInt(inputList.duration.value),
        notes: inputList.notes.value,
      };

      console.log("Fasting Request Body", fastingRequestData);

      axios
        .post(`${process.env.RENDER}/Fasting`, fastingRequestData)
        .then((response) => {
          console.log("Successful POST response:", response.data);

          // Assuming response.data is an object, you might want to check its structure
          console.log("Response data structure:", response.data);

          // Then push the new data onto the state attribute
          store.Fasting.fasting.push(response.data);
          router.navigate("/Fasting");
        })
        .catch((error) => {
          console.error("Error during POST:", error);
        });
    });
  }

  if (state.view === "Workouts") {
    document.addEventListener("DOMContentLoaded", function () {
      const workoutTypeDropdown = document.getElementById("workout-type");
      const repsInput = document.getElementById("reps");
      const startWorkoutButton = document.getElementById("start-workout");
      const resultContainer = document.getElementById("workout-result");

      startWorkoutButton.addEventListener("click", function () {
        const workoutType = workoutTypeDropdown.value;
        const reps = repsInput.value;

        const workoutResult = `You selected ${workoutType} workout and should do ${reps} reps.`;

        resultContainer.textContent = workoutResult;
      });

      // Define and populate workoutsRequestData here with the relevant data.
      const workoutsRequestData = {
        workoutType: workoutType,
        reps: reps,
        // Add other relevant data properties.
      };

      console.log("Workouts Request Body", workoutsRequestData);

      axios
        .post(`${process.env.RENDER}/Workouts`, workoutsRequestData)
        .then((response) => {
          store.Workouts.Workouts.push(response.data);
          router.navigate("/Workouts");
        })
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

///
