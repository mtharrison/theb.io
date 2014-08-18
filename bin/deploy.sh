mv config/secrets.json config/x_secrets.json
mv config/secrets_prod.json config/secrets.json
docker build -t mtharrison/theb.io .
docker push mtharrison/theb.io
ssh theb.io 'sudo docker kill $(sudo docker ps -q)'
ssh theb.io 'sudo docker pull mtharrison/theb.io'
ssh theb.io 'sudo docker run -p 80:80 -d -v /home/ubuntu/logs:/home/ubuntu/logs mtharrison/theb.io'
mv config/secrets.json config/secrets_prod.json
mv config/x_secrets.json config/secrets.json
