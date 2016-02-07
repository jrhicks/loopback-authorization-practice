var loopback = require('loopback');

module.exports = function(Siera) {

  Siera.observe('access', function limitToPublished(ctx, next) {
    var loopbackCtx = loopback.getCurrentContext();
    if (loopbackCtx.active.accessToken) {
      var userId = loopbackCtx.active.accessToken.userId;
    } else {
      throw new Error("Access token should be required for Sieras")
    }

    if (ctx.query.where === undefined) {
      ctx.query = {"where": {"status":"published"}}
    } else {
      ctx.query.where = {
                          "and": [
                            {status: "published"},
                            ctx.query]
                        }
    }
    next();
  });


};
