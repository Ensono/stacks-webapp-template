package test

import (
	"fmt"
	"strings"
	"testing"

	"github.com/gruntwork-io/terratest/modules/gcp"
	"github.com/gruntwork-io/terratest/modules/random"
	"github.com/gruntwork-io/terratest/modules/terraform"
	"github.com/stretchr/testify/assert"
)

func TestTerrafromGcpStorageBucket(t *testing.T) {
	t.Parallel()

	exampleDir := "../examples"

	// Get the Project Id to use
  projectId := gcp.GetGoogleProjectIDFromEnvVar(t)
  
  // Set the location to us
  location := "EU"

	// Give the example bucket a unique name so we can distinguish it from any other bucket in your GCP account
  expectedBucketName := fmt.Sprintf("example_test_results-%s", strings.ToLower(random.UniqueId()))
  
	// website::tag::1::Configure Terraform setting path to Terraform code, bucket name, and instance name.
	terraformOptions := &terraform.Options{
		// The path to where our Terraform code is located
		TerraformDir: exampleDir,

		// Variables to pass to our Terraform code using -var options
		Vars: map[string]interface{}{
			"gcp_project_id": projectId,
			"bucket_location":  location,
			"bucket_name":    expectedBucketName,
		},
	}

	// website::tag::5::At the end of the test, run `terraform destroy` to clean up any resources that were created
	defer terraform.Destroy(t, terraformOptions)

	// website::tag::2::This will run `terraform init` and `terraform apply` and fail the test if there are any errors
	terraform.InitAndApply(t, terraformOptions)

	// Run `terraform output` to get the value of some of the output variables
	bucketURL := terraform.Output(t, terraformOptions, "bucket_url")

	// website::tag::3::Verify that the new bucket url matches the expected url
	expectedURL := fmt.Sprintf("gs://%s", expectedBucketName)
	assert.Equal(t, expectedURL, bucketURL)

	// Verify that the Storage Bucket exists
	gcp.AssertStorageBucketExists(t, expectedBucketName)
}
