const calculateAvailableTimeSlots = (workingHours, selectedDate) => {
  // Convert workingHours to an array of opening and closing times
  const {start_time, close_time} = workingHours;
  
  // Assuming time slots are in hours (e.g., 1 hour each)
  const timeSlotDuration = 1; // in hours
  
  // Convert selectedDate to a JavaScript Date object
  const selectedDateTime = new Date(selectedDate);
  
  // Set the opening time for the selected date
  selectedDateTime.setHours(start_time, 0, 0, 0);
  
  const availableTimeSlots = [];
  
  // Loop through time slots until the closing time is reached
  while (selectedDateTime.getHours() + timeSlotDuration <= close_time) {
    // Calculate the end time of the time slot
    const endTime = new Date(selectedDateTime);
    endTime.setHours(selectedDateTime.getHours() + timeSlotDuration);
    
    // Format the time slot
    const formattedStartTime = selectedDateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    const formattedEndTime = endTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    
    // Add the time slot to the availableTimeSlots array
    availableTimeSlots.push(`${formattedStartTime} - ${formattedEndTime}`);
    
    // Move to the next time slot
    selectedDateTime.setHours(selectedDateTime.getHours() + timeSlotDuration);
  }
  
  return availableTimeSlots;
};

module.exports = calculateAvailableTimeSlots;
