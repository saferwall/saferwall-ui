docker-build:
	docker build -t saferwall-ui .

docker-run:
	docker run --env-file .env -p 3000:3000 saferwall-ui
