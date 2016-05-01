'use strict';

var moment = require('moment');
var Quandl = require('quandl');
var options = {
    auth_token: process.env.AUTHTOKEN,
    api_version: 3
};

function getStockDetails(stockSymbol, range, callback) {
    var quandl = new Quandl();
    quandl.configure(options);

    var formattedData = formatRange(range);

    quandl.dataset({
        source: 'WIKI',
        table: stockSymbol
    }, {
        order: 'asc',
        exclude_column_names: true,
        start_date: formattedData.startDate,
        end_date: moment().format('YYYY-MM-DD'),
        collapse: formattedData.collapse,
        column_index: 4
    }, function(err, results) {
        if (err) {
            return callback(err);
        }

        var response = JSON.parse(results);
        var data = formatData(response.dataset.data);
        callback(null, data);
    });
}

//----------------------------
// private functions below
//----------------------------
function formatRange(range) {
    var startDate;
    var collapse;

    switch (range) {
        case 'oneMonth':
            startDate = moment().subtract(1, 'months').format('YYYY-MM-DD');
            collapse = 'daily';
            break;
        case 'threeMonth':
            startDate = moment().subtract(3, 'months').format('YYYY-MM-DD');
            collapse = 'daily';
            break;
        case 'sixMonth':
            startDate = moment().subtract(6, 'months').format('YYYY-MM-DD');
            collapse = 'weekly';
            break;
        case 'yearToDate':
            startDate = moment().startOf('year').format('YYYY-MM-DD');
            collapse = 'weekly';
            break;
        case 'oneYear':
            startDate = moment().subtract(1, 'years').format('YYYY-MM-DD');
            collapse = 'weekly';
            break;
        default:
            startDate = moment().subtract(20, 'years').format('YYYY-MM-DD');
            collapse = 'monthly';
    }

    return { startDate: startDate, collapse: collapse };
}

function formatData(dataset) {
    var dataArr = dataset.map(function(item) {
        return { x: item[0], y: item[1] };
    });

    return dataArr;

}

///////////////////////////////////////////////

var self = {
    getStockDetails: getStockDetails
};

module.exports = self;
