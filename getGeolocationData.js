var mymap = L.map("mapid");
(function () {
  getApiData("", (api_data) => {
    let data = JSON.parse(api_data);
    updateInformationBlock(
      data.ip,
      data.location.city,
      data.location.region,
      data.location.postalCode,
      data.location.timezone,
      data.isp
    );
    document.getElementById("input_ip").value = data.ip;
    setMap(data.location.lat, data.location.lng);
  });
})();

function readInputValue() {
  var input_value = document.getElementById("input_ip").value;
  console.log(input_value);

  getApiData(input_value, (api_data) => {
    let data = JSON.parse(api_data);
    console.log(data);
    updateInformationBlock(
      data.ip,
      data.location.city,
      data.location.region,
      data.location.postalCode,
      data.location.timezone,
      data.isp
    );
    setMap(data.location.lat, data.location.lng);
  });
}

function updateInformationBlock(ip, city, region, postalCode, timezone, isp) {
  document.getElementById("ip").innerHTML = ip;
  document.getElementById(
    "place"
  ).innerHTML = `${city} ${region} ${postalCode}`;
  document.getElementById("time").innerHTML = `UTC ${timezone}`;
  document.getElementById("name").innerHTML = isp;
}

function getApiData(ip, callback) {
  const Http = new XMLHttpRequest();
  const url = `https://geo.ipify.org/api/v1?apiKey=at_o43DDgMLLFW1QvbwbdEWLT2nFn6VC&ipAddress=${ip}&domain=${ip}`;
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callback(Http.responseText);
    }
  };
}

function setMap(x, y) {
  mymap.setView([x, y], 13);
  L.marker([x, y]).addTo(mymap);
  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mymap);
}
