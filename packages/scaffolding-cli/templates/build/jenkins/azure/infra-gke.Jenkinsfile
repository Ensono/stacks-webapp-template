def random_map() { return [:] }

pipeline {
  agent none
  // parameters {
  // }
  options {
    preserveStashes(buildCount: 3)
    newContainerPerStage()
  }
  environment {
    company="amido"
    project="stacks"
    domain="jnks-gke-infra"
    component="infra"
    // SelfConfig"
    self_repo_tf_src="packages/scaffolding-cli/templates/deploy/gcp/infra/stacks-gke"
    // TF STATE CONFIG
    // 
    tf_state_rg="amido-stacks-rg-uks"
    tf_state_storage="amidostackstfstategbl"
    tf_state_container="tfstate"
    // Stacks operates Terraform states based on workspaces **IT IS VERY IMPORTANT** that you ensure a unique name for each application definition"
    // Furthermore **IT IS VERY IMPORTANT** that you change the name of a workspace for each deployment stage"
    // there are some best practices around this if you are going for feature based environments"
    // - we suggest you create a runtime variable that is dynamically set based on a branch currently running"
    // **`terraform_state_workspace="`** "
    // avoid running anything past dev that is not on master"
    // sample value="company-webapp"
    tf_state_key="gke-infra"
    // Versioning 
    version_major="0"
    version_minor="0"
    version_revision="${BUILD_NUMBER}"
    // This will always be predictably named by setting your company - project - INFRAstage - location - compnonent names in the infra-pipeline"
    gcp_region="europe-west2"
    gcp_project_name="amido-stacks"
    gcp_project_id="amido-stacks"
    gcp_cluster_name="${company}-${project}-nonprod-${domain}"
    gke_cluster_version="1.15.11-gke.12"
    // Infra
    base_domain="gke.nonprod.amidostacks.com"
    // GLOBAL GCP vars
    CLOUDSDK_COMPUTE_REGION="${gcp_region}"
    CLOUDSDK_CORE_PROJECT="${gcp_project_id}"
    CLOUDSDK_CORE_DISABLE_PROMPTS="True"
  }
  stages {
    stage('NonProd') {
      agent {
        docker {
          image 'amidostacks/ci-tf:0.0.3'
        }
      }
      stages {
        stage('Infra') {
          environment {
            CURRENT_TF_WORKSPACE="nonprod-jnks"
            TF_VAR_project="${gcp_project_name}"
            TF_VAR_location="${gcp_region}"
            TF_VAR_region="${gcp_region}"
            TF_VAR_name_company="${company}"
            TF_VAR_name_project="${project}"
            TF_VAR_name_component="${domain}"
            TF_VAR_name_environment="nonprod-jnks"
            TF_VAR_cluster_version="${gke_cluster_version}"
            TF_VAR_stage="nonprod"
            TF_VAR_dns_zone="${base_domain}"
            // TF_VAR_service_account_roles="[]"
          }
          steps {
            dir("${self_repo_tf_src}") {
              withCredentials([
                file(credentialsId: 'gcp-key', variable: 'GCP_KEY'),
                string(credentialsId: 'azure_client_id', variable: 'ARM_CLIENT_ID'),
                string(credentialsId: 'azure_client_secret', variable: 'ARM_CLIENT_SECRET'),
                string(credentialsId: 'azure_subscription_id', variable: 'ARM_SUBSCRIPTION_ID'),
                string(credentialsId: 'azure_tenant_id', variable: 'ARM_TENANT_ID')
              ]) {
                sh '''
                  export GOOGLE_CLOUD_KEYFILE_JSON=${GCP_KEY}
                  terraform -v
                  terraform init -backend-config=\""key=${tf_state_key}\"" -backend-config=\""storage_account_name=${tf_state_storage}\"" \\
                   -backend-config=\""resource_group_name=${tf_state_rg}\"" -backend-config=\""container_name=${tf_state_container}\""
                  terraform workspace select ${CURRENT_TF_WORKSPACE} || terraform workspace new ${CURRENT_TF_WORKSPACE}
                  terraform plan -input=false
                '''
                input(message: 'Continue?', ok: 'OK')
                sh '''
                  export GOOGLE_CLOUD_KEYFILE_JSON=${GCP_KEY}
                  terraform apply -auto-approve
                '''
                sh '''
                  raw_tf=$(terraform output -json | jq -r 'keys[] as $k | "##vso[task.setvariable variable=\\($k);isOutput=true]\\(.[$k] | .value)"')
                  readarray -t outputs <<<"$raw_tf"
                  for i in "${outputs[@]}"; do echo "$i"; done
                '''
              }
            }
          }
        }
      }
    }
  }
}
