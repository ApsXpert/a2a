/**
 * This class is responsible for emitting event whenever user click logout button
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class LogoutEmitterService {

    public notify = new Subject<boolean>();

    public notifyObservable$ = this.notify.asObservable();

    /**
     * This method is notifying all other services which are registered to logout observable
     * @param logged
     */
    public notifyOther(logged: boolean) {
        if (true === logged) {
            this.notify.next(logged);
        }

    }
}
