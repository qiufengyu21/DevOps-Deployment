# CANARY-RELEASE

### [Screencast](https://somelinkhere.com)

### Important files
- [Vagrantfile](https://github.ncsu.edu/sjha5/Deployment/blob/master/canary-release/Vagrantfile): Sets up Vagrant VM with git and ansible installed. Requires DO token to be added.
- [Ansible folder](https://github.ncsu.edu/sjha5/Deployment/blob/master/canary-release/ansible): Home folder containing ansible playbooks and other related files.
- [Main playbook](https://github.ncsu.edu/sjha5/Deployment/blob/master/canary-release/ansible/main.yml): Main playbook to be executed.
- [Load balancer](https://github.ncsu.edu/sjha5/Deployment/blob/master/canary-release/ansible/roles/load-balancer/files/lb.py): Python code for load-balancer.

### Flow
- The main playbook contains three plays:
  - The first play is for `localhost` : installs the prerequisites required for provisioning DO droplets and provisions prod, staging and mongodb droplets.
  - The second play is for `mongodb_host`: sets up mongodb, installs redis and runs the load-balancer on the mongodb droplet.
  - The last play is for `droplets`: these are the prod and staging droplets. It sets up checkbox.io on both of these pointing to the mongodb instance on the mongodb droplet.

### Details
- Redis: After being installed, a key in redis called `flag` is set to `1`. This is the check for the load-balancer before redirecting to the staging instance.
- Load-balancer: It is passed the prod and staging IPs as arguments when it is run. It acts as a load balancer by using probability such that 80% and 20% of the time it redirects to prod and staging respectively. It also checks the `flag` flag in redis for a value of `1` before redirecting to staging otherwise it sends to prod.
- Altering: We did not simulate alerting per se, but we assumed that an alert would trigger the redis flag to false. This causes the load-balancer to not redirect any traffic to the staging instance. This can be seen in the screencast.
