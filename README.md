# The Nature of Code

Code is deployed to https://www.blurbpress.com/.

## Deploy

- `aws s3 cp ./p5 "s3://blurbpress.com/p5" --recursive --cache-control no-store --profile blurbpress_deploy`
- `aws s3 cp index.html "s3://blurbpress.com" --cache-control no-store --profile blurbpress_deploy`

## Projects

- cloud chamber

- hydrogen energy states
