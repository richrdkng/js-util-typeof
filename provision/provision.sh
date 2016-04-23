#!/usr/bin/env bash

# enter permanent su
sudo su

# update before provisioning
apt-get update -y

# install essentials
apt-get install -y python-software-properties
apt-get install -y build-essential git nano curl mc

# update after essentials (especially python-software-properties)
apt-get update -y

# update git
add-apt-repository -y ppa:git-core/ppa
apt-get -y install git

# install node & update npm
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
apt-get install -y nodejs
npm install npm -g

# install bower
npm rm --global bower
npm install --global bower

# install gulp
npm rm --global gulp
npm install --global gulp gulp-cli

# add custom .bashrc content to .bashrc
cat /vagrant/provision/home/vagrant/.bashrc >> /home/vagrant/.bashrc

# update after provisioning
apt-get update -y
