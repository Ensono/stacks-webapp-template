pipeline {
  agent none
  // parameters {
  // }
  environment {
    company="amido"
project="stacks"
    domain="node"
    role="frontend"
    // SelfConfig"
    // If you haven't specified source_repo at cli runtime please ensure you replace it here "
    // It is case sensitive for TFS based repos"
    self_repo="stacks-webapp-template/packages/scaffolding-cli/templates"
    self_repo_src="src/ssr"
    self_repo_tf_src="deploy/gcp/app/kube"
    self_generic_name="stacks-webapp-jenkins"
    // TF STATE CONFIG"
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
    tf_state_key="node-app"
    // Versioning"
    version_major="0"
    version_minor="0"
    version_revision="${BUILD_NUMBER}"
    // Docker Config"
    docker_dockerfile_path="src/"
    docker_image_name="${self_generic_name}"
    docker_image_tag="${version_major}.${version_minor}.${version_revision}-${BRANCH_NAME}"
    docker_container_registry_name="eu.gcr.io/${gcp_project_id}"
    build_artifact_deploy_name="${self_generic_name}"
    // AKS/AZURE"
    // This will always be predictably named by setting your company - project - INFRAstage - location - compnonent names in the infra-pipeline"
    gcp_region="europe-west2"
    gcp_project_name="amido-stacks"
    gcp_project_id="amido-stacks"
    gcp_cluster_name="${company}-${project}-nonprod-gke-infra"
    // Infra "
    conventional_resource_namer="${company}-${project}-nonprod-uks-${domain}"
    base_domain="gke.nonprod.amidostacks.com"
    // Dynamic vars for downstream purposes"
    // tf_workspace_suffix="$[]"
    // dns_suffix=""""
    // Test setup"
    // ADD Vars here"
    // TestCafe E2E Tests"
    testcafe_e2e_test=false
    // Lighthouse Audit"
    lighthouse_audit=false
    CLOUDSDK_COMPUTE_REGION="${gcp_region}"
    CLOUDSDK_CONTAINER_CLUSTER="${company}-${project}-nonprod-gke-infra"
    CLOUDSDK_CORE_PROJECT="${gcp_project_id}"
    CLOUDSDK_CORE_DISABLE_PROMPTS="True"
  }
  stages {
    stage('CI') {
      agent {
        docker {
          image 'amidostacks/ci-k8s:0.0.7'
          // add additional args if you need to here
          // e.g.:
          // args '-v /var/run/docker.sock:/var/run/docker.sock -u 1000:999'
          // Please check with your admin on how 
        }
      }
      environment {
        NODE_ENV="production"
      }
steps {
        dir("${WORKSPACE}/packages/scaffolding-cli/templates/src/ssr") {
          sh '''
            npm audit --audit-level=moderate
          '''
          sh '''
            echo "npm install"
          '''
          // Installing peer deps for package
          // can be extended with addtional pacakges            
          // npx install-peerdeps -d @amidostacks/eslint-config package2 package3
          sh '''
            echo "npx install-peerdeps -d @amidostacks/eslint-config"
          '''
          sh '''
            npm run validate
          '''
          sh '''
            echo "npm run test"
          '''
          // archiveArtifacts artifacts: '**/coverage/*.lcov', fingerprint: true
          withCredentials([file(credentialsId: 'gcp-key', variable: 'GCP_KEY')]) {
              sh '''
                gcloud auth activate-service-account --key-file=${GCP_KEY}
              '''
                // gcloud container clusters get-credentials ${gcp_cluster_name} --region ${gcp_region} --project ${gcp_project_name}
                // docker-credential-gcr configure-docker
                // gcloud auth configure-docker "eu.gcr.io" --quiet
                // docker build . -t ${docker_container_registry_name}/${docker_image_name}:${docker_image_tag} \\
                //   -t ${docker_container_registry_name}/${docker_image_name}:latest
                // docker push ${docker_container_registry_name}/${docker_image_name}
            }
        }
      }
    }
    stage('Dev') {
      agent {
        docker {
          image 'amidostacks/ci-tf:0.0.3'
        }
      }
      stages {
        stage('Infra') {
          environment {
            TF_WORKSPACE="dev-jenkins"
            TF_VAR_project="${gcp_project_name}"
            TF_VAR_location="${gcp_region}"
            TF_VAR_region="${gcp_region}"
            TF_VAR_name_company="${company}"
            TF_VAR_name_project="${project}"
            TF_VAR_name_component="${component}"
            TF_VAR_name_environment="dev"
            TF_VAR_name_stage="dev"
            TF_VAR_ingress_ip_name="amido-stacks-nonprod-gke-infra-ingress-public"
            TF_VAR_dns_record="app-jenkins"
            TF_VAR_dns_zone_name="amido-stacks-nonprod-gke-infra"
          }
          steps {
            // packages/scaffolding-cli/templates/deploy/gcp/app/kube
            dir("${WORKSPACE}/packages/scaffolding-cli/templates/deploy/gcp/app/kube") {
              withCredentials([
                file(credentialsId: 'gcp-key', variable: 'GCP_KEY'),
                string(credentialsId: 'azure_client_id', variable: 'ARM_CLIENT_ID'),
                string(credentialsId: 'azure_client_secret', variable: 'ARM_CLIENT_SECRET'),
                string(credentialsId: 'azure_subscription_id', variable: 'ARM_SUBSCRIPTION_ID'),
                string(credentialsId: 'azure_tenant_id', variable: 'ARM_TENANT_ID')
              ]) {
                sh '''
                  GOOGLE_CLOUD_KEYFILE_JSON=${GCP_KEY}
                  terraform -v
                  terraform init -backend-config=\""key=${tf_state_key}\"" -backend-config=\""storage_account_name=${tf_state_storage}\"" \\
                   -backend-config=\""resource_group_name=${tf_state_rg}\"" -backend-config=\""container_name=${tf_state_container}\""
                  terraform plan -input=false -out=tfplan
                '''
                  // terraform workspace select ${TF_WORKSPACE} || terraform workspace new ${TF_WORKSPACE}
                input(message: 'Continue?', ok: 'OK')
                sh '''
                  GOOGLE_CLOUD_KEYFILE_JSON=${GCP_KEY}
                  terraform apply tfplan
                '''
              }
            }
          }
        }
        stage('Deploy') {
          agent {
            docker {
              image 'amidostacks/ci-k8s:0.0.7'
            }
          }
          environment {
            namespace="dev-stacks-webapp"
            dns_pointer="app-jenkins.${base_domain}"
            tls_domain="${base_domain}"
            k8s_app_path="/web/stacks"
            k8s_image="'${docker_container_registry_name}/${docker_image_name}:${docker_image_tag}"
            version="${docker_image_tag}"
            role="${role}"
            company="${company}"
            ingress_ip_name="amido-stacks-nonprod-gke-infra-ingress-public"
            project="${project}"
            domain="${domain}"
            component="web"
            app_name="webapp-template"
            resource_def_name="node-app"
            environ="dev"
          }
          steps {
            dir("${WORKSPACE}/packages/scaffolding-cli/templates/deploy") {
              withCredentials([
                file(credentialsId: 'gcp-key', variable: 'GCP_KEY'),
                string(credentialsId: 'azure_client_id', variable: 'ARM_CLIENT_ID'),
                string(credentialsId: 'azure_client_secret', variable: 'ARM_CLIENT_SECRET'),
                string(credentialsId: 'azure_subscription_id', variable: 'ARM_SUBSCRIPTION_ID'),
                string(credentialsId: 'azure_tenant_id', variable: 'ARM_TENANT_ID')
              ]) {
                sh '''
                  envsubst -i ./k8s/app/base_gke-app-deploy.yml -o ./k8s/app/app-deploy.yml -no-unset -no-empty
                '''
                sh '''
                  gcloud auth activate-service-account --key-file=${GCP_KEY}
                  gcloud container clusters get-credentials ${gcp_cluster_name} --region ${gcp_region} --project ${gcp_project_name}
                  kubectl apply -f ./k8s/app/app-deploy.yml --context ${gcp_cluster_name}
                '''
              }
            }
          }
        }
      }
    }
  }
}
