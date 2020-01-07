############################################################
# // USED FOR TESTING LOCALLY - NOT TO BE USED IN CI/CD // #

# authentication via 'az login'
# terraform plan/apply -var-file=./vars.local.tfvars
############################################################

# // Azure variables //
    subscription_id     = "xxx"

# // global variables used for naming resources //
    name_company        = "amido"
    name_project        = "stacks"
    name_component      = "spa"
    name_environment    = "local"
