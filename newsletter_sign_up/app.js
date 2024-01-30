function errorMessageEmail() {
  let inputFieldEmail = document.getElementById("email-input").value;
  let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  console.log(inputFieldEmail);

  if (!emailRegex.test(inputFieldEmail)) {
    document.getElementById("error-message").style.display = "block";
  } else {
    document.getElementById("error-message").style.display = "none";
    return inputFieldEmail;
  }

  if (inputFieldEmail == "") {
    document.getElementById("error-message").style.display = "none";
  }
}
