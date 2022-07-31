#!/bin/bash
docker-compose -f docker-compose.test.yml --env-file .env.test up -d
docker-compose exec app bash -c "yarn test --watchAll --runInBand"