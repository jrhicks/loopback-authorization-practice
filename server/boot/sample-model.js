module.exports = function(app) {
  var User = app.models.user;
  var Project = app.models.Project;
  var Siera = app.models.Siera;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  User.create([
    {name: 'John', email: 'john@doe.com', password: 'opensesame'},
    {name: 'Jane', email: 'jane@doe.com', password: 'opensesame'},
    {name: 'Bob', email: 'bob@projects.com', password: 'opensesame'}
  ], function(err, users) {
    if (err) throw err;
    users[0].companies.create({"name":"IBM"}, function(err, company) {
      if (err) throw err;
      company.projects.create({
        name: 'Project 1',
        }, function(err, project) {
          if (err) throw err;
          project.sieras.create([
            {projectId: project.id, name:"Siera 1", status: "private"},
            {projectId: project.id, name:"Siera 2", status: "published"}
            ], function(err, sieras) {
              if (err) throw err;
        });
      });
    });

    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) throw err;
      console.log('Created role:', role);
      //make John an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[0].id
      }, function(err, principal) {
        if (err) throw err;
        console.log('Created principal:', principal);
      });
    });

    Role.create({
      name: 'client'
    }, function(err, role) {
      if (err) throw err;
      console.log('Created role:', role);
      //make Jane an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[1].id
      }, function(err, principal) {
        if (err) throw err;
        console.log('Created principal:', principal);
      });
    });


  });
};
