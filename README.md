# Alfred Workflow - Manage Gmail Filters

![](https://user-images.githubusercontent.com/232559/29885279-8761bab6-8db6-11e7-980f-c233b25a24ae.png)

 
Tired of getting spam in your mailbox? Setting up filters with Gmail webinterface (gmail.com > settings > filters) is quite cumbersome. The amount of effort simply keeps me away from doing so. 

This workflow let's you create filters with ease using Alfred.

## Requirements

- Node `v8+`
- Alfred `v3`
- The Alfred Powerpack.
- A Google account (with Gmail)
- [GmailFilters.alfredworkflow](https://github.com/inlet/alfred-workflow-gmail-filters/blob/master/GmailFilters.alfredworkflow?raw=true).

## Setup

This workflow requires API access to Google API over Oauth2. Follow these steps to create and configure an access token:

1. Install binary

       git clone https://github.com/inlet/alfred-workflow-gmail-filters ~/.alfred-workflow-gmail-filters
       cd ~/.alfred-workflow-gmail-filters
       yarn install
    
2. Authenticate with credentials

   Head to [Google API Console > Dashboard](https://console.developers.google.com/apis) and create oath2 credentials.
   Checkout [Step 1: Node Quickstart Tutorial](https://developers.google.com/gmail/api/quickstart/nodejs) for more details.

   Once created, download `client_secret.json` to `~/.alfred-workflow-gmail-filters` and run:

       node ~/.alfred-workflow-gmail-filters/index.js --list
    
   Copy and paste the url in your browser and create the access token for your Google account. Then copy and paste the token into the terminal and hit `ENTER` to finish the authentication.

    > This stores the token in `token.json` for future requests.

   You should see the enabled filters listed now. With this in place, you can now easily manage your Gmail filters.

   See `node ~/.alfred-workflow-gmail-filters/index.js --help` for usage.

3. Install the workflow

   Double click on `GmailFilters.alfredworkflow`. Download [here](https://github.com/inlet/alfred-workflow-gmail-filters/blob/master/GmailFilters.alfredworkflow?raw=true)

## Usage

In Alfred, type: `spam example@mail.com`

You should see a notification that the filter is added.
