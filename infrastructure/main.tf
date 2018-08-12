terraform {
  backend "s3" {
    region = "us-east-1"
    bucket = "tf-state-wadelivingston.com"
    key    = "terraform.tfstate"
  }
}

provider "aws" {
  region = "${var.region}"
}

output "distribution_id" {
  value = "${aws_cloudfront_distribution.distribution.id}"
}

output "hosted_zone_id" {
  value = "${aws_route53_zone.domain.zone_id}"
}

output "state_bucket" {
  value = "${aws_s3_bucket.state_bucket.id}"
}
