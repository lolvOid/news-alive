CURRENTDIR =  $(pwd)
PARENTDIR = $(dirname $(CURRENTDIR))
TARGET = vite_docker


.PHONY: app

app:
	docker exec -it vite_docker sh

build:
	docker-compose up --build --no-recreate -d

install:
	docker exec -it vite_docker sh -c "npm install"

dev:
	docker exec -it vite_docker sh -c "npm run dev"

up:
	docker-compose up -d

start: up dev

stop:
	docker-compose kill || true
	docker-compose rm --force || true

restart:
	stop start dev

clean: stop
	docker-compose down -v --remove-orphans || true

first: build install dev
	
