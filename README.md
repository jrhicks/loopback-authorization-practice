# Authtest

Practicing authorization stuff in loopback.

User <-> CompanyUser <-> Company <-> Project <-> Sieras

 [ ] Setup Models & Relationships & populate with data

 [ ] Enable /project/:id/sieras

 [ ] registerRole $WithProjectsCompany

 [ ] Use a posthook to filter Sieras to status='published'

 [ ] Only limit sieras to sttus='published' based on user's role

 [ ] Create an admin role that can see everything


Role Resolver
==============

* https://github.com/strongloop/loopback-example-access-control/blob/master/server/boot/role-resolver.js

Pre/Post Hooks
==============

* https://groups.google.com/forum/#!topic/loopbackjs/71Zz3aWHuu4

Admin Role
==========

* https://raw.githubusercontent.com/strongloop/loopback-example-access-control/master/server/boot/sample-models.js

MultiTenant
===========

  MyModel.observe('access', function limitToTenant(ctx, next) {
    ctx.query.where.tenantId = loopback.getCurrentContext().tenantId;
    next();
  });

* https://docs.strongloop.com/display/public/LB/Operation+hooks#Operationhooks-access

* https://github.com/paulomcnally/loopback-example-multitenant
