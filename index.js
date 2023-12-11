const apiKey = 'YOUR_API_KEY';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=YOUR_CITY&appid=${apiKey}`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Process data here
        console.log(data);
    })
    .catch(error => console.error('Error:', error));



    document.addEventListener('DOMContentLoaded', function () {
      const heroSection = document.getElementById('intermittent-fasting');
      const changeBackgroundBtn = document.getElementById('changeBackgroundBtn');

      const backgrounds = [
          'https://png.pngtree.com/thumb_back/fh260/background/20221021/pngtree-flat-lay-of-popular-168-intermittent-fasting-trend-for-health-and-fitness-promoting-healthy-eating-and-weight-loss-photo-image_39822030.jpg', // Add your image file paths here
          'https://www.verywellhealth.com/thmb/P8zaUtYfI10D6P9j_tMWGTTJJZs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/IntermittentFasting_final-0b2134c18e154613b64a21a48b5b0114.jpg',
          'https://bonytobeastly.com/wp-content/uploads/2018/07/intermittent-fasting-skinny-bulking-muscle-hypertrophy-1.jpg',
      ];

      changeBackgroundBtn.addEventListener('click', function () {
          const randomIndex = Math.floor(Math.random() * backgrounds.length);
          const randomBackground = backgrounds[randomIndex];
          heroSection.style.backgroundImage = `url('${randomBackground}')`;
