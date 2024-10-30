#!/bin/bash

terraformer import aws --resources=s3 --regions=us-north-1
terraformer import aws --resources=cloudfront

cd generated/aws/s3
terraform state replace-provider --auto-approve "registry.terraform.io/-/aws" "hashicorp/aws"

cd ../cloudfront
terraform state replace-provider --auto-approve "registry.terraform.io/-/aws" "hashicorp/aws"
 