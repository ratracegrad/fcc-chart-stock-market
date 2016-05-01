var express = require('express');
var router = express.Router();
var routeHandler = require('../lib/routeHandler');

router.get('/', function(req, res) {
    res.render('index', { title: '', results: '' });
});

router.post('/:range?', function(req, res) {
    var range = req.params.range || 'all';

    routeHandler.getStockDetails(req.body.stockSymbol, range, function(err, results) {
        if (err) {
            return res.json(err);
        }

        res.render('index', { title: req.body.stockSymbol, results: results });

    });
});


// ---------------------------------
// error handlers
// ---------------------------------

// catch 404 and forward to error handler
router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

router.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = router;
