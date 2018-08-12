variable "region" {
  default = "us-east-1"
}

variable "domain_name" {}

variable "alternate_domain_names" {
  default = []
}

variable "tags" {
  default = {}
}

variable "log_prefix" {
  default = "logs/"
}
