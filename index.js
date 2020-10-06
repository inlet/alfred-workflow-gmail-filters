#!/usr/bin/env node

const fs           = require('fs'),
      path         = require('path'),
      readline     = require('readline'),
      google       = require('googleapis').google,
      OAuth2Client = require('google-auth-library').OAuth2Client,
      program      = require('commander')

const SECRET_PATH = path.resolve(__dirname, 'client_secret.json'),
      TOKEN_PATH  = path.resolve(__dirname, 'token.json'),
      SCOPES      = ['https://www.googleapis.com/auth/gmail.settings.basic']

const gmail = google.gmail('v1');
const filters = gmail.users.settings.filters

const question = (interface, msg) => new Promise(resolve => {
  interface.question(msg, response => resolve(response))
})

async function authorize(credentials) {
  let { client_secret: clientSecret, client_id: clientId, redirect_uris: [redirectUrl] } = credentials.installed

  const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl)

  let token

  try {
    token = fs.readFileSync(TOKEN_PATH, 'utf8')
  } catch (err) {
    token = await getNewToken(oauth2Client)
    storeToken(token)
  }

  oauth2Client.credentials = typeof token === 'string' ? JSON.parse(token) : token
  return oauth2Client
}

async function getNewToken(oauth2Client) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_scope: 'offline',
    scope: SCOPES
  })

  console.log('Authorize this app by visiting this url: ' + authUrl)

  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const code = await question(rl, 'Enter the code from that page here: ')
  rl.close()

  return await getTokenFromOauth2Client(oauth2Client, code)
}

const getTokenFromOauth2Client = (oauth2Client, code) => new Promise((resolve, reject) => {
  oauth2Client.getToken(code, function(err, token) {
    if (err) {
      console.log(`Error while trying to retrieve access token`)
      reject(err)
      return
    }
    resolve(token)
  })
})

function storeToken(token) {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token))
  console.log(`Token stored to ${TOKEN_PATH}`)
}

/// API METHODS

const getFilters = oauth2Client => new Promise((resolve, reject) => {
  filters.list({ auth: oauth2Client, userId: 'me' }, function(err, response) {
    if (err) {
      return reject(err)
    }
    resolve(response)
  })
})

const createFilter = (oauth2Client, criteria, action) => new Promise((resolve, reject) => {
  const options = { criteria, action }
  console.log(`Creating filter...`, options)
  
  filters.create({ auth: oauth2Client, userId: 'me', resource: { ...options } }, {}, (err, response) => {
    if (err) {
      return reject(err)
    }
    resolve(response)
  })
})

// start
async function start() {
  program
    .storeOptionsAsProperties(false)
    .passCommandToAction(false);

  // setup program
  program
    .version('1.0.0')
    .name('alfred-gmail-filters')
    .description('Manage Gmail Filters')
    .option('-l,--list', 'List all filters')
    .option('-c,--criteria [from|to|subject|query|negatedQuery|hasAttachment|excludeChats|size|sizeComparison]',
      'Set criteria')
    .option('-a,--action [addLabelIds|removeLabelIds|forward]', 'Define action')

  program.on('--help', function() {
    console.log('')
    console.log(
      '  Resource reference: https://developers.google.com/gmail/api/v1/reference/users/settings/filters#resource')
    console.log('')
    console.log('  Examples:')
    console.log('')
    console.log('    list filters:')
    console.log('      $ node index --list')
    console.log('')
    console.log('    create filter email to spam:')
    console.log(`      $ node index -c "{ \\"from\\": \\"example@mail.com\\" }" -a "{ \\"addLabelIds\\": [ \\"TRASH\\" ] }"`)
    console.log('')
  })

  program.parse(process.argv)
  const options = program.opts();

  const clientSecret = JSON.parse(fs.readFileSync(SECRET_PATH, 'utf8'))

  // authorize app
  const oauth2Client = await authorize(clientSecret)
  if (options.list) {
    const filters = await getFilters(oauth2Client)
    console.log(JSON.stringify(filters, null, 2))
    return
  }

  if (options.criteria && options.action) {
    let criteria = JSON.parse(options.criteria)
    let action = JSON.parse(options.action)

    const response = await createFilter(oauth2Client, criteria, action)
    console.log(response)
    console.log(`Filter created! `)
    return
  }

  program.help()
}

start()
  .then('Done.')
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
