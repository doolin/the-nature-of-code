SUBDIR := the-nature-of-code

.PHONY: deploy

deploy:
	aws s3 cp ./p5 "s3://blurbpress.com/$(SUBDIR)/p5" --recursive --cache-control no-store --profile blurbpress_deploy
	aws s3 cp ./js "s3://blurbpress.com/$(SUBDIR)/js" --recursive --cache-control no-store --profile blurbpress_deploy
	aws s3 cp ./styles "s3://blurbpress.com/$(SUBDIR)/styles" --recursive --cache-control no-store --profile blurbpress_deploy
	aws s3 cp index.html "s3://blurbpress.com/$(SUBDIR)/" --cache-control no-store --profile blurbpress_deploy
	aws s3 cp chapter1.html "s3://blurbpress.com/$(SUBDIR)/" --cache-control no-store --profile blurbpress_deploy
	aws s3 cp chapter2.html "s3://blurbpress.com/$(SUBDIR)/" --cache-control no-store --profile blurbpress_deploy
	aws s3 cp michelson-1881.html "s3://blurbpress.com/$(SUBDIR)/" --cache-control no-store --profile blurbpress_deploy
	aws s3 cp hexagon.html "s3://blurbpress.com/$(SUBDIR)/" --cache-control no-store --profile blurbpress_deploy
	aws s3 cp hydrogen.html "s3://blurbpress.com/$(SUBDIR)/" --cache-control no-store --profile blurbpress_deploy
