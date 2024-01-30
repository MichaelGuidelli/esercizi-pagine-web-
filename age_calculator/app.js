function getValueOfInputDate() {
  let day = document.getElementById("day-input");
  let month = document.getElementById("month-input");
  let year = document.getElementById("year-input");

  checkIfInputIsEmpty([day, month, year]);
}

function checkIfInputIsEmpty(arrayOfInput) {
  let arrayOfValues = [];

  arrayOfInput.forEach((element) => {
    if (
      element.value === "" ||
      element.value === null ||
      element.value === "undefined"
    ) {
      document.querySelector("label[for='" + element.name + "']").style.color =
        "red";
      document.getElementById("error-" + element.name).innerText =
        "This field is required";
      document.getElementById(element.id).style.border = "1px solid red";
    } else {
      arrayOfValues.push(element.value);
    }
  });

  if (arrayOfValues.length > 2) {
    dateConstructor(arrayOfValues);
  }
}

function isDayValueCorrect(dayValue) {
  if (dayValue > 0 && dayValue < 31) {
    return dayValue;
  } else {
    document.getElementById("error-day").innerText = "Must be a valid day";
    document.querySelector("label[for='day']").style.color = "red";
    document.getElementById("day-input").style.border = "1px solid red";
    return "- -";
  }
}

function isMonthValueCorrect(monthValue) {
  if (monthValue > 0 && monthValue < 13) {
    return monthValue;
  } else {
    document.getElementById("error-month").innerText = "Must be a valid month";
    document.querySelector("label[for='month']").style.color = "red";
    document.getElementById("month-input").style.border = "1px solid red";
    return "- -";
  }
}

function isYearValueCorrect(yearValue) {
  if (yearValue <= new Date().getFullYear()) {
    return yearValue;
  } else {
    document.getElementById("error-year").innerText = "Must be in the past";
    document.querySelector("label[for='year']").style.color = "red";
    document.getElementById("year-input").style.border = "1px solid red";
    return "- -";
  }
}

function errorHasBeenHandle() {
  let arrayOfLabels = document.getElementsByTagName("label");
  for (let label = 0; label < arrayOfLabels.length; label++) {
    arrayOfLabels[label].style.color = "hsl(0, 1%, 44%)";
  }

  let arrayOfInputs = document.getElementsByTagName("input");
  for (let input = 0; input < arrayOfInputs.length; input++) {
    arrayOfInputs[input].style.border = "1px solid hsl(0, 0%, 86%)";
  }

  document.getElementById("error-day").innerText = "";
  document.getElementById("error-month").innerText = "";
  document.getElementById("error-year").innerText = "";
}

function dateConstructor(arrayOfValues) {
  errorHasBeenHandle();
  let day = isDayValueCorrect(arrayOfValues[0]);
  let month = isMonthValueCorrect(arrayOfValues[1]);
  let year = isYearValueCorrect(arrayOfValues[2]);

  let date = year + "-" + month + "-" + day;

  CalculateDifferenceBteenDates(date);
}

function CalculateDifferenceBteenDates(date) {
  let today = new Date();
  let past = new Date(date);

  let diff = Math.floor(today.getTime() - past.getTime());
  let day = 1000 * 60 * 60 * 24;

  let days = Math.floor(diff / day);
  let months = Math.floor(days / 31);
  let years = Math.floor(months / 12);

  resultToDisplay = [days, months, years];

  displayResult(resultToDisplay);
}

function displayResult(resultToDisplay) {
  document.getElementById("result-day").innerText = resultToDisplay[0];
  document.getElementById("result-month").innerText = resultToDisplay[1];
  document.getElementById("result-year").innerText = resultToDisplay[2];
}
