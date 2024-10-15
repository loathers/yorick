# YORICK

Welcome to YORICK, Your Own Relay Interface for Contemplating the Kingdom. yorick is, like Guide/TourGuide, a relay script with the stated design goal of Helping Ascenders Minimizing Losing Extra Turns, by helping them manage resources and track quest progress. Unlike Guide, yorick is/will be written using modern TypeScript frameworks.

## Install

```
git checkout loathers/yorick release
```

You can then activate YORICK from the relay scripts menu in the relay browser.

## Developer Setup

- `yarn install`
- Copy (don't symlink) `KoLmafia/relay/relay_YORICK.js` to your KoLmafia `relay/` directory.
- Copy (don't symlink) `KoLmafia/relay/relay_YORICK_Prefs.js` to your KoLmafia `relay/` directory.
- In VS Code, in the Run + Debug tab, run the Start Development Server task. Otherwise, `yarn start`
- Open the relay browser using the following link: http://localhost:3000/game.php.
- Run the "YORICK" script in the relay browser. Code updates will be reflected live in the relay browser.
