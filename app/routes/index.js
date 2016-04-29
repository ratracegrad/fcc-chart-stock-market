var express = require('express');
var router = express.Router();
var routeHandler = require('../lib/routeHandler');

/**
 * @api {get} /  Display the home page
 * @apiName  Display the homepage
 * @apiGroup Routes
 *
 * @apiSuccess {html}  response homepage
 *
 */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

/**
 * @api {get} /api/addstock Add new stock to be display
 * @apiName Add new stock
 * @apiGroup Routes
 *
 * @apiSuccess {Object} response object Add new stock
 * @apiSampleRequest /api/addstock
 * {
 *    show what is returned here
 * }
 *
 * apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       show json data that is returned
 *     }
 */
router.get('/api/addstock', function(req, res) {

});


router.get('/api-docs', function(req, res) {
    res.render('/public/api-docs/index');
});

// quandl api key is c_mESQnKLK9DxpsVU7pz
module.exports = router;
