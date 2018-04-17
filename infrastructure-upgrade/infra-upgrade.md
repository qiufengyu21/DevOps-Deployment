[Deployment Milestone](../README.md) | [Deployment](/deployment/deployment.md) | [Canary Release](/canary-release/can-rel.md) | [Rolling Update](/rolling-update/rol-update.md) | [Team Details](../Team.md)

Infrastructure Upgrade
----------------------------------

[<<< Previous](/deployment/deployment.md) | [Next >>>](/canary-release/can-rel.md)

### [Screencast](https://youtu.be/ufThfV6sgbo)

### Infrastructure Upgrade
In order to set up Kubernetes cluster on AWS, we have to first install kubectl and kops. The ansible scripts are provided in this folder.

After installing the kubectl and kops, we are able to create the Kubernete cluster on AWS, the ansible script is called: **create-cluster.yaml**

After that, we have successfully created a Kubernetes with 3 nodes, one master and 2 minions. We can not deploy our application on the cluster. 
