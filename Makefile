.PHONY: deploy

deploy:
	aws s3 cp ./p5 "s3://blurbpress.com/p5" --recursive --cache-control no-store --profile blurbpress_deploy
	aws s3 cp ./js "s3://blurbpress.com/js" --recursive --cache-control no-store --profile blurbpress_deploy
	aws s3 cp ./styles "s3://blurbpress.com/styles" --recursive --cache-control no-store --profile blurbpress_deploy
	aws s3 cp index.html "s3://blurbpress.com" --cache-control no-store --profile blurbpress_deploy
