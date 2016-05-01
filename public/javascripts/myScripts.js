'use strict';

$(document).ready(function() {

    //add click handlers to filter buttons
    $('.stockFilter').click(function(event) {
        event.preventDefault();

        var stockSymbol = $('#stockName').text();

        if (stockSymbol !== '') {
            $.ajax('/' + this.id, {
                method:     'POST',
                dataType:   'json',
                data:       JSON.stringify({ stockName: stockSymbol }),
                success:    function(data) {
                    console.log(data.dataset.name);
                },
                error:      function(jqXHR, statusString, err) {
                    alert('Error: ' + err + '. Message: ' + statusString + '. Please try again.');
                }
            });
        } else {
            alert('Please enter a stock symbol first!');
        }

    });

});