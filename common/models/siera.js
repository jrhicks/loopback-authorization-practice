var loopback = require('loopback');
var assert = require('assert');
var addWhereFilter = require('../../server/lib/addWhereFilter');

module.exports = function(Siera) {

  Siera.observe('access', function applyRoleFilters(ctx, next) {
    var role_mapping = Siera.app.models.RoleMapping;
    var userId = loopback.getCurrentContext().active.accessToken.userId;
    assert(userId);
    role_mapping.getRoleNames(userId, function(roles) {
      if (roles.indexOf('client') > -1) {
        ctx = addWhereFilter(ctx, {"status":"published"});
      }
      next();
    });
  });

};
