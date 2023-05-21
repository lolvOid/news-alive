CURRENTDIR =  $(pwd)
PARENTDIR = $(dirname $(CURRENTDIR))
TARGET := vite_docker


.PHONY: app

prompt-install:
	echo "Installation vite_docker..."

prompt-build:
	echo "Building vite_docker..."

prompt-stop:
	echo "Stop vite_docker..."

prompt-run:
	echo "Running vite_docker..."

prompt-npm:
	echo "Npm installation..."

prompt-restart:
	echo "Restarting vite_docker...."

app:
	docker exec -it vite_docker sh

build: prompt-build
	docker-compose up --build --no-recreate -d

dev-install:
	prompt-npm docker exec -it vite_docker sh -c "npm install"

dev-run:
	prompt-run docker exec -it vite_docker sh -c "npm run dev"

up:
	docker-compose up -d

start: up dev


stop: prompt-stop
	docker-compose kill || true
	docker-compose rm --force || true

restart: prompt-restart stop start dev

clean: stop
	docker-compose down -v --remove-orphans || true

install: prompt-install build install dev
	
