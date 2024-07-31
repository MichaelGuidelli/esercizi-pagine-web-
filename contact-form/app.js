document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const toastElement = document.getElementById("toaster");
  const toast = new bootstrap.Toast(toastElement);

  function validateField(field) {
    const errorId = field.getAttribute("data-error-id");
    const errorElement = document.getElementById(errorId);

    if (field.type === "checkbox") {
      if (!field.checked) {
        errorElement.classList.remove("d-none");
        field.classList.add("error");
        return false;
      } else {
        errorElement.classList.add("d-none");
        field.classList.remove("error");
        return true;
      }
    } else if (field.type === "radio") {
      const name = field.name;
      const isChecked = document.querySelector(`input[name="${name}"]:checked`);
      if (!isChecked) {
        errorElement.classList.remove("d-none");
        document
          .querySelectorAll(`input[name="${name}"]`)
          .forEach((radio) => radio.closest(".card").classList.add("error"));
        return false;
      } else {
        errorElement.classList.add("d-none");
        document
          .querySelectorAll(`input[name="${name}"]`)
          .forEach((radio) => radio.closest(".card").classList.remove("error"));
        return true;
      }
    } else if (field.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) {
        errorElement.classList.remove("d-none");
        field.classList.add("error");
        return false;
      } else {
        errorElement.classList.add("d-none");
        field.classList.remove("error");
        return true;
      }
    } else if (field.value.trim() === "") {
      errorElement.classList.remove("d-none");
      field.classList.add("error");
      return false;
    } else {
      errorElement.classList.add("d-none");
      field.classList.remove("error");
      return true;
    }
  }

  function validateQueryType() {
    const queryTypeErrorElement = document.getElementById("query-type-error");
    const isRadioChecked = document.querySelector(
      'input[name="queryType"]:checked'
    );

    if (!isRadioChecked) {
      queryTypeErrorElement.classList.remove("d-none");
      document
        .querySelectorAll('input[name="queryType"]')
        .forEach((radio) => radio.closest(".card").classList.add("error"));
      return false;
    } else {
      queryTypeErrorElement.classList.add("d-none");
      document
        .querySelectorAll('input[name="queryType"]')
        .forEach((radio) => radio.closest(".card").classList.remove("error"));
      return true;
    }
  }

  function validateForm() {
    let hasErrors = false;

    // Validate all required fields
    document.querySelectorAll(".required").forEach((field) => {
      if (!validateField(field)) {
        hasErrors = true;
      }
    });

    // Validate query type
    if (!validateQueryType()) {
      hasErrors = true;
    }

    return !hasErrors;
  }

  function attachValidationListeners() {
    // Add event listeners to fields
    document.querySelectorAll(".required").forEach((field) => {
      // For text inputs and textareas
      if (field.type !== "radio" && field.type !== "checkbox") {
        field.addEventListener("input", () => validateField(field));
      }
      // For checkboxes
      if (field.type === "checkbox") {
        field.addEventListener("change", () => {
          validateField(field);
          validateQueryType(); // Validate query type when checkbox state changes
        });
      }
      // For radio buttons
      if (field.type === "radio") {
        field.addEventListener("change", () => {
          // Validate the group of radio buttons
          validateField(field);
          validateQueryType(); // Validate query type when radio buttons state changes
        });
      }
    });
  }

  // Initial setup
  attachValidationListeners();

  // Form submit event
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
      toastElement.style.display = "block";
      toast.show(); // Show the toast notification
    }
  });
});
