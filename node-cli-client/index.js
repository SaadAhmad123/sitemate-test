const axios = require('axios');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');



const argv = yargs(hideBin(process.argv))
    .option('port', {
        alias: 'p',
        description: 'The port number to connect to the server',
        type: 'number',
        default: 3000,
    })
    .command('create', 'Create a new issue', {
        title: {
            description: 'The title of the issue',
            alias: 't',
            type: 'string',
        },
        description: {
            description: 'The description of the issue',
            alias: 'd',
            type: 'string',
        },
    })
    .command('list', 'List all issues')
    .command('get', 'Get an issue by ID', {
        id: {
            description: 'The ID of the issue',
            alias: 'i',
            type: 'string',
        },
    })
    .command('update', 'Update an issue by ID', {
        id: {
            description: 'The ID of the issue',
            alias: 'i',
            type: 'string',
        },
        title: {
            description: 'The new title of the issue',
            alias: 't',
            type: 'string',
        },
        description: {
            description: 'The new description of the issue',
            alias: 'd',
            type: 'string',
        },
    })
    .command('delete', 'Delete an issue by ID', {
        id: {
            description: 'The ID of the issue',
            alias: 'i',
            type: 'string',
        },
    })
    .help()
    .alias('help', 'h')
    .argv;

const baseURL = `http://localhost:${argv.port}`;
const command = argv._[0];

console.log(baseURL)

switch (command) {
    case 'create':
        console.log(argv.title)
        axios.post(`${baseURL}/issues`, { title: argv.title, description: argv.description }, { headers: { "Content-Type": "application/json" } })
            .then(response => {
                console.log('Issue created:', response.data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
        break;

    case 'list':
        axios.get(`${baseURL}/issues`)
            .then(response => {
                console.log('Issues:', response.data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
        break;

    case 'get':
        axios.get(`${baseURL}/issues/${argv.id}`)
            .then(response => {
                console.log('Issue:', response.data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
        break;

    case 'update':
        axios.put(`${baseURL}/issues/${argv.id}`, { title: argv.title, description: argv.description })
            .then(response => {
                console.log('Issue updated:', response.data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
        break;

    case 'delete':
        axios.delete(`${baseURL}/issues/${argv.id}`)
            .then(() => {
                console.log('Issue deleted');
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
        break;

    default:
        console.log('Invalid command. Run "node client.js --help" for usage information.');
}
