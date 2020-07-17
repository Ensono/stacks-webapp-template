import Helmet from 'helmet'

const helmetGuard = Helmet({
  frameguard: {
    action: 'same-origin'  
  },
  xssFilter: true,
  hidePoweredBy: true,
//   contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["* 'unsafe-inline 'unsafe-eval'"]
//     }
//   }
})

export default helmetGuard
