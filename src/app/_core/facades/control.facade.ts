import { Injectable } from '@angular/core';
import { Ball } from '../models/Ball';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ControlFacade {
    private ballSubject: BehaviorSubject<Ball[]> = new BehaviorSubject([]);
    public balls$ = this.ballSubject.asObservable();

    newBall(ball: Ball) {
        window.navigator.vibrate([100, 100, 100, 100]);
        this.ballSubject.next([
            ball,
            ...this.balls
        ]);
    }

    get balls() {
        return this.ballSubject.getValue();
    }

    reset() {
        this.ballSubject.next([]);
    }
}
