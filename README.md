** YORICK **

Setup:

- `cd client && yarn install`
- `cd server && yarn install`
- Copy (don't symlink) `client/KoLmafia/relay/relay_YORICK_Dev.js` to your KoLmafia `relay/` directory.
- Copy (don't symlink) `client/KoLmafia/relay/relay_YORICK_Prefs.js` to your KoLmafia `relay/` directory.
- Assuming you're making no server-side changes, `cd server && yarn build`, and copy `server/KoLmafia/relay/yorick.js` to your KoLmafia `relay/` directory.
- In VS Code, in the Run + Debug tab, run the Start Development Server task. Otherwise, `cd client && yarn start`
- Run the "YORICK Dev" script in the relay browser. Code updates will be reflected live in the relay browser.
