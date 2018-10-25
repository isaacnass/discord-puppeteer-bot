_In order to deploy this you'll need to use a system supporting puppeteer. Most platforms can do this with a couple of commands. For Heroku or Dokku just use this https://github.com/jontewks/puppeteer-heroku-buildpack_

# Prereqs

- Have Chrome installed
- Make a Discord bot
  - Go to https://discordapp.com/developers
  - Make a new app and give it a unique name
  - Note down your CLIENT_ID
  - Go to the bot tab and click "Add Bot"
  - Note down your token
- Add the bot to a Discord server (https://discordapp.com/oauth2/authorize?&client_id=ENTER_YOUR_BOT_CLIENT_ID_HERE&scope=bot&permissions=51200)

# Running

- Add your bot token to index.js
- yarn
- node index.js
- The bot should now appear as online on your Discord server
- Message the bot "testme"
- The fetching process should start!

# Making the bot actually do stuff

- In production you proably want to separate the actual card fetching and the Discord bot. Maybe even render cards every time they're saved. This can be a little complicated to setup as you'll need a job queue and a setup to handle card image requests while their corresponding jobs are queued
- Fetching a card
  - Currently the bot goes to youtube.com and uses a query selector, then takes a picture of that element
  - To populate a card the best way to do this is to expose a route on the frontend that is just a card (with an id on the div) and have the bot go there
  - If you don't want all of your cards to be public facing you could expose expose this as a service and send a payload to it, which is used as an escaped querystring to render the card (i.e. `mintr.io/card-preview?payload=${URLEncodedPayload}`). Here is a nice SO post on this https://stackoverflow.com/questions/3308846/serialize-object-to-query-string-in-javascript-jquery
- Memoization
  - You probably want to upload these files to S3. For the Discord ".attachFile" method you can simply pass a URL string and that will be attached
  - The best way to use this service "on demand" without having to rerender the same card multiple times is to simply name the file based on the record \_id and updatedAt timestamp. If this exists in your S3 bucket then send that over as an attachment instanly
- Linking cards to Discord accounts
  - In the Discord bot management set up an OAuth integration
  - Use something like Passport in your API to make a super simple route that links your internal users to Discord IDs
  - `message.author.id of a message will include the users' Discord IDs, which you simply match to their Mintr account
