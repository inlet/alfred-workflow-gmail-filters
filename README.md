# Alfred Workflow - Manage Gmail Filters

## Install

    yarn install https://github.com/inlet/alfred-workflow-gmail-filters ~/.alfred-workflow-gmail-filters

## Creating API credentials

Head to [Google API Console > Dashboard](https://console.developers.google.com/apis)

- `Dashboard` > `Enable APIS AND SERVICES`
- Select `Gmail API` and click on `enable`

Setting up credentials

- `Credentials` > `OAuth consent screen`
- Fill in email and product name

- `Credentials` > `Credentials` > Create credentials > Oauth client ID
- Other > Give it a name and click on `Create`

Download the `client_secret.json` into `~/.alfred-workflow-gmail-filters`

- Click on the Download JSON icon (most right)
- Store it as client_secret.json in ~/.alfred-workflow-gmail-filters

## Use API credentials for alfred workflow

- run `node ~/.alfred-workflow-gmail-filters/index.js --list`
- copy / paste url (shown in terminal) in browser
- select google account to manage filters for > allow
- copy / paste the token in terminal > ENTER


Now it should list all enabled filters for your google account.

See `node ~/.alfred-workflow-gmail-filters/index.js --help` for usage.

## Install alfred workflow

Double click on `GmailFilters.alfredworkflow`

## Usage

Type in alfred: `spam example@mail.com`

You should see a notification that the filter is added. Head to gmail settings (gmail.com) and check if the filter is added.
