# -*- mode: ruby -*-
# vi: set ft=ruby :

# todo: https://stackoverflow.com/questions/13065576/override-vagrant-configuration-settings-locally-per-dev

Vagrant.configure("2") do |config|
  config.vm.box = "debian/contrib-buster64"

  # Forward ssh config
  config.ssh.forward_agent = true

  # Provision
  config.vm.provision "shell", inline: <<-SHELL
    mkdir -p ~/node_modules
    mkdir -p /home/vagrant/wjh.dev
    mkdir -p /home/vagrant/wjh.dev/node_modules
    chown vagrant:www-data ~/node_modules
    mount --bind ~/node_modules /home/vagrant/wjh.dev/node_modules
  SHELL
  config.vm.provision :shell, path: "provision.sh", privileged: true

  # Hostname
  config.vm.network :private_network, :ip => "192.168.19.60"
  config.vm.network "private_network", type: "dhcp"

  # Mount directory 
  config.vm.synced_folder ".", "/home/vagrant/wjh.dev", :group => "www-data", :mount_options => ['dmode=775','fmode=664']
  
  # Performance improvements
  #  1. Assign a quarter of host memory and all available CPU's to VM
  #     Depending on host OS this has to be done differently.
  #  2. set --natdnshostresolver1 & --natdnsproxy1 to speed up external connections
  config.vm.provider :virtualbox do |vb|
    host = RbConfig::CONFIG['host_os']

    if host =~ /darwin/
        cpus = `sysctl -n hw.ncpu`.to_i
        mem = `sysctl -n hw.memsize`.to_i / 1024 / 1024 / 4

    elsif host =~ /linux/
        cpus = `nproc`.to_i
        mem = `grep 'MemTotal' /proc/meminfo | sed -e 's/MemTotal://' -e 's/ kB//'`.to_i / 1024 / 4

    # windows:
    else
        cpus = 4
        mem = 2048
    end

    vb.customize ["modifyvm", :id, "--memory", mem]
    vb.customize ["modifyvm", :id, "--cpus", cpus]
    vb.customize ['modifyvm', :id, '--natdnshostresolver1', 'on']
    vb.customize ['modifyvm', :id, '--natdnsproxy1', 'on']
  end

end
