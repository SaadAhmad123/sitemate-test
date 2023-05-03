import express, { Request, Response } from 'express'
import startServer from './server.utils/startServer'
import { IssueCreate, IssueDelete, IssueGet, IssueList, IssueUpdate } from './src'

const defaultPort = 3000
const app = express()

app.post("/issues", IssueCreate)
app.get("/issues", IssueList)
app.get("/issues/:id", IssueGet)
app.put("/issues/:id", IssueUpdate)
app.delete("/issues/:id", IssueDelete)

startServer(app, defaultPort)
