//JAVASRIPT FOR CALENDAR
document.addEventListener("DOMContentLoaded", function() {
  const dateInput = document.getElementById("dateInput");
  const prevMonth = document.getElementById("prevMonth");
  const nextMonth = document.getElementById("nextMonth");
  const currentMonthLabel = document.getElementById("currentMonth");
  const calendarDates = document.getElementById("calendarDates");
  const selectedDateDisplay = document.getElementById("selectedDateDisplay");

  let selectedDate;

    //Get Current Date
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    function updateSelectedDateDisplay() {
      if (selectedDate) {
        selectedDateDisplay.textContent = `${selectedDate.toLocaleDateString("en-us")}`;
        localStorage.setItem("SelectedDate", selectedDateDisplay.textContent); // Store selected date in local storage
        updateSummaryTable(); // Update the summary table with the selected date
      } else {
        selectedDateDisplay.textContent = "";
      }
  }

    
    //Update Calendar Dates
    function updateCalendar(){
        currentMonthLabel.textContent = new Date(currentYear, currentMonth).toLocaleString("en-us", {month: "long", year: "numeric"});
        
        //Clear Previous Dates
        calendarDates.innerHTML="";

        //Get the First Day of the Current Month
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        
        //Get the Total Number of Days in the Current Month
        const totalDaysInmonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        //Fill in the Days for the Previous Month if Needed
        for (let i = firstDayOfMonth; i>0; i--) {
            const day = document.createElement("div");
            day.className = "date disabled";
            day.textContent = new Date(currentYear, currentMonth, -i+1).getDate();
            calendarDates.appendChild(day);
        }

        //Fill in the Days for the Current Month 
        for (let i = 1; i<=totalDaysInmonth; i++) {
            const day = document.createElement("div");
            day.className = "date";
            day.textContent = i;
            calendarDates.appendChild(day);
        }

        //Fill in the Days for the Next Month if Needed
        const remainingDays = 42 - totalDaysInmonth - firstDayOfMonth; 
        for (let i = 1; i<=remainingDays; i++) {
            const day = document.createElement("div");
            day.className = "date disabled";
            day.textContent = new Date(currentYear, currentMonth + 1, i).getDate();
            calendarDates.appendChild(day);
        }

        //Highlight the Selected date if Available
        if (selectedDate) {
            const selectedDay = Array.from(calendarDates.children).find((date) => date.textContent === selectedDate.getDate().toString());
            if (selectedDay){
                selectedDay.classList.add("selected");
            }
        }
    }
    function updateSummaryTable() {
      const summaryDateCell = document.getElementById("summaryDateCell");
      if (summaryDateCell) {
          summaryDateCell.textContent = localStorage.getItem("SelectedDate");
      }
  }

    // Haandle Date selection
  function handleDateSelection() {
    const dates = Array.from(calendarDates.children).filter((date) => !date.classList.contains("disabled"));
    dates.forEach((date) => {
      date.addEventListener("click", function () {
        const clickedDate = new Date(currentYear, currentMonth, parseInt(date.textContent));
        if (selectedDate && clickedDate.getTime() === selectedDate.getTime()) {
          // If the Clicked Date is the Same as the Currently Selected Date, Remove the Selection
          selectedDate = null;
          dateInput.value = "";
          date.classList.remove("selected");
        } else {
          // If the Clicked Date is Different, Update 'selectedDate' and 'dateInput' Values
          if (selectedDate) {
            const selectedDay = Array.from(calendarDates.children).find((date) => date.textContent === selectedDate.getDate().toString());
            if (selectedDay) {
              selectedDay.classList.remove("selected");
            }
          }
          selectedDate = clickedDate;
          date.classList.add("selected");
          dateInput.value = selectedDate.toLocaleDateString("en-us"); // Fix: Update input value with formatted date
        }
        updateSelectedDateDisplay(); // Update selected date display
      });
    });
  }

    //Previous Month Click Event
    prevMonth.addEventListener("click", function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
        handleDateSelection();       
    });

     //Next Month Click Event
  nextMonth.addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 11) { // Fix: Check for 11 to move to the next year
      currentMonth = 0;
      currentYear++;
    }
    updateCalendar();
    handleDateSelection();
  });

  updateCalendar();
  handleDateSelection();
});


//JAVASCRIPT FOR TICKET RESERVATION
function calculatePrice() {
  const selectedTimeSlots = Array.from(document.getElementById("timeSlots").selectedOptions, option => parseInt(option.value));
  const slAdultTickets = parseInt(document.getElementById("slAdult").value);
  const slChildTickets = parseInt(document.getElementById("slChild").value);
  const foreignerAdultTickets = parseInt(document.getElementById("foreignerAdult").value);
  const foreignerChildTickets = parseInt(document.getElementById("foreignerChild").value);
  const infantTickets = parseInt(document.getElementById("infant").value);

  // Create an object to store the ticket values
const ticketValues = {
  slAdult: slAdultTickets,
  slChild: slChildTickets,
  foreignerAdult: foreignerAdultTickets,
  foreignerChild: foreignerChildTickets,
  infant: infantTickets
};

// Convert the object to a JSON string
const ticketValuesJSON = JSON.stringify(ticketValues);

// Store the JSON string in local storage
localStorage.setItem('ticketValues', ticketValuesJSON);

  const peakHours = [10, 11, 12, 15, 16, 17, 18];

  let totalPrice = 0;
  let peakHourCount = 0;
  let normalHourCount = 0;

  selectedTimeSlots.forEach(timeSlot => {
    if (peakHours.includes(timeSlot)) {
      peakHourCount++;
    } else {
      normalHourCount++;
    }
  });

  const totalDuration = peakHourCount + normalHourCount;

  // Calculate price for each category and time slot
  selectedTimeSlots.forEach(timeSlot => {
    let price = 0;

    if (peakHours.includes(timeSlot)) {
      price += (slAdultTickets * 6) + (slChildTickets * 3) + (foreignerAdultTickets * 13) + (foreignerChildTickets * 8 + infantTickets * 0);
    } else {
      price += (slAdultTickets * 4) + (slChildTickets * 2) + (foreignerAdultTickets * 10) + (foreignerChildTickets * 5 + infantTickets * 0);
    }

    totalPrice += price;
    
    // Build selected slots text
    selectedSlotText = `${getTimeSlotText(selectedTimeSlots[0])} - ${getTimeSlotText(selectedTimeSlots[selectedTimeSlots.length - 1])}`;
    document.getElementById("selectedSlots").value = selectedSlotText;
  });

  
  document.getElementById("totalPayableCell").innerText = `$${totalPrice}`; // Update the totalPayableCell
  document.getElementById("timeCell").textContent = `${selectedTimeSlots.map(getTimeSlotText).join(" - ")}`;

  // Store total price in local storage
  localStorage.setItem("totalPrice", totalPrice);
  localStorage.setItem("selectedTimeSlots", JSON.stringify(selectedTimeSlots));
  localStorage.setItem("peakHourCount", peakHourCount);
  localStorage.setItem("normalHourCount", normalHourCount);
  localStorage.setItem("totalDurationCount", totalDuration);

    // Load and display total price from local storage
    const storedTotalPrice = localStorage.getItem("totalPrice");
    if (storedTotalPrice) {
      document.getElementById("totalPayableCell").innerText = `$${storedTotalPrice}`;
    }
  
   // Get the stored selected time slots
  const storedSelectedTimeSlots = JSON.parse(localStorage.getItem("selectedTimeSlots"));
  
  // If stored selected time slots exist, update the timeCell
  if (storedSelectedTimeSlots && storedSelectedTimeSlots.length > 0) {
    const firstTimeSlot = getTimeSlotText(storedSelectedTimeSlots[0]);
    const lastTimeSlot = getTimeSlotText(storedSelectedTimeSlots[storedSelectedTimeSlots.length - 1]);
  
    if (storedSelectedTimeSlots.length === 1) {
      document.getElementById("timeCell").textContent = `${firstTimeSlot}`;
    } else {
      document.getElementById("timeCell").textContent = `${firstTimeSlot} - ${lastTimeSlot}`;
    }
  }
  
  // Get the stored peak and normal hour counts
  const storedPeakHourCount = parseInt(localStorage.getItem("peakHourCount"));
  const storedNormalHourCount = parseInt(localStorage.getItem("normalHourCount"));
  const storedTotalDuration = parseInt(localStorage.getItem("totalDurationCount"))
  
  if (!isNaN(storedPeakHourCount) && !isNaN(storedNormalHourCount) && !isNaN(storedTotalDuration)) {
    const durationCell = document.getElementById("durationCell");
    durationCell.textContent = `${storedTotalDuration} hrs ( ${storedNormalHourCount} Normal : ${storedPeakHourCount} Peak)`;
  }
  //!isNaN = is not a number, used to check whether a certain vlaue stored in the local storage is a number or not
}

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
      <th>Date</th>
      <th id="summaryDateCell"><current_date></th>
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
      <td class="tabhd">Tickets</td>
      <td class="tabhd">Charges</td>
    </tr>
    <tr>
      <td>1 Foreigner Adult</td>
      <td id="ticketChargesCell">$10</td>
    </tr>
    <tr>
      <td class="tabhd">Total Payable</td>
      <td class="tabhd" id="totalPayableCell">$10</td>
    </tr>
  `;

  // Set initial table content
  summaryTable.innerHTML = initialTableContent;
}







