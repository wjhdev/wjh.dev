#!/bin/bash
#
# provision.sh
#
# 1. Sets clocks
# 2. Install Docker
# 3. Run
#

# 1. Set Clocks
#
echo "US/Central" > /etc/timezone
dpkg-reconfigure --frontend noninteractive tzdata
echo 'ntpdate ntp.ubuntu.com' > /etc/cron.daily/ntpdate
chmod +x /etc/cron.daily/ntpdate

# 2. Install Docker
#
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
sudo apt-get update -y
sudo apt-get install docker-ce docker-ce-cli -y
sudo apt-get install docker-compose -y

# 2. Run
#
cd ~/wjh.dev
sudo service docker start
sudo docker-compose up -d

echo 'Finished provision.sh'
