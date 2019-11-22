#!/bin/bash
set -e
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

docker build -t "$1:$2" --build-arg SITE=$1 .

docker tag "$1:$2" "basecms/company-update-$1:$2"
docker push "basecms/company-update-$1:$2"
docker image rm "$1:$2"
