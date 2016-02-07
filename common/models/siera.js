var loopback = require('loopback');

module.exports = function(Siera) {

  Siera.observe('access', function limitToPublished(ctx, next) {

    var loopbackCtx = loopback.getCurrentContext();
    var userId = loopbackCtx.active.accessToken.userId;

    if (ctx.query.where === undefined) {
      ctx.query = {"where": {"status":"published"}}
    } else {
      ctx.query.where.status = "published"
    }

    next();
  });


};
