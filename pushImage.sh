docker-compose build

docker tag myproject_backend userwei/nycu_service-learning-nanao:backend
docker tag myproject_frontend userwei/nycu_service-learning-nanao:frontend

docker push userwei/nycu_service-learning-nanao:backend
docker push userwei/nycu_service-learning-nanao:frontend
