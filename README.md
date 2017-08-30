# Alfred Workflow - Manage Gmail Filters

![](https://user-images.githubusercontent.com/232559/29885279-8761bab6-8db6-11e7-980f-c233b25a24ae.png)

 
Tired of getting spam in your mailbox? Setting up filters the conventional way (via gmail.com > settings > filters) is quite cumbersome. The amount of time and effort keeps me away from doing so. 

That's way I created a simple Alfred Workflow that does this for you using `Google API` over `Oauth2` authentication.

## Requirements

- Node installed and available globally (`$PATH`)
- Alfred Version 3.
- The Alfred Powerpack.
- A Google account (with Gmail)
- [GmailFilters.alfredworkflow](https://github.com/inlet/alfred-workflow-gmail-filters/blob/master/GmailFilters.alfredworkflow?raw=true).

## Setup

This workflow requires API access to Google API. This requires an access token (oauth2). Follow these steps to create and configure this token into the workflow.

1. Install binary

       git clone https://github.com/inlet/alfred-workflow-gmail-filters ~/.alfred-workflow-gmail-filters
       cd ~/.alfred-workflow-gmail-filters
       npm install
    
2. Authenticate with credentials

   Head to [Google API Console > Dashboard](https://console.developers.google.com/apis) and create oath2 credentials.
   Checkout [Step 1: Node Quickstart Tutorial](https://developers.google.com/gmail/api/quickstart/nodejs) for more details.

   Once created, download the `client_secret.json` into `~/.alfred-workflow-gmail-filters` and run:

       node ~/.alfred-workflow-gmail-filters/index.js --list
    
   Copy/paste the url in your browser and create the access token for your Google account. Copy/paste the token into the terminal again and hit `ENTER` to finish to authentication.

    > It stores the token in `token.json` for future requests.

   If everything worked out, you should see the enabled filters listed. With this in place, you can now easily manage gmail filters:

   See `node ~/.alfred-workflow-gmail-filters/index.js --help` for usage.

3. Install the workflow

   Double click on `GmailFilters.alfredworkflow`. Download [here](https://github.com/inlet/alfred-workflow-gmail-filters/blob/master/GmailFilters.alfredworkflow?raw=true)

## Usage

In Alfred, type: `spam example@mail.com`

You should see a notification that the filter is added. Head to [gmail settings](https://gmail.com) and check if the filter is actually added.
