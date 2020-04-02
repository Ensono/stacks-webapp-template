## Getting started

you can get a basic react system up and running extremely quickly by following these steps.

1. Create an NPM account, if you don't have one and get an NPM token.

2. Export your NPM token to the environment variable NPM_TOKEN.

3. Make a directory/folder with the name of your project.

4. navigate to the directory/folder you've just created.

5. Run this command: `npx @amidostacks/scaffolding-cli@1.20.0 run -i`
   * Follow the steps
   * The defaults should work if you just wanna look at something.

6. You should now see 1 file and 1 directory/folder
   * file: `<project name>-bootstrap-config.json`
   * directory/folder: `<project name>`

7. Navigate into the newly created project director/folder and then the `src` directory/folder from there
   * `<project name>/src`

8. confirm that port 3000 is free
   * MACOS: `sudo lsof -i -n -P | grep TCP | grep 3000`
   * LINUX: `sudo netstat -tlpun`
   * WINDOWS: `netstat -n -a –o`
     * I'm not 100% sure about windows I had to look this up on the web

9. run these commands in the following order
```bash
npm install
npm run build
npm run start
```

A browser window should open up and automatically havigate you to the correct place but if not go to 1 of the following URLs

```
http://localhost:3000
http://localhost:3000
```

You should now see an empty react site and have some code to play around with, enjoy yourself :).

10. If you'd like to do something from scratch follow this readme `packages/template-cli/README.md`.