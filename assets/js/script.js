$(function() {
    // Function to display the current day at the top of the calendar
    function displayCurrentDay() {
        $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
    }

    // Function to update the color of the time blocks based on the current time
    function updateTimeBlocks() {
        var currentHour = dayjs().hour();
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

    // Function to load saved events from local storage
    function loadEvents() {
        $('.time-block').each(function() {
            var timeId = $(this).attr('id');
            var event = localStorage.getItem(timeId);
            if (event) {
                $(this).find('.description').val(event);
            }
        });
    }

    // Event handler to save new events to local storage
    $('.saveBtn').click(function() {
        var timeId = $(this).closest('.time-block').attr('id');
        var eventText = $(this).siblings('.description').val();
        localStorage.setItem(timeId, eventText);
    });

    // Call the displayCurrentDay function to set the current day on the calendar
    displayCurrentDay();

    // Call the updateTimeBlocks function to set the initial color coding
    updateTimeBlocks();

    // Call the loadEvents function to load any saved events from local storage
    loadEvents();

    // Set an interval to update the time block colors every minute
    setInterval(updateTimeBlocks, 60000);
});
