# ---------------------------------------------------------------------------------------------------------------------
# ENVIRONMENT VARIABLES
# You must define the following environment variables.
# ---------------------------------------------------------------------------------------------------------------------

# GOOGLE_CREDENTIALS
# or
# GOOGLE_APPLICATION_CREDENTIALS

variable "gcp_project_id" {
  description = "The ID of the GCP project in which these resources will be created."
  default     = "amido-stacks"
}

# ---------------------------------------------------------------------------------------------------------------------
# REQUIRED PARAMETERS
# You must provide a value for each of these parameters.
# ---------------------------------------------------------------------------------------------------------------------

# ---------------------------------------------------------------------------------------------------------------------
# OPTIONAL PARAMETERS
# These parameters have reasonable defaults.
# ---------------------------------------------------------------------------------------------------------------------

variable "bucket_name" {
  description = "The Name of the Bucket to create."
  type        = string
  default     = "example_test_results"
}

variable "bucket_location" {
  description = "The location to store the Bucket. This value can be regional or multi-regional."
  type        = string
  default     = "EU"
}
