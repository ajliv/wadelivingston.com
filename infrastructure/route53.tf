resource "aws_route53_zone" "domain" {
  name = "${var.domain_name}"
  tags = "${var.tags}"
}

resource "aws_route53_zone" "alternate_domains" {
  count = "${length(var.alternate_domain_names)}"

  name = "${element(var.alternate_domain_names, count.index)}"
  tags = "${var.tags}"
}

resource "aws_route53_record" "cert_validation" {
  name    = "${aws_acm_certificate.cert.domain_validation_options.0.resource_record_name}"
  type    = "${aws_acm_certificate.cert.domain_validation_options.0.resource_record_type}"
  zone_id = "${aws_route53_zone.domain.zone_id}"
  records = ["${aws_acm_certificate.cert.domain_validation_options.0.resource_record_value}"]
  ttl     = 60
}

resource "aws_route53_record" "i_record" {
  zone_id = "${aws_route53_zone.domain.zone_id}"
  name    = "i.${var.domain_name}"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.distribution.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.distribution.hosted_zone_id}"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_record" {
  zone_id = "${aws_route53_zone.domain.zone_id}"
  name    = "www.${var.domain_name}"
  type    = "CNAME"
  ttl     = 7200

  records = [
    "${aws_s3_bucket.www_bucket.website_endpoint}",
  ]
}

resource "aws_route53_record" "alternate_records" {
  count = "${length(var.alternate_domain_names)}"

  zone_id = "${element(aws_route53_zone.alternate_domains.*.zone_id, count.index)}"
  name    = "www.${element(var.alternate_domain_names, count.index)}"
  type    = "CNAME"
  ttl     = 7200

  records = [
    "${aws_s3_bucket.alternate_buckets.*.website_endpoint}",
  ]
}

resource "aws_route53_record" "record" {
  zone_id = "${aws_route53_zone.domain.zone_id}"
  name    = "${var.domain_name}"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.distribution.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.distribution.hosted_zone_id}"
    evaluate_target_health = false
  }
}
