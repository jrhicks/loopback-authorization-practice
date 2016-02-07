module.exports = function(Siera) {

  Siera.observe('access', function limitToPublished(ctx, next) {
    if (ctx.query.where === undefined) {
      ctx.query = {"where": {"status":"published"}}
    } else {
      ctx.query.where.status = "published"
    }
    next();
  });


};
