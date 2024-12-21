 // Ensure Flatpickr is applied when the document is ready
 document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#dateRange", {
    mode: "range",              // This allows a date range to be selected
    dateFormat: "Y-m-d",        // Date format for the selected range
    onChange: function(selectedDates) {
      // This is triggered when dates are selected
      console.log("Selected Dates: ", selectedDates);
    }
  });

  updateGuestSelection(); // Initialize guest selection when the page loads
});

// Function to handle guest selection updates
function updateGuestSelection() {
  const adults = parseInt(document.getElementById("adultsDropdown").value);
  const childrenDropdown = document.getElementById("childrenDropdown");
  const children = parseInt(childrenDropdown.value);

  // If 4 children are selected, disable the adults dropdown
  if (children === 4) {
    document.getElementById("adultsDropdown").setAttribute("disabled", true);
  } else {
    document.getElementById("adultsDropdown").removeAttribute("disabled");
  }

  // Disable children dropdown when 4 adults are selected
  if (adults === 4) {
    childrenDropdown.setAttribute("disabled", true);
    childrenDropdown.value = "0"; // Reset children to 0
  } else {
    childrenDropdown.removeAttribute("disabled");
  }

  // Adjust children dropdown options based on adult selection
  if (adults === 1) {
    updateChildrenDropdown(3); // Max 3 children
  } else if (adults === 2) {
    updateChildrenDropdown(2); // Max 2 children
  } else if (adults === 3) {
    updateChildrenDropdown(1); // Max 1 child
  } else if (adults === 4) {
    childrenDropdown.value = "0"; // Automatically reset to 0 if 4 adults
    updateChildrenDropdown(0); // Disable children
  }

  // Adjust adult dropdown options based on children selection
  if (children === 1) {
    updateAdultsDropdown(3); // Max 3 adults
  } else if (children === 2) {
    updateAdultsDropdown(2); // Max 2 adults
  } else if (children === 3) {
    updateAdultsDropdown(1); // Max 1 adult
  } else if (children === 4) {
    updateAdultsDropdown(0); // Disable adults if 4 children
  } else {
    // Allow 4 adults if 0 children is selected
    updateAdultsDropdown(4);
  }

}


// Function to update children dropdown based on adult selection
function updateChildrenDropdown(maxChildren) {
  const childrenDropdown = document.getElementById("childrenDropdown");
  const currentValue = parseInt(childrenDropdown.value);
  let optionsHTML = `<option value="0">0</option>`;
  for (let i = 1; i <= maxChildren; i++) {
    optionsHTML += `<option value="${i}">${i}</option>`;
  }
  childrenDropdown.innerHTML = optionsHTML;

  // Restore the selected value if it's still valid
  if (currentValue <= maxChildren) {
    childrenDropdown.value = currentValue;
  } else {
    childrenDropdown.value = maxChildren; // Set to max if current value is invalid
  }
}

// Function to update the adults dropdown based on children selection
function updateAdultsDropdown(maxAdults) {
  const adultsDropdown = document.getElementById("adultsDropdown");
  const currentValue = parseInt(adultsDropdown.value);
  let optionsHTML = ``;
  for (let i = 1; i <= maxAdults; i++) {
    optionsHTML += `<option value="${i}">${i}</option>`;
  }
  adultsDropdown.innerHTML = optionsHTML;

  // Restore the selected value if it's still valid
  if (currentValue <= maxAdults) {
    adultsDropdown.value = currentValue;
  } else {
    adultsDropdown.value = maxAdults; // Set to max if current value is invalid
  }
}