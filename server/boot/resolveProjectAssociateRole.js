var assert = require('assert');
module.exports = function(app) {
  var Role = app.models.Role;
  Role.registerResolver('projectAssociate', function(role, context, cb) {
    if (context.accessToken.userId === undefined) {
      cb(null, false);
      return;
    }
    if( context.modelName == 'project') {
      var projectId = context.modelId;
      var userId = context.accessToken.userId;
      assert(projectId);
      assert(userId);

      app.models.project.findOne({where: {id:projectId}}, function(err, project) {
        assert(project);
        app.models.company_user.findOne({where: {companyId: project.companyId, userId: userId }}, function(err, res) {
          if (res) {
            cb(null, true);
            return;
          } else {
            cb(null, false);
            return;
          }
        });
      });
    }
  })
};
