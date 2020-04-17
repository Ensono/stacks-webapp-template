import Helmet from 'helmet'

const helmetGuard = Helmet({
  frameguard: false,
  xssFilter: true,
  hidePoweredBy: true
})
export default helmetGuard
