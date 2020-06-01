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
    self_generic_name="stacks-webapp"
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
    // DEFAULT IMAGE RUNNER"
    pool_vm_image="ubuntu-18.04"
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
      steps {
        dir("${WORKSPACE}/packages/scaffolding-cli/templates/src/ssr") {
          sh '''
            npm audit --audit-level=moderate
          '''
          sh '''
            npm install
          '''
          // Installing peer deps for package
          // can be extended with addtional pacakges            
          // npx install-peerdeps --save-dev @amidostacks/eslint-config package2 package3
          sh '''
            npx install-peerdeps --save-dev @amidostacks/eslint-config
          '''
          sh '''
            npm run validate
          '''
          sh '''
            npm run test
          '''
          // archiveArtifacts artifacts: '**/coverage/*.lcov', fingerprint: true 
          sh '''
            echo "docker build . -t test:${BUILD_NUMBER}"
          '''
        }
      }
    }
    stage('Dev') {
      agent {
        docker {
          image 'amidostacks/ci-k8s:0.0.7'
        }
      }
      stages {
        stage('Infra') {
          steps {
            withCredentials([string(credentialsId: 'GCP_CREDS', variable: 'GOOGLE_CREDENTIALS')]) {
              sh '''
                echo "$GOOGLE_CREDENTIALS" > /tmp/gkey.json
                gcloud auth activate-service-account --key-file=/tmp/gkey.json
                gcloud container clusters get-credentials ${gcp_cluster_name} --region ${gcp_region} --project ${gcp_project}
              '''
            }
          }
        }
        stage('Deploy') {
          steps {
            sh '''
              echo "in deploy dev step"
            '''
          }
        }
      }
    }
  }
}
