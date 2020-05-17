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

To **deploy** install docker & docker compose. Then run:

```
docker-compose up -d
```