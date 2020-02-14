import pact, {CanDeploy, CanDeployPacticipant} from '@pact-foundation/pact-node'
import {provider} from './pactSetup'

const participant: CanDeployPacticipant = {
  name: provider.opts.consumer,
  latest: true,
}

const server = new CanDeploy({
  pacticipants: [participant],
  pactBroker: process.env.PACT_BROKER,
  pactBrokerToken: process.env.PACT_BEARER_TOKEN,
})
  .canDeploy()
  .then((result: any) => {
    // You can deploy this
    // If output is not specified or is json, result describes the result of the check.
    // If outout is 'table', it is the human readable string returned by the check
    console.log(result)
  })
  .catch((error: any) => {
    // You can't deploy this
    // if output is not specified, or is json, error will be an object describing
    // the result of the check (if the check failed),
    // if output is 'table', then the error will be a string describing the output from the binary,

    // In both cases, `error` will be an Error object if something went wrong during the check.
    console.log(`Error reason: ${error.output.summary.reason}`)
  })
