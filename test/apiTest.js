process.env.NODE_ENV = 'test';

var app = require('../app/app.js');
var request = require('supertest')(app);

describe('Test of API routes', function() {

    it('should display homepage on call to /', function(done) {
        request
                .get('/')
                .expect('Content-Type', /text\/html/)
                .expect(200, done);
    });

    it('should display 404 for an invalid url request', function(done) {
        request
                .get('/foo/bar')
                .expect(404, done);
    });

    it('should return stock data when sent a stock symbol', function(done) {
        request
                .post('/')
                .send({ stockSymbol: 'ko' })
                .expect(200)
                .expect('Content-Type', /text/)
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
    });

});

