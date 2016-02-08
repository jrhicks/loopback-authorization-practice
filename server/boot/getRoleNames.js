module.exports = function(app) {
    var RoleMapping = app.models.RoleMapping;

    RoleMapping.getRoleNames = function(userId, cb) {
      RoleMapping.find({
                        where: {
                                  principalType: RoleMapping.USER,
                                  principalId: userId
                              },
                        include: {
                          relation: 'role',
                        }
                      },function(err, res) {
                       var roles = res.map( function(x) {return x.role().name});
                       cb(roles);
                      })
    }
}
