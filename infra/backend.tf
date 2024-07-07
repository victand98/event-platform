terraform {
  backend "remote" {
    organization = "event_platform_org"
    workspaces {
      name = "event_platform"
    }
  }
}
