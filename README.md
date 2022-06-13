# petshop
Node.js API using Express, Sequelizer, BodyParser and Mysql as DB.

https://cursos.alura.com.br/course/nodejs-api-rest-padronizada-escalavel

https://cursos.alura.com.br/certificate/fviel-alura/nodejs-api-rest-padronizada-escalavel

## Docker

Build image

```code
docker build . -t <your username>/petshop
```

List image

```code
docker images
```


Run the images

```code
docker run -p 3000:3000 -d <your username>/petshop
```

Printing output

```code
# Get container ID
$ docker ps

# Print app output
$ docker logs <container id>

# Example
Running on http://localhost:8080
```

Going inside container

```code
# Enter the container
$ docker exec -it <container id> /bin/bash
```

