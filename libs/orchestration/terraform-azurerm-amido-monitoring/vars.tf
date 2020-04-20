############################################
# NAMING
############################################
variable "query" {
  
}

variable "severity" {
  default = 1
}

variable "frequency" {
  default = 5
}

variable "time_window" {
  default = 30
}

variable "operator" {
  default = "GreaterThan"
}

variable "threshold" {
  default = 3
}

variable "action_group" {
  default = []
}

variable "email_subject" {
  default = "azure alert"  
}

############################################
# AZURE INFORMATION
############################################

############################################
# RESOURCE INFORMATION
############################################

variable "resource_group_name" {
}

variable "application_insights_id" {
}

variable "location" {
  default = "UK South"
}

variable "alert_name" {
}
