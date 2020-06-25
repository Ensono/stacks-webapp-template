# Identity

- [Auth0](https://auth0.com/) is the Identity-as-a-Service (IDaaS) used in the
  stacks demo.
- [PassportJS](http://www.passportjs.org/) lib for state management on Node.
- [Redis](https://redis.io/) DB is used for passport session management.

## Implementation detail

The stacks demo is built using
[Passport-auth0](http://www.passportjs.org/packages/passport-auth0/) strategy.

### How to enable authentication

```bash
npx cross-env AUTH0_BASE_URL= \
AUTH0_CLIENT_ID= \
AUTH0_DOMAIN= \
AUTH0_CLIENT_SECRET= \

```

## Reference

- [Auth0 Passport blog](https://auth0.com/blog/create-a-simple-and-secure-node-express-app/)
- [Redis quick start](https://redis.io/topics/quickstart)
