terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.40.0"
    }
  }

  required_version = ">= 1.5.0"
  backend "s3" {
    bucket         = "ofe-kalabanga-terraform-state-bucket"
    key            = "state/terraform.tfstate"
    region         = "eu-north-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }

}

provider "aws" {
  region = "eu-north-1"
}


module "perf" {
  source = "./modules/perf"

  lambda_function_name = "website_perf_check"
  lambda_source_dir="${path.root}/../lib/lambda-perf"
}