# Infrastructure

<!-- 
This will be replaced by the cli depending on what selections were made during the bootstrap process
-->

There are 2 components to the application infrastructure.

1. Shared services 
  - AKS
  - Network
  - DNS Zones
  - Application Gateway
   - including SSL 

2. Application Env
  - DBs
  - DNS records
  - ...

You will need to create at least 2 pipelines, 1 you will do as part of domain development which will be using Infra type 2 (Application Env). 

Shared services can be managed through the generate `infra-pipeline.yml` - this will also change depending on the selections you made during the CLI process. By enlarge, this will be very similar for all setups except for CSR (Client Side Rendered react applications) where you will not get an AKS cluster. 

The application pipeline - generally the `app-pipeline.yml` - has a hard dependency on the base infrastructure pre-existing - you should ensure they are always run in sequence.
