var loopback = require('loopback');
var applyRoleFilters = require('../../lib/apply-role-filters');

module.exports = function(Siera) {

  Siera.observe('access', applyRoleFilters(Siera,
    [
      {
        role: 'client',
        where: {status: 'published'}
      }
    ]
  ));

};
