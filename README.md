# YORICK

Welcome to YORICK, Your Own Relay Interface for Contemplating the Kingdom. yorick is, like Guide/TourGuide, a relay script with the stated design goal of Helping Ascenders Minimizing Losing Extra Turns, by helping them manage resources and track quest progress. Unlike Guide, yorick is/will be written using modern TypeScript frameworks.

## Install

```
git checkout https://github.com/loathers/yorick release
```

You can then activate YORICK from the relay scripts menu in the relay browser.

## Developer Setup

- `cd client && yarn install`
- `cd server && yarn install`
- Copy (don't symlink) `client/KoLmafia/relay/relay_YORICK.js` to your KoLmafia `relay/` directory.
- Copy (don't symlink) `client/KoLmafia/relay/relay_YORICK_Prefs.js` to your KoLmafia `relay/` directory.
- Assuming you're making no server-side changes, `cd server && yarn build`, and copy `server/KoLmafia/relay/yorick.js` to your KoLmafia `relay/` directory (you will need to copy this again if you change the server code).
- In VS Code, in the Run + Debug tab, run the Start Development Server task. Otherwise, `cd client && yarn start`
- Change the website in the Relay browser to the one in the link that just opened (most likely, localhost:3000).
- Run the "YORICK" script in the relay browser. Code updates will be reflected live in the relay browser.
