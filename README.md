# Aventura Organizada

Site institucional da Aventura Organizada, agência de turismo de aventura com roteiros pelo Brasil.

## Desenvolvimento

Requer [Bun](https://bun.sh).

```sh
bun install
bun run dev
```

## Build

```sh
bun run build
```

## Docker

`docker compose up` aqui sobe a **stack completa** (marketplace.web +
backoffice.web + marketplace.api + identity.api + viagens.api) — requer
os outros 4 repositórios clonados como pastas irmãs desta (ver comentário
no topo do `docker-compose.yml`) e um Postgres já rodando no host com os
bancos criados (ver scripts em cada API).

```sh
cp .env.example .env
docker compose build --no-cache
docker compose up
```

| Serviço | Porta host | Container |
| --- | --- | --- |
| marketplace.web (este repo) | `3000` | `3000` |
| backoffice.web | `3001` | `3000` |
| marketplace.api | `5001` | `8080` |
| viagens.api | `5002` | `8080` |
| identity.api | `5000` | `8080` |

Para subir só este serviço isoladamente (sem as APIs/backoffice):

```sh
docker build -t greatgrandson-aventuraorganizada-marketplace-web .
docker run -p 3000:3000 greatgrandson-aventuraorganizada-marketplace-web
```

## Stack

- TanStack Start
- TypeScript
- React
- Tailwind CSS
