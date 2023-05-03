import { Express } from 'express'
import { createServer, Server } from 'http'
import { AddressInfo } from 'net'

/**
 * Starts an Express server on the specified port, incrementing the port number
 * and retrying if the initial port is not available. Logs the server's URL
 * once it starts listening successfully. If an error other than "EADDRINUSE"
 * occurs, it will log the error message.
 *
 * @param app - The Express application to create the server with
 * @param port - The initial port number to attempt to start the server on
 */
const startServer = (app: Express, port: number) => {
  const server: Server = createServer(app)

  server.listen(port, () => {
    console.log(
      `Server is running at http://localhost:${
        (server.address() as AddressInfo).port
      }`,
    )
  })

  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying ${port + 1}`)
      startServer(app, port + 1)
    } else {
      console.error('Error starting server:', error)
    }
  })
}

export default startServer
