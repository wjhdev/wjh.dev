## wjh.dev

Docker, Stencil & Vagrant for wjh.dev. Generates a WordPress backend and a Stencil frontend

#### Configuration

Copy `./server.env.sample` to `./server.env`. Update MYSQL credentials if running in production

#### Developing

To **run locally** install VirtualBox and Vagrant. Then run:

```
vagrant up
```

#### Deploying

To **deploy** install docker & docker compose. The GitHub Actions workflow publishes
`ghcr.io/wjhdev/wjh.dev` from `main` and then starts compose with that image:

```
WORDPRESS_IMAGE=ghcr.io/wjhdev/wjh.dev:latest docker-compose up -d
```

Pull requests labeled `stage` publish `ghcr.io/wjhdev/wjh.dev:stage-pr-<number>`.
