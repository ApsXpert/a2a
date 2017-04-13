/**
 * Created by Atif on 1/18/2017.
 */

import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
@Injectable()
export class VerticalEventEmitterService {

    public notifyBackToGraph = new Subject<boolean>();
    public notifyBackToGraphVD = new Subject<boolean>();

    public backGraphNotifyObservable$ = this.notifyBackToGraph.asObservable();
    public backGraphNotifyObservableVD$ = this.notifyBackToGraphVD.asObservable();


    /**
     * This method will emit event when back to graph button is clicked from second level graph page.
     * @param data
     */
    public backGraphNotifyOther(data: boolean) {
        this.notifyBackToGraph.next(data);
    }

    /**
     * This method will emit event when back to graph button is clicked from list or detail pages.
     * @param data
     */
    public backGraphNotifyOtherVD(data: boolean) {
        this.notifyBackToGraphVD.next(data);
    }

}