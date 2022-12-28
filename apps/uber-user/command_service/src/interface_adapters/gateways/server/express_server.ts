import express from 'express';
import { ExpressServerAdapter } from '@uber/shared_kernal/interface_adapters/frameworks/server/express/express_server';

const server = new ExpressServerAdapter(express, 'user');
server.add_middleware(express.json());
server.add_middleware(express.urlencoded());
// add compression & cors middlewares

export { server }; 