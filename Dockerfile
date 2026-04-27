# -- Build frontend --
FROM node:20-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile && pnpm approve-builds --all
COPY frontend/ ./
RUN node build.cjs
RUN ls -la dist/

# -- Runtime --
FROM python:3.11-slim
WORKDIR /app

# Install git (needed for git operations from the UI)
RUN apt-get update && apt-get install -y --no-install-recommends git && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ backend/
COPY run.py .

# Copy built frontend
COPY --from=frontend /app/frontend/dist frontend/dist

# Default docs directory (mount your actual docs here)
RUN mkdir -p /data/docs
ENV DOCS_DIR=/data/docs
ENV PORT=8000

EXPOSE 8000

CMD ["python3", "run.py"]


