CREDIT: https://github.com/gruntwork-io/terratest/tree/master/examples/terraform-gcp-example

# Terraform GCP Example

This folder contains a simple Terraform module that deploys resources in [GCP](https://cloud.google.com/) to demonstrate
how you can use Terratest to write automated tests for your GCP Terraform code. This module creates a Cloud Storage Bucket
using the `bucket_name` and `bucket_location` variables.

**WARNING**: This module and the automated tests for it deploy real resources into your GCP account which can cost you
money. The resources are all part of the [GCP Free Tier](https://cloud.google.com/free/), so if you haven't used that up,
it should be free, but you are completely responsible for all GCP charges.

## Getting Started

Creating the Terraform resource manually:

1. Sign up for [GCP](https://cloud.google.com/).
1. Configure your GCP credentials using one of the [supported methods for GCP CLI
   tools](https://cloud.google.com/sdk/docs/quickstarts).
1. Install [Terraform](https://www.terraform.io/) and make sure it's in your `PATH`.
2. Ensure the desired Project ID is set: `export TF_VAR_gcp_project_id=`.
3. Run `terraform init`.
4. Run `terraform plan` to check what changes would be made.
5. Run `terraform apply`.
6. When you're done, run `terraform destroy`.

## Running automated tests against this module

Please follow steps 1-3 from [Getting Started](#getting-started), then:

1. Install [Golang](https://golang.org/)
   1. Check your GOPATH is configured correctly, see https://golang.org/doc/install for more information.
2. Set `GOOGLE_CLOUD_PROJECT` environment variable to your project name.
3. `cd test`
4. `go test -v -run TestTerrafromGcpStorageBucket`
