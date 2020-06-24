# Importing and exporting content with the Contentful CLI

## Requirements

* A (free) [Contentful account](https://www.contentful.com/sign-up/)
* Locally [installed](https://www.contentful.com/developers/docs/tutorials/cli/installation/) contentful-cli
* [Authenticated](https://www.contentful.com/developers/docs/tutorials/cli/authentication/) with contentful-cli

See [Contentful](https://www.contentful.com/) for more information.

## Set the default local to en-GB

You can change the local in Contentful, note that default in Contentful is en-US:

![Contentful Management Token](https://amidostacksassets.blob.core.windows.net/docs/assets/contentful_locales.png)

## Set up the tokens

Get the tokens from your account, ensuring that you have created a new management access token.

![Contentful Management Token](https://amidostacksassets.blob.core.windows.net/docs/assets/contentful_mt.png)

![Contentful Access Token](https://amidostacksassets.blob.core.windows.net/docs/assets/contentful_access_keys.png)

```bash
export CONTENTFUL_MT= \
export NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN= \
export NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN= \
export NEXT_PUBLIC_CONTENTFUL_SPACE_ID=
```

## Importing content with the Contentful CLI

We have provided an example export of the Blog model used with Amido Stacks, supporting:

* locals
* translations (en-GB, it-IT)

For an example of how this is used in the Server Side Rendered Webapp, see [our deployed server side rendered solution](https://app.nonprod.amidostacks.com/web/stacks/blog)

After you have the import CLI tool installed and have configured your environment, and at the command line:

/Users/estherlloyd/Documents/Github/stacks/stacks-webapp-template/packages/scaffolding-cli/templates/shared/cms

`contentful space import --content-file contentful-export-amidostacks-example.json --mt $CONTENTFUL_MT --space-id $NEXT_PUBLIC_CONTENTFUL_SPACE_ID`

This will then populate your space with the Stacks blog posts, following the model, ensuring that you can get going faster.
