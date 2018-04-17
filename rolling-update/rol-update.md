[Deployment Milestone](../README.md) | [Deployment](/deployment/deployment.md) | [Infrastructure Upgrade](/infrastructure-upgrade/infra-upgrade.md)

[Canary Release](/canary-release/can-rel.md) | [Team Details](../Team.md)

# ITRUST DEPLOYMENT AND ROLLING UPDATE

### [Screencast](https://youtu.be/DHPIyB0z1Mk)

### Important files
- [Ansible folder](https://github.ncsu.edu/sjha5/Deployment/blob/master/rolling-update/): Home folder containing ansible playbooks and other related files.
- [Playbook for iTrust deployment](https://github.ncsu.edu/sjha5/Deployment/blob/master/rolling-update/provisioning-deployment.yml): Playbook to be executed for provisioning VMs and deploying iTrust nodes.
- [Rolling update](https://github.ncsu.edu/sjha5/Deployment/blob/master/rolling-update/rolling-update.yml): Ansible scrcipt for updating iTrust nodes one at a time.

### Flow
- The playbook for provisioning and deployment contains three plays:
  - The first play is for `localhost` : installs the prerequisites required for provisioning DO droplets and provisions mysql droplet and five iTrust servers. It saves the IP of mysql server on mysql<i></i>.info and IPs for iTrust nodes into inventory-update file.
  - The second play is for `mysql_server`: sets up mysql server and configures it to accept remote connection as well.
  - The last play is for `iTrust`: It sets up iTrust in five different servers. Also, sets up iTrust to connect to mysql instance on the mysql droplet.

- The playbook for rolling update does the following:
  - Using the inventory file 'inventory-update', it will go through all the nodes one at a time and update the nodes. Key word being used here in ansible script is 'serial: 1'. This makes sure that we are working/updating only one node at a time.


[<<< Previous](/canary-release/can-rel.md) | [Next >>>](/Team.md)