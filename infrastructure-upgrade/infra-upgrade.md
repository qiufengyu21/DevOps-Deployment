[Deployment Milestone](../README.md) | [Deployment](/deployment/deployment.md) | [Canary Release](/canary-release/can-rel.md) | [Rolling Update](/rolling-update/rol-update.md) | [Team Details](../Team.md)

Infrastructure Upgrade
----------------------------------

[<<< Previous](/deployment/deployment.md) | [Next >>>](/canary-release/can-rel.md)

### Infrastructure Upgrade
In order to set up Kubernetes cluster on AWS, we have to first install kubectl and kops. The ansible scripts are provided in this folder.

After installing the kubectl and kops, we are able to create the Kubernete cluster on AWS, the ansible script is called: **create-cluster.yaml**

After that, we have successfully created a Kubernetes with 3 nodes, one master and 2 minions. We can not deploy our application on the cluster. 

As long as the application is accessible from the external link provided by the kubectl, we can safely turn off any node and still keep the service up and running. Reason being is that, the Kubernete cluster created redundency in order to protect the running service. Once a particular node is down, the master node will redirect the traffice to other available nodes.

## Screencast(Youtube video)
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/ufThfV6sgbo/0.jpg)](https://www.youtube.com/watch?v=ufThfV6sgbo)
