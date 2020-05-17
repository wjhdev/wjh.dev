# provision.sh
#
# Boot script for newly provisioned server. Bundled with vagrant
# to set up local development environment

#!/bin/bash

# Set the timezone
echo "US/Central" > /etc/timezone
dpkg-reconfigure --frontend noninteractive tzdata

# make sure our clocks are always on time
echo 'ntpdate ntp.ubuntu.com' > /etc/cron.daily/ntpdate
chmod +x /etc/cron.daily/ntpdate

# Install Docker
apt update -y

sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -

sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"

apt-get update -y

apt-get install docker-ce docker-ce-cli -y

apt-get install docker-compose -y

cd /vagrant

sudo service docker start
sudo docker network create wjh.dev-proxy

docker-compose up -d

echo "PATH=$PATH:/usr/local/bin/vendor/bin/" >> /home/vagrant/.bashrc

echo 'Finished provision.sh'

