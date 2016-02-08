/* jshint camelcase: false */
var app = require('../server/server');
var request = require('supertest');
var assert = require('assert');
var loopback = require('loopback');
var decoratedError = require('./lib/decoratedError');

function json(verb, url) {
    return request(app)[verb](url)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
  }

describe('Project Associate Authorization', function() {
  before(function(done) {
    require('./start-server');
    done();
  });

  //after(function(done) {
  //  app.removeAllListeners('started');
  //  app.removeAllListeners('loaded');
  //  done();
  //});

  it('should not allow access to project without access token', function(done){
    json('get', '/api/projects/1')
      .expect(401, function(err, res) {
        if (err) throw decoratedError(err, res);
        done();
      });
  });

  var accessToken;
  it('user who IS NOT in the projects company should not have read access', function(done) {
    json('post', '/api/users/login')
      .send({
        username: 'stranger-bill',
        password: 'opensesame'
      })
      .expect(200, function(err, res) {
        assert(typeof res.body === 'object');
        var accessToken = res.body.id;
        assert(accessToken, 'must have an access token');
        json('get', '/api/projects/'+1+'?access_token=' + accessToken)
          .expect(401)
          .end(function(err, res) {
            if (err) throw decoratedError(err, res);
            done();
          });
      });
  });

  it('user who IS in the projects company should have read access', function(done) {
    json('post', '/api/users/login')
      .send({
        username: 'admin-john',
        password: 'opensesame'
      })
      .expect(200, function(err, res) {
        assert(typeof res.body === 'object');
        var accessToken = res.body.id;
        assert(accessToken, 'must have an access token');
        json('get', '/api/projects/'+1+'?access_token=' + accessToken)
          .expect(200)
          .end(function(err, res) {
            if (err) throw decoratedError(err, res);
            done();
          });
      });
  });


});
