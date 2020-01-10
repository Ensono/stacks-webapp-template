Folder used to store Kubernetes files used to deploy applications to a cluster.

Guidance:

- One folder per App
	- An app is a set of resources that are deployed as a single unit
	- One file per definition (Deployment, Service, ConfigMap)

- Create a script with commands required to deploy the application
	- Must be runnable locally for development
	- Must be runnable on CD pipeline when not using custom tools

- The definition files must be environment agnostic
	 - Any environment specific configuration must be inject from either:
		 - ConfigMap
		 - Secrets
		 - Volumes

- ADR: To define the configuration tool for environment customization

- [To define the set of files required]