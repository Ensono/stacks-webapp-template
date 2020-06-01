def random_map() { return [:] }

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
    self_repo_src="packages/scaffolding-cli/templates/src/ssr"
    self_repo_tf_src="packages/scaffolding-cli/templates/deploy/gcp/app/kube"
    self_repo_k8s_src="packages/scaffolding-cli/templates/deploy/k8s"
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
    docker_image_tag="${version_major}.${version_minor}.${version_revision}-${GIT_COMMIT}"
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
    testcafe_e2e_test="false"
    // Lighthouse Audit"
    lighthouse_audit="false"
    static_code_analysis="true"
    cypress_e2e_test="false"
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
      stages{
        stage('Build'){
          steps {
            dir("${self_repo_src}") {
              sh '''
                npm audit --audit-level=moderate
              '''
              sh '''
                npm install
              '''
              // Installing peer deps for package
              // can be extended with addtional pacakges            
              // npx install-peerdeps -d @amidostacks/eslint-config package2 package3
              sh '''
                npx install-peerdeps -d @amidostacks/eslint-config
              '''
              sh '''
                npm run validate
              '''
            }
          }
        }
        stage('Test') {
          // when {
          //     branch 'master'
          // }
          failFast true
          parallel {
            stage('unit-test') {
                agent {
                  docker {
                    image 'amidostacks/ci-k8s:0.0.7'
                  }
                }
                steps {
                  sh '''
                    cd ${self_repo_src}
                    npm run test
                  '''
                }
            }
            stage('cypress-test') {
              when {
                equals expected: "true", actual: "${cypress_e2e_test}"
              }
              // agent {
              //   docker {
              //     image 'amidostacks/ci-k8s:0.0.7'
              //   }
              // }
              environment {
                PORT="3000"
                APP_BASE_URL="http://localhost"
                MENU_API_URL="https://api.demo.nonprod.amidostacks.com/api/menu"
                APP_BASE_PATH=""
              }
              steps {
                sh '''
                  npm run test:cypress
                '''
              }
            }
            stage('sonar-scanner') {
              when {
                equals expected: "true", actual: "${static_code_analysis}"
              }
              agent {
                docker {
                  image 'amidostacks/ci-sonarscanner:0.0.1'
                }
              }
              environment {
                SONAR_HOST_URL="https://sonarcloud.io"
                SONAR_PROJECT_KEY="stacks-webapp-template"
                BUILD_NUMBER="${docker_image_tag}"
              }
              steps {
                dir("${self_repo_src}") {
                  withCredentials([
                    string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN'),
                    string(credentialsId: 'SONAR_ORGANIZATION', variable: 'SONAR_ORGANIZATION')
                  ]) {
                      sh '''
                      sonar-scanner -v
                      sonar-scanner
                    '''
                  }
                }
              }
            }
          }
        }
        stage('ArtifactUpload') {
          steps {
            dir("${self_repo_src}") {
              withCredentials([file(credentialsId: 'gcp-key', variable: 'GCP_KEY')]) {
                sh '''
                  gcloud auth activate-service-account --key-file=${GCP_KEY}
                  gcloud container clusters get-credentials ${gcp_cluster_name} --region ${gcp_region} --project ${gcp_project_name}
                  docker-credential-gcr configure-docker
                  gcloud auth configure-docker "eu.gcr.io" --quiet
                  docker build . -t ${docker_container_registry_name}/${docker_image_name}:${docker_image_tag} \\
                    -t ${docker_container_registry_name}/${docker_image_name}:latest
                  docker push ${docker_container_registry_name}/${docker_image_name}
                '''
              }
            }
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
            CURRENT_TF_WORKSPACE="dev-jenkins"
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
            // GOOGLE_CREDENTIALS=withCredentials([
            //     file(credentialsId: 'gcp-key', variable: 'GCP_KEY')])
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
            namespace="dev-stacks-webapp-jenkins"
            dns_pointer="app-jenkins.${base_domain}"
            tls_domain="${base_domain}"
            k8s_app_path=""
            k8s_image="${docker_container_registry_name}/${docker_image_name}:${docker_image_tag}"
            version="${docker_image_tag}"
            role="${role}"
            company="${company}"
            ingress_ip_name="amido-stacks-nonprod-gke-infra-ingress-public"
            project="${project}"
            domain="${domain}"
            component="web"
            app_name="webapp-template"
            resource_def_name="node-app"
            environment="dev"
          }
          steps {
            dir("${self_repo_k8s_src}") {
              withCredentials([
                file(credentialsId: 'gcp-key', variable: 'GCP_KEY'),
                string(credentialsId: 'azure_client_id', variable: 'ARM_CLIENT_ID'),
                string(credentialsId: 'azure_client_secret', variable: 'ARM_CLIENT_SECRET'),
                string(credentialsId: 'azure_subscription_id', variable: 'ARM_SUBSCRIPTION_ID'),
                string(credentialsId: 'azure_tenant_id', variable: 'ARM_TENANT_ID'),
                string(credentialsId: 'app_insights_key', variable: 'APPLICATION_INSIGHTS')
              ]) {
                sh '''
                  export app_insights_key="${APPLICATION_INSIGHTS}"
                  envsubst -i ./app/base_gke-app-deploy.yml -o ./app/app-deploy.yml -no-unset -no-empty
                '''
                sh '''
                  gcloud auth activate-service-account --key-file=${GCP_KEY}
                  gcloud container clusters get-credentials ${gcp_cluster_name} --region ${gcp_region} --project ${gcp_project_name}
                  cat ./app/app-deploy.yml
                  kubectl apply -f ./app/app-deploy.yml
                '''
              }
            }
          }
        }
      }
    }
  }
}
