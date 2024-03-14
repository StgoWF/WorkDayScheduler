
$(function() {
    // Display the current day at the top of the calendar
    $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

    // Function to update time block colors based on the current time
    function updateTimeBlocks() {
        var currentHour = dayjs().hour();
        console.log("Current Hour:", currentHour); 
        $('.time-block').each(function() {
            var blockHour = parseInt($(this).attr('id').split('-')[1], 10); // Ensure base 10
            console.log("Block Hour:", blockHour); // Log each block's hour
            if (blockHour < currentHour) {
                $(this).removeClass('present future').addClass('past');
            } else if (blockHour === currentHour) {
                $(this).removeClass('past future').addClass('present');
            } else {
                $(this).removeClass('past present').addClass('future');
            }
        });

                        
    }

    // Call updateTimeBlocks to set the initial colors
    updateTimeBlocks();

    // Optionally, set an interval to update colors periodically, such as every minute
    setInterval(updateTimeBlocks, 60000);

    // Add event listeners and other functions here
});
