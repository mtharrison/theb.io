docker build -t mtharrison/theb.io .
docker push mtharrison/theb.io
ssh theb.io 'sudo docker kill $(sudo docker ps -q)'
ssh theb.io 'sudo docker pull mtharrison/theb.io'
ssh theb.io 'sudo docker run -p 80:80 -d -v /home/ubuntu/logs:/home/ubuntu/logs mtharrison/theb.io'