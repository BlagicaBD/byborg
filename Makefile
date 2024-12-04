# Define the image name and container name
IMAGE_NAME = oranum-1
CONTAINER_NAME = oranum-1

# Build the Docker image
build:
	docker build -t $(IMAGE_NAME) .

# Run the Docker container
run:
	docker run --rm --name $(CONTAINER_NAME) -p 8088:80 $(IMAGE_NAME)

# Run tests inside the container
test:
	docker run --rm --name $(CONTAINER_NAME) $(IMAGE_NAME) 

# Clean up unused Docker images and containers
clean:
	docker system prune -f

# Generate allure report (requires allure to be installed)
allure-report:
	docker run --rm --name $(CONTAINER_NAME) -v $(PWD)/allure-results:/app/allure-results -v $(PWD)/allure-report:/app/allure-report allure-commandline generate /app/allure-results --output /app/allure-report

# Show reports
serve-report:
	cd ./allure-report && python -m http.server 8000

# Show help message
help:
	@echo "Makefile commands:"
	@echo "  build         - Build the Docker image"
	@echo "  run           - Run the Docker container"
	@echo "  test          - Run tests inside the container"
	@echo "  clean         - Clean up unused Docker resources"
	@echo "  allure-report - Generate Allure report from test results"
	@echo "  serve-report  - Show Allure report from test results on https://localhost:8000"
	@echo "  help          - Display this help message"
