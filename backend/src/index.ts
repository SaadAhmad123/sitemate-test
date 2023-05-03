import { LocalDataStore } from "./datastore/local";
import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'


const dataStore = new LocalDataStore<Issue>()

// endpoint POST /issues
export const IssueCreate = (req: Request, res: Response) => {
    const { title, description } = req.body;
    const newIssue: Issue = { id: uuidv4(), title, description };
    dataStore.create(newIssue)
    res.status(201).json(newIssue);
}

// endpoint GET /issues/
export const IssueList = (req: Request, res: Response) => {
    res.status(200).json(dataStore.list());
}

// endpoint GET /issues/:id
export const IssueGet = (req: Request, res: Response) => {
    const { id } = req.params;
    const issue = dataStore.read(id || "")
    if (issue) {
        res.json(issue);
    } else {
        res.status(404).send('Issue not found');
    }
}

// endpoint PUT /issues/:id
export const IssueUpdate = (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const issue = dataStore.update(id || "", { title, description });
    if (issue) {
        res.status(200).json(issue);
    } else {
        res.status(404).send('Issue not found');
    }
}

// endpoint DELETE /issues/:id
export const IssueDelete = (req: Request, res: Response) => {
    const { id } = req.params;
    dataStore.del(id || "")
    res.status(204).send();
}