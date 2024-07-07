resource "digitalocean_droplet" "web" {
  image    = "ubuntu-20-04-x64"
  name     = "event-platform"
  region   = "nyc1"
  size     = "s-1vcpu-1gb"
  ssh_keys = [data.digitalocean_ssh_key.terraform.id]

  connection {
    host        = self.ipv4_address
    user        = "root"
    type        = "ssh"
    private_key = file(var.pvt_key)
    timeout     = "2m"
  }

  provisioner "remote-exec" {
    inline = [
      "export PATH=$PATH:/usr/bin",
      # Install nginx
      "sudo apt update",
      "sudo apt install -y nginx",
      # Install docker
      "sudo apt install -y docker.io",
      "sudo systemctl start docker",
      "sudo systemctl enable docker",
      # Install docker-compose
      "sudo apt install -y docker-compose",
      # Create a directory for the app
      "sudo mkdir -p ~/event-platform",
      "touch ~/event-platform/.env.backend",
      "touch ~/event-platform/.env.frontend",
      # Update nginx default site
      "echo '${file("nginx.conf")}' | sudo tee /etc/nginx/sites-available/default",
      "sudo systemctl restart nginx"
    ]
  }
}

resource "digitalocean_project" "event_platform" {
  name        = "Event Platform"
  description = "A platform for managing events"
  purpose     = "Web Application"
  environment = "Production"
  resources   = [digitalocean_droplet.web.urn]
}
