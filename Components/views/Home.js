import html from "html-literal";
import "../../style.css";

export default state => html`
  <section>
    <div class="intermittent-fasting">
      <!-- Added opening div tag -->
      <h2>Welcome to my Website!</h2>
      <p>
        Discover the benefits of intermittent fasting and effective workout
        plans to achieve your fitness goals.
      </p>
    </div>
  </section>

  <section>
    <h2>Featured Content</h2>
    <p>
      Explore our curated collection of articles, tips, and workout routines to
      help you on your fitness journey.
    </p>
    <ul>
      <li>
        <strong>Articles:</strong> Learn about the benefits of intermittent
        fasting, different workout plans, and nutritional tips.
        <a href="#">Read more</a>
      </li>
    </ul>
    <!-- Added closing ul tag -->
  </section>
`;
