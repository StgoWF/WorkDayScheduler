$(function() {
    // Displays the current day at the top of the calendar
    function displayCurrentDay() {
        $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
    }

    // Updates the time block colors based on the current time
    function updateTimeBlocks() {
        var currentHour = dayjs().hour(); // Gets the current hour in 24-hour format
        $('.time-block').each(function() {
            var blockHour = parseInt($(this).attr('id').split('-')[1], 10);
            if (blockHour < currentHour) {
                $(this).removeClass('present future').addClass('past');
            } else if (blockHour === currentHour) {
                $(this).removeClass('past future').addClass('present');
            } else {
                $(this).removeClass('past present').addClass('future');
            }
        });
    }

    // Loads saved events from local storage
    function loadEvents() {
        $('.time-block').each(function() {
            var timeId = $(this).attr('id');
            var event = localStorage.getItem(timeId);
            if (event) {
                $(this).find('.description').val(event);
            }
        });
    }

    // Event handler to save events to local storage
    $('.saveBtn').click(function() {
        var timeId = $(this).closest('.time-block').attr('id');
        var eventText = $(this).siblings('.description').val();
        localStorage.setItem(timeId, eventText);
    });

    // Call the functions to display the current day and load events
    displayCurrentDay();
    loadEvents();

    // Update the time block colors when the page loads
    updateTimeBlocks();

    // Refresh the time blocks' color every minute
    setInterval(updateTimeBlocks, 60000);
});
