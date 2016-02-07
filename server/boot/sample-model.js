module.exports = function(app) {
  var User = app.models.user;
  var Project = app.models.Project;
  var Siera = app.models.Siera;

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
      });
    };
