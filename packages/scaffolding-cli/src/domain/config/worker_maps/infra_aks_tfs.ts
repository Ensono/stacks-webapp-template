export const responseMessage = (projectName: string): string  => {
    return `Your directory has been created succesfully! \n
The recommended way to test and bootstrap infrastructure locally is to use the docker containers that the pipeline uses. \n
---- \n
cd ${projectName}/deploy/azure/infra \n
docker run -v $(pwd):/usr/data --rm -it amidostacks/ci-tf:0.0.3 /bin/bash \n 
$root: terraform init
$root: terraform plan
---- \n
You will want to export all required environment variables inside that container,  and create a local tfvars and backend tfvars files with relevant values for your company/projet, to read more about the local setup visit the amido/stacks github page. \n
Otherwise you can run it straight in the pipeline.`
}
