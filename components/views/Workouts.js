import html from "html-literal";
import workoutpic from "../../assets/img/workout.jpg";

export default () => html`
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="styles.css" />
      <title>Workouts Page</title>
    </head>
    <body>
      <h1>Workouts Page</h1>

      <div id="workouts-form">
        <img src=${workoutpic} alt="me" />
        <label for="workout-type">Select Workout Type:</label>
        <select id="workout-type" name="workout-type">
          <option value="cardio">Cardio</option>
          <option value="strength">Strength Training</option>
          <!-- Add more workout types as needed -->
        </select>

        <label for="reps">Number of Reps:</label>
        <input type="number" id="reps" name="reps" min="1" required />

        <button id="start-workout">Start Workout</button>
      </div>

      <div id="workout-result"></div>

      <script src="script.js"></script>
    </body>
  </html>
`;
