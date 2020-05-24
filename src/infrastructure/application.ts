import 'reflect-metadata';
import {injectable, unmanaged} from 'inversify';
import {Server} from "./server";
import express, {raw} from 'express';

@injectable()
export class Application {
    protected liveness = false;
    protected readiness = false;
    protected server: Server;

    constructor(
        @unmanaged() server: Server,
    ) {
        this.server = server;
    }

    start() {
        this.server.app.get("/liveness", this.livenessHandler.bind(this));
        this.server.app.get("/readiness", this.readinessHandler.bind(this));
        this.OnBeforeStart();
        this.server.start();
    }

    getApp() {
        return this.server.app;
    }

    protected livenessHandler(req: express.Request, res: express.Response) {
        if (this.liveness) {
            res.status(200).end();
        } else {
            res.status(500).end();
        }
    }

    protected readinessHandler(req: express.Request, res: express.Response) {
        if (this.liveness) {
            res.status(200).end();
        } else {
            res.status(500).end();
        }
    }

    protected OnBeforeStart(): void {
        // Override for start event
        return;
    }
}
