.PHONY: dev build install

install:
	pip install -r requirements.txt
	cd frontend && pnpm install && pnpm approve-builds --all

build:
	cd frontend && node build.cjs

dev:
	python3 run.py

dev-frontend:
	cd frontend && npx vite --port 5173

