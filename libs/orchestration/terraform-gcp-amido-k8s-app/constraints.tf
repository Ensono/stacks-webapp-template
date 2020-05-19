terraform {
  # The modules used in this example have been updated with 0.12 syntax, additionally we depend on a bug fixed in
  # version 0.12.7.
  required_version = ">= 0.12.24"
  required_providers {
    google-beta = "~> 3.20"
    google    = "~> 3.20"
  }
}
