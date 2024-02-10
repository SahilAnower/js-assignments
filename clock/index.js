// let hr = document.getElementById("hour");
// let min = document.getElementById("min");
// let sec = document.getElementById("sec");

const allHands = Array.from(document.querySelectorAll(".hand"));
const usTime = document.getElementById("usTime");
const kolkataTime = document.getElementById("kolkataTime");

const timeZones = [
  {
    timeZone: "America/New_York",
  },
  {
    timeZone: "Asia/Kolkata",
  },
];

const digitalTimes = [usTime, kolkataTime];

console.log(allHands);

function displayTime(date, hr, min, sec, digitalField) {
  // let date = new Date();

  // Getting hour, mins, secs from date
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  let hRotation = 30 * hh + mm / 2; // 30 degree for each hour, and 1/2 degree for each minute
  let mRotation = 6 * mm; // 6 degrees for each minute
  let sRotation = 6 * ss; // 6 degrees for each second

  hr.style.transform = `rotate(${hRotation}deg)`;
  min.style.transform = `rotate(${mRotation}deg)`;
  sec.style.transform = `rotate(${sRotation}deg)`;

  digitalField.textContent = date.toLocaleString();
}

setInterval(updateHands, 1000);

function updateHands() {
  for (let i = 0, j = 0; i < allHands.length; i += 3, j++) {
    displayTime(
      new Date(new Date().toLocaleString("en-US", timeZones[j])),
      allHands[i],
      allHands[i + 1],
      allHands[i + 2],
      digitalTimes[j]
    );
  }
}
