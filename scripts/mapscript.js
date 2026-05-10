// Coordinates
  var lat = 46.50478798254945;
  var lon = -112.78417016647462;

// Initialize Map
  var map = L.map('map').setView([lat, lon], 8);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Add Marker
  var marker = L.marker([lat, lon]).addTo(map);
  marker.bindPopup("<b>Hulber's Bed and Breakfast</b><br>Loading weather...").openPopup();

// Weather Fetch
  fetch("https://api.weather.gov/points/" + lat + "," + lon)
    .then(function(res) { return res.json(); })
    .then(function(data) { return fetch(data.properties.forecast); })
    .then(function(res) { return res.json(); })
    .then(function(weather) {
      var current = weather.properties.periods[0];
      marker.setPopupContent("<b>Hulber's Bed and Breakfast</b><br>" + current.temperature + "°F and " + current.shortForecast);
    })
    .catch(function(err) {
      marker.setPopupContent("<b>Hulber's Bed and Breakfast</b><br>Weather unavailable");
    });
