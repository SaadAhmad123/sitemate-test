# sitemate-test

To test

1. Go to `./backend`
2. Run `yarn install`
3. Run `yarn start`

4. Open an new terminal window
5. Go to `./node-cli-client`
6. Do `yarn install`

In order to perform CRUD operations do the following

```
// Create Issue
yarn client create --title Saad --description Ahmad --port <Check the port int the backend app, by default it is 3000>

// List Issues
yarn client list  --port <Check the port int the backend app, by default it is 3000>

// Get Issue
yarn client get --id <the record id> --port <Check the port int the backend app, by default it is 3000>

// Update Issue
yarn client update --id <the record id> --title Saad12343 --description Ahmad132324 --port <Check the port int the backend app, by default it is 3000>

// Get Delete issue
yarn client delete --id <the record id> --port <Check the port int the backend app, by default it is 3000>
```


Improvement:

- Add field validation in the API 