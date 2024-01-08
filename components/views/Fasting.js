import html from "html-literal";

export default () => html`
  <section id="fasting">
    <form id="fasting-form" method="POST" action="">
      <h2>Record Intermittent Fasting</h2>
      <div>
        <label for="start-time">Start Time:</label>
        <input
          type="datetime-local"
          id="start-time"
          name="start-time"
          required
        />
      </div>
      <div>
        <label for="end-time">End Time:</label>
        <input type="datetime-local" id="end-time" name="end-time" required />
      </div>
      <div>
        <label for="duration">Duration (hours):</label>
        <input type="number" id="duration" name="duration" required />
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
      <input type="submit" name="submit" value="Submit Fasting Record" />
    </form>
  </section>
`;
