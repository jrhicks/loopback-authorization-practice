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

describe('SIERA Authorization', function() {
  before(function(done) {
    require('./start-server');
    done();
  });

  //after(function(done) {
  //  app.removeAllListeners('started');
  //  app.removeAllListeners('loaded');
  //  done();
  //});

  it('sieras should not be accessible outside of a project', function(done){
    json('get', '/api/sieras')
      .expect(404, function(err, res) {
        if (err) throw decoratedError(err, res);
        done();
      });
  });

  it('should not allow access to sieras without access token', function(done){
    json('get', '/api/projects/1/sieras')
      .expect(401, function(err, res) {
        if (err) throw decoratedError(err, res);
        done();
      });
  });


  var accessToken;
  it('client should login and ONLY get published sieras', function(done) {
    json('post', '/api/users/login')
      .send({
        username: 'client-jane',
        password: 'opensesame'
      })
      .expect(200, function(err, res) {
        assert(typeof res.body === 'object');
        var accessToken = res.body.id;
        assert(accessToken, 'must have an access token');
        json('get', '/api/projects/1/sieras?access_token=' + accessToken)
          .expect(200)
          .end(function(err, res) {
            if (err) throw decoratedError(err, res);
            assert(res.body.length > 0, "Some SIERAS should have been returned");
            for (var i = 0; i < res.body.length; i++) {
                assert.equal(res.body[i].status, "published")
            }
            done();
          });
      });
  });

  it('admin should login and get BOTH published and unpublished sieras', function(done) {
    json('post', '/api/users/login')
      .send({
        username: 'admin-john',
        password: 'opensesame'
      })
      .expect(200, function(err, res) {
        assert(typeof res.body === 'object');
        var accessToken = res.body.id;
        assert(accessToken, 'must have an access token');
        json('get', '/api/projects/1/sieras?access_token=' + accessToken)
          .expect(200)
          .end(function(err, res) {
            if (err) throw decoratedError(err, res);
            var hasUnpublished = false;
            assert(res.body.length > 0, "Some SIERAS should have been returned");
            for (var i = 0; i < res.body.length; i++) {
                if (res.body[i].status !== "published") {
                  hasUnpublished = true;
                }
            }
            assert(hasUnpublished, "Unpublished values should be returned for Admins");
            done();
          });
      });
  });


});
