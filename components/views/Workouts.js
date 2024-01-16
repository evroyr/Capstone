import html from "html-literal";
import workoutpic from "../../assets/img/workout.jpg";

export default () => html`
  <section id="workout">
    <form id="workout-form" method="POST" action="">
      <h2>Record Workout Session</h2>
      <img src=${workoutpic} alt="me" />
      <div>
        <label for="exercise">Exercise:</label>
        <input
          type="text"
          id="exercise"
          name="exercise"
          placeholder="Enter the exercise"
          required
        />
      </div>
      <div>
        <label for="duration">Duration (minutes):</label>
        <input type="number" id="duration" name="duration" required />
      </div>
      <div>
        <label for="intensity">Intensity:</label>
        <select id="intensity" name="intensity">
          <option value="">Select Intensity</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <label for="notes">Notes:</label>
        <textarea
          id="notes"
          name="notes"
          placeholder="Enter any notes"
        ></textarea>
      </div>
      <input type="hidden" name="user" id="user" value="Anonymous User" />
      <input type="submit" name="submit" value="Submit Workout Record" />
    </form>
  </section>
`;
