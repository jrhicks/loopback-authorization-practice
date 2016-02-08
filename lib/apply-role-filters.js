var loopback = require('loopback');

var getRoles = function(app, cb) {
  var roles = [];
  var RoleMapping = app.models.RoleMapping;
  var accessToken = loopback.getCurrentContext().active.accessToken;
  if (accessToken) {
    roles = roles + ['authenticated'];
  } else {
    roles = roles + ['anonymous'];
  }
  var userId = loopback.getCurrentContext().active.accessToken.userId;
  RoleMapping.find({
                    where: {
                              principalType: RoleMapping.USER,
                              principalId: userId
                          },
                    include: {
                      relation: 'role',
                    }
                  },function(err, res) {
                   roles = roles + res.map( function(x) {return x.role().name});
                   cb(roles);
                  })
};

var addWhereFilter = function(ctx, clause) {
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
};

var applyRoleFilters = function(model, roleFilters) {
  return function(ctx, next) {
    getRoles(model.app, function(roles) {
      for (var role in roleFilters) {
        if(!roleFilters.hasOwnProperty(role)) continue;
        if( roles.indexOf(role) > -1 ) {
          var filter = roleFilters[role];
          ctx = addWhereFilter(ctx, filter);
        }
      }
      next();
    });
  };
};

module.exports = applyRoleFilters;