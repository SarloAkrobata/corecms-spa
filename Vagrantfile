# -*- mode: ruby -*-
# vi: set ft=ruby :

# The following vagrant plugins are required:
# - vagrant-bindfs
# - vagrant-hostmanager
# - vagrant-winnfsd (Windows only)

Vagrant.configure("2") do |config|

    # Base configuration
    config.vm.box = "ubuntu/bionic64"
    config.vm.box_version = "20190529.0.0"

    staticIpAddress = "192.168.33.11"
    httpPortForwardingHost = "8080"
    config.vm.hostname = "spa.corecms.test"
    
	config.ssh.insert_key = false

    config.vm.network "private_network", type: "dhcp"
    config.vm.provider "virtualbox" do |vb|
        vb.memory = 1500
        vb.cpus = 2
    end

    # Synchronization
    config.vm.synced_folder ".", "/vagrant", disabled: true
    config.vm.synced_folder ".", "/var/nfs", type: "nfs"


    config.bindfs.bind_folder "/var/nfs", "/vagrant",
        perms: "u=rwX:g=rwX:o=rD"
    config.bindfs.bind_folder "/var/nfs", "/var/www/html",
        perms: "u=rwX:g=rwX:o=rD", force_user: "vagrant", force_group: "www-data"

    # Hostmanager
    config.hostmanager.enabled = true
    config.hostmanager.manage_host = true
    config.hostmanager.manage_guest = true
    config.hostmanager.ignore_private_ip = false
    config.hostmanager.include_offline = true

    config.vm.define "default" do |node|
        node.vm.network :private_network, ip: staticIpAddress
        node.vm.network :forwarded_port, guest: 80, host: httpPortForwardingHost
    end

    # Provider Scripts

    # Run once
    config.vm.provision "shell", run: "once", name: "install-dependencies", inline: <<-SHELL
	cd /vagrant
	sudo apt install -y nodejs
	sudo apt install -y npm
	npm install
    SHELL

end
