import { Ball } from './Ball';
import { Player } from './Player';

export interface Game {
    id?: string;
    name: string;
    gameType: string;
    prizes: string;
    slug: string;
    email: string;
}
