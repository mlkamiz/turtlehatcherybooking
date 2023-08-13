document.addEventListener("DOMContentLoaded", function() {
  function validateForm() {
      // Get references to form input elements using their placeholder values
      const cardName = document.querySelector('input[placeholder="Please Enter the Name on Your card"]');
      const cardNumber = document.querySelector('input[placeholder="1111-2222-3333-4444"]');
      const expMonth = document.querySelector('input[placeholder="january"]');
      const expYear = document.querySelector('input[placeholder="2022"]');
      const cvv = document.querySelector('input[placeholder="123"]');
    
      // Validate Card Name
      if (cardName.value.trim() === '') {
        alert('Please enter the name mentioned on your card.');
        cardName.focus();
        return false; // Prevent form submission
      }
    
      // Validate Card Number
      if (cardNumber.value.trim() === '') {
        alert('Please enter your card numebr.');
        cardNumber.focus();
        return false; // Prevent form submission
      }
    
      // Validate Expiry Month
      if (expMonth.value.trim() === '') {
        alert('Please enter the expiry month of your card.');
        expMonth.focus();
        return false; // Prevent form submission
      }
    
      // ValidateExpiry Year
      if (expYear.value.trim() === '') {
        alert('Please enter the expiry year of your card.');
        expYear.focus();
        return false; // Prevent form submission
      }
    
      // Validate CVV
      if (cvv.value.trim() === '') {
        alert('Please enter the security code of your card.');
        cvv.focus();
        return false; // Prevent form submission
      }
      
      // Form submission will proceed if all validations pass
    return true;
}
     // Add event listener to the button for form submission
  const payButton = document.querySelector('.payment');
  payButton.addEventListener('click', function (event) {
    // Prevent the default behavior of the anchor tag
    event.preventDefault();
  
    // Call the form validation function before redirecting to the next page
    if (validateForm()) {
      // If the form is valid, redirect to the "payment.html" page

      window.location.href = "confirmation.html";
    }
})

});

function getTimeSlotText(timeSlot) {
  const timeSlotsText = [
    "07.00 am - 08.00 am", "08.00 am - 09.00 am", "09.00 am - 10.00 am",
    "10.00 am - 11.00 am (Peak)", "11.00 am - 12.00 pm (Peak)", "12.00 pm - 01.00 pm (Peak)",
    "01.00 pm - 02.00 pm", "02.00 pm - 03.00 pm", "03.00 pm - 04.00 pm (Peak)",
    "04.00 pm - 05.00 pm (Peak)", "05.00 pm - 06.00 pm (Peak)"
  ];
  
  return timeSlotsText[timeSlot - 7];
  }

//JAVASCRIPT FOR SUMMARY TABLE
window.addEventListener("load", init)

function init() {
  const summaryTable = document.getElementById("summaryTable");
  // Initial table content
  const initialTableContent = `
   <tr>
      <th>Name</th>
      <th id="nameCell"><span id="fullNamePlaceholder">Enter Your name</span></th>
    </tr>
    <tr>
      <td>Date</td>
      <td id="summaryDateCell">current date</td>
    </tr>
    <tr>
      <td>Time</td>
      <td id="timeCell">07.00 am to 08.00 am</td>
    </tr>
    <tr>
      <td>Duration</td>
      <td id="durationCell">1 hrs ( 01 Normal : 00 Peak)</td>
    </tr>
    <tr>
      <td>Mobile Number</td>
      <td id="mobileCell"><span id="phoneNumberPlaceholder">(+XX) XXXXXXXX</span></td>
    </tr>
    <tr>
      <td>Email</td>
      <td id="emailCell"><span id="emailPlaceholder">@gmail.com</span></td>
    </tr>
    <tr>
      <td class="tabhd">Tickets</td>
      <td class="tabhd">Charges</td>
    </tr>
    <tr>
      <td>1 Foreigner Adult</td>
      <td id="ticketChargesCell">$10</td>
    </tr>
   <tr>
      <td>1 Foreigner Child</td>
      <td id="ticketChargesCell">$10</td>
   </tr>
   <tr>
      <td>1 Sri Lankan Adult</td>
      <td id="ticketChargesCell">$10</td>
   </tr>
   <tr>
      <td>1 Sri Lankan Child</td>
      <td id="ticketChargesCell">$10</td>
   </tr>
   <tr>
      <td>Infant</td>
      <td id="ticketChargesCell">$10</td>
   </tr>
   <tr>
      <td class="tabhd">Total Payable</td>
      <td class="tabhd" id="totalPayableCell">$10</td>
   </tr>
  `;



// Set initial table content
summaryTable.innerHTML = initialTableContent;

// Set the date from localStorage
const summaryDateCell = document.getElementById("summaryDateCell");
const selectedDate = localStorage.getItem("SelectedDate");
if (selectedDate) {
   summaryDateCell.textContent = selectedDate;
}

// Get the stored selected time slots
const storedSelectedTimeSlots = JSON.parse(localStorage.getItem("selectedTimeSlots"));

// If stored selected time slots exist, update the timeCell
if (storedSelectedTimeSlots && storedSelectedTimeSlots.length > 0) {
  const firstTimeSlot = getTimeSlotText(storedSelectedTimeSlots[0]);
  const lastTimeSlot = getTimeSlotText(storedSelectedTimeSlots[storedSelectedTimeSlots.length - 1]);

  if (storedSelectedTimeSlots.length === 1) {
    document.getElementById("timeCell").textContent = `Selected Time Slot: ${firstTimeSlot}`;
  } else {
    document.getElementById("timeCell").textContent = `Selected Time Slots: ${firstTimeSlot} - ${lastTimeSlot}`;
  }    
}

  // Retrieve full name from localStorage
  const fullName = localStorage.getItem("fullName");

  // Replace the placeholder text with the full name if available
  if (fullName) {
    const fullNamePlaceholder = document.getElementById("fullNamePlaceholder");
    fullNamePlaceholder.textContent = fullName;
  }

// Retrieve user's phone number from localStorage
const userPhoneNumber = localStorage.getItem("userPhoneNumber");

// Replace the placeholder text with the phone number if available
if (userPhoneNumber) {
  const phoneNumberPlaceholder = document.getElementById("phoneNumberPlaceholder");
  phoneNumberPlaceholder.textContent = userPhoneNumber;
}

// Retrieve user's email from localStorage
  const userEmail = localStorage.getItem("userEmail");

// Replace the placeholder text with the email if available
if (userEmail) {
  const emailPlaceholder = document.getElementById("emailPlaceholder");
  emailPlaceholder.textContent = userEmail;
}

// Load and display total price from local storage
const storedTotalPrice = localStorage.getItem("totalPrice");
if (storedTotalPrice) {
  document.getElementById("totalPayableCell").innerText = `$${storedTotalPrice}`;
}

// Get the stored peak and normal hour counts
const storedPeakHourCount = parseInt(localStorage.getItem("peakHourCount"));
const storedNormalHourCount = parseInt(localStorage.getItem("normalHourCount"));
const storedTotalDuration = parseInt(localStorage.getItem("totalDurationCount"));

if (!isNaN(storedPeakHourCount) && !isNaN(storedNormalHourCount) && !isNaN(storedTotalDuration)) {
  const durationCell = document.getElementById("durationCell");
  durationCell.textContent = `${storedTotalDuration} hrs ( ${storedNormalHourCount} Normal : ${storedPeakHourCount} Peak)`;
}
}