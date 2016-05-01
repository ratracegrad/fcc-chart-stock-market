'use strict';


function addstock() {
    var seriesOptions = [];
    var seriesCounter = 0;
    var names = [];

    var stockSymbol = $('#stockSymbol').val();
    var currentStocks = $('.stockList').val();
    if ( currentStocks !== '') {
        names = currentStocks.split(',');
        $('.stockList').val(currentStocks + ',' + stockSymbol);
    } else {
        $('.stockList').val(stockSymbol);
    }

    names.push(stockSymbol);
    $('#stockSymbol').val(''); //blank out stock entry

    function createChart() {
        $('.stockChart').highcharts('StockChart', {

            rangeSelector: {
                selected: 4
            },

            yAxis: {
                labels: {
                    formatter: function () {
                        return (this.value > 0 ? ' + ' : '') + this.value + '%';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },

            plotOptions: {
                series: {
                    compare: 'percent'
                }
            },

            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                valueDecimals: 2
            },

            series: seriesOptions
        });
    }

    $.each(names, function (i, name) {

        $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?',    function (data) {

            seriesOptions[i] = {
                name: name,
                data: data
            };

            seriesCounter += 1;

            if (seriesCounter === names.length) {
                createChart();
            }
        });
    });

    displayStockList(names);
}



function displayStockList(stockList) {
    $('#displayedStocks').empty();

    $.each(stockList, function(i, stockSymbol) {
        var html = '<div class="col-md-4 col-xs-6 oneStock"><h2>' + stockSymbol + '<button class="btn btn-default pull-right" onclick="deleteStock( ' + "'" + stockSymbol + "'" + ')">X</button></h2></div>';
        $('#displayedStocks').append(html);
    });

}

function deleteStock(whichStock) {
    var seriesOptions = [];
    var seriesCounter = 0;
    var names = [];

    var stockList = $('.stockList').val();
    names = stockList.split(',');
    var index = names.indexOf(whichStock);
    names.splice(index, 1);
    $('.stockList').val(names.join(','));
    displayStockList(names);

    function createChart() {
        $('.stockChart').highcharts('StockChart', {

            rangeSelector: {
                selected: 4
            },

            yAxis: {
                labels: {
                    formatter: function () {
                        return (this.value > 0 ? ' + ' : '') + this.value + '%';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },

            plotOptions: {
                series: {
                    compare: 'percent'
                }
            },

            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                valueDecimals: 2
            },

            series: seriesOptions
        });
    }

    $.each(names, function (i, name) {

        $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?',    function (data) {

            seriesOptions[i] = {
                name: name,
                data: data
            };

            seriesCounter += 1;

            if (seriesCounter === names.length) {
                createChart();
            }
        });
    });
}