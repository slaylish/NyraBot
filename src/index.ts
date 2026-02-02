import { OmniClient } from './core/client';
import dotenv from 'dotenv';
dotenv.config();

const client = new OmniClient();
client.start();
