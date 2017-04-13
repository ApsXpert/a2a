import {Injectable} from "@angular/core";
import {Subject} from "rxjs";


@Injectable()
export class AppEventEmitterService {

    public notifySidebarFilter = new Subject<any>();

    public notifySidebarFilterObservable$ = this.notifySidebarFilter.asObservable();

    public notifySidebarFilterToOther(data: any) {
        this.notifySidebarFilter.next(data);
    }
}