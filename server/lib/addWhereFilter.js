module.exports = function(ctx, clause) {
  var q = ctx.query;
  if (q.where === undefined) {
    q.where = clause;
  } else {
    q.where = {
                "and": [clause,q]
               }
  }
  ctx.query = q;
  return ctx;
}
