resource "aws_s3_bucket" "state_bucket" {
  bucket        = "tf-state-${var.tags["Project"]}"
  acl           = "private"
  force_destroy = "true"
  tags          = "${var.tags}"
}
