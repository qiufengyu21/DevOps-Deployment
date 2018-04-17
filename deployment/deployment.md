[Deployment Milestone](../README.md) | [Infrastructure Upgrade](/infrastructure-upgrade/infra-upgrade.md) | [Canary Release](/canary-release/can-rel.md) | [Rolling Update](/rolling-update/rol-update.md) | [Team Details](../Team.md)

Deployment
----------------------------------

Following are the detailed report regarding steps involved to perform this milestone of the project. Following steps explains all the playbooks that we have written and purposes of each one. Starting point of our project is [main](main.yml) ansible playbook.

1. **Main Playbook**

	Pupose of this playbook is to setup all the variables that we are going to use in further playbooks. It also calls all other playbooks which we have written sequentially to achieve the desired results. Following are the steps performed in this playbbok.
	
	1. **Prompt User for credentials**
	
		We ask username and password which the user want to configure for jenkins.
		
	2. **Set Other Variables**
	
		After that we set some environment specific variables such as jenkins home, jenkins host, jenkins port etc.
		
	3. **Call multiple playbooks**
	
		After the above steps are done we finally call the number of playbooks sequentially. We have divided all tasks of this milestone across many modular ansible playbooks. And we call each one of them to execute the required tasks. We call following playbooks from this playbook.
		
		- **appdeps.yml**
        
        - **prereqs.yml**
		
		- **install.yml**
		
		- **setup.yml**
		
		- **plugins.yml**
		
		- **jobs.yml**
	
2. **Subsequent Playbooks**

	Now we will explain each of the playbook that main playbook imports.
		
	1. [appdeps.yml](/tasks/appdeps.yml)

	    In this playbook we install softwares which we need to build the jobs for checkbox.io and iTrust applications. Following are the tools which are being installed via this playbook.
	
	    - **NodeJS**
	
	    - **MySQL**
	
	    - **Maven**
    
    2. [prereqs.yml](/tasks/prereqs.yml)
	
		To setup jenkins server we need Java to be installed on our machine as pre-requisite. So as a first step we installed Java on our machine. We also update apt package in this playbook.
		
	3. [install.yml](/tasks/install.yml)
	
		Purpose of this playbook is to install jenkins. For this we first add apt-key, then we update jenkins source list and then finally we install jenkins.
	
	4. [setup.yml](/tasks/setup.yml)
	
		Purpose of this playbook is to disable manual setup steps. After installing jenkins, when we first access it we need to create a user for configuration jenkins server. In this playbook by following following steps we disable that initial setup.
		
		- **Configure JVM Args**
	
			We configure JVM args so that the initial setup wizard is disabled. For that we modify JVM args as `JAVA_ARGS="-Djava.awt.headless=true -Djenkins.install.runSetupWizard=false"`.
		
		- **Create Groovy Scripts**
	
			After this we create groovy scripts from the [template](/templates/jenkins_script.groovy.j2) that we have created. This script has variable for jenkins username and password and which we asked from user earlier. This script will create a specified user with provided credentials. Using template task after creation of this script it will be copied to `/var/lib/jenkins/init.groovy.d/basic-security.groovy` location.
			
		- **Restart Jenkins**
		
			After creating user we restart jenkins service to make these changes take effect.
		
		- **Disabling the initial setup wizard**
			
			As we have automated manual setup steps after we have restarted jenkins we change the install state of jenkins to `INITIAL_SETUP_COMPLETED`. Making this change will help in disabling the initial setup wizard.
		
	5. [plugins.yml](/tasks/plugins.yml)
	
		Purpose of this playbook is to install required plugins for jenkins. Following are the actions performed in this playbbok.
		
		- **Download Jenkins Client JAR**
		
			We download Jenkins client JAR. This JAR is used in creating build jobs in future.
		
		- **Install Plugins**
			
			In this we install following plugins for jenkins.
			
			- maven-plugin
			
			- github
	  
			- postbuildscript
      
			- postbuild-task
		
		- **Restart Jenkins**
		
			After creating user we restart jenkins service to make these changes take effect.
			Now we can access jenkins via browser to confirm proper configuration and setup of jenkins server. These playbooks we used to setup jenkins server automatically without any manual intervention. Further playbooks are explained in next sections as those are related to building jobs and executing them.
	
    6. [jobs.yml](/tasks/jobs.yml)
        
        Purpose of this playbook is to create and run the jobs for checkbox.io and iTrust applications. Following steps are performed in this playbook.

        - **Configure job for iTrust**
        
            We clone fuzzer code and configure iTrust build job through cli JAR of jenkins. Here we just configure the job for iTrust. Job will actually be triggered from fuzzer.yml. This playbook first invokes fuzzer and after each fuzzing it builds the iTrust.

        - **Configure job for checkbox.io**
        
            We configure checkbox.io build job through cli JAR of jenkins. Here we just configure the job for iTrust. Job will actually be triggered from autotest.yml. This playbook first generates the automatic tests and then we run those tests while we build the checkbox.io.

3. **Configure Hook**

    [This](/configureHooks.yml) playbook clones both of the systems and adds post commit hook into it. We follow [this](/templates/post-commit) template to create hooks. After this whenever we commit any changes, the jobs which we configured earlier gets triggered and in it's post action a droplet gets provisioned for each system and it gets deployed in that droplet. 

4. **Screencast**

    [Video Link](https://youtu.be/dU7e3dvIC7o)

[<<< Previous](../README.md) | [Next >>>](/infrastructure-upgrade/infra-upgrade.md)