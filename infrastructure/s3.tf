resource "aws_s3_bucket" "www_bucket" {
  bucket        = "www.${var.domain_name}"
  acl           = "private"
  force_destroy = "true"
  tags          = "${var.tags}"

  website {
    redirect_all_requests_to = "${var.domain_name}"
  }
}

resource "aws_s3_bucket" "i_bucket" {
  bucket        = "i.${var.domain_name}"
  acl           = "private"
  force_destroy = "true"
  tags          = "${var.tags}"

  website {
    index_document = "index.html"
  }

  cors_rule {
    allowed_origins = ["*"]
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket" "logs_bucket" {
  bucket        = "logs.${var.domain_name}"
  acl           = "log-delivery-write"
  force_destroy = "true"
  tags          = "${var.tags}"

  lifecycle_rule {
    id      = "cleanup"
    enabled = true
    prefix  = "${var.log_prefix}"

    expiration {
      days = 90
    }
  }
}

resource "aws_s3_bucket" "alternate_buckets" {
  count = "${length(var.alternate_domain_names)}"

  bucket        = "www.${element(var.alternate_domain_names, count.index)}"
  acl           = "private"
  force_destroy = "true"
  tags          = "${var.tags}"

  website {
    redirect_all_requests_to = "${var.domain_name}"
  }
}

resource "aws_s3_bucket" "bucket" {
  bucket        = "${var.domain_name}"
  acl           = "private"
  force_destroy = "true"
  tags          = "${var.tags}"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }

  cors_rule {
    allowed_origins = ["*"]
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_policy" "i_bucket_policy" {
  bucket = "${aws_s3_bucket.i_bucket.id}"
  policy = "${data.aws_iam_policy_document.i_bucket_policy_document.json}"
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = "${aws_s3_bucket.bucket.id}"
  policy = "${data.aws_iam_policy_document.bucket_policy_document.json}"
}

data "aws_iam_policy_document" "i_bucket_policy_document" {
  statement {
    sid     = "Allow CloudFront Access to Objects"
    effect  = "Allow"
    actions = ["s3:GetObject"]

    resources = [
      "${aws_s3_bucket.i_bucket.arn}/data/*",
      "${aws_s3_bucket.i_bucket.arn}/images/*",
    ]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn}"]
    }
  }
}

data "aws_iam_policy_document" "bucket_policy_document" {
  statement {
    sid       = "Allow CloudFront Access to All Objects"
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.bucket.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn}"]
    }
  }
}
