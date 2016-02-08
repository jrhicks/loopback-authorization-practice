# Loopback Authorization Practice

Practicing authorization stuff in loopback.

User <-> CompanyUser <-> Company <-> Project <-> Sieras

 [X] Setup models, relationships, populate with data

 [X] Resrict SIERAs to authenticated users

 [X] Use an operationhook to filter Sieras to status='published'

 [X] Add tests to demonstrate that Sieras are being limited to published

 [X] Setup console to easily experiment

 [X] Refine operationhook to only filter Sieras based on user role

 [ ] registerRole $WithProjectsCompany


Querying
========

DEBUG=loopback:connector:* node .

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

Testing framework
=================

There seems to be a good example at https://github.com/jedwood/api-testing-with-node/blob/master/package.json

* npm run test
