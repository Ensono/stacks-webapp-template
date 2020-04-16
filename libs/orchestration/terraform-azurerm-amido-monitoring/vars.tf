variable "location" {
  default = "UK South"
}

variable "alert_name" {
}

variable "resource_group_name" {
}

variable "application_insights_id" {
}

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
