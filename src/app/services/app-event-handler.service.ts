/**
 * Created by Atif on 2/9/2017.
 */

import {Injectable, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {AppEventEmitterService} from "./app-event-emitter.service";
import {VerticalModuleService} from "../vertical/services/vertical-module.service";
import {VerticalDetailService} from "../vertical/vertical-detail/vertical-detail.service";
import {APP} from "../constants/app.constants";
import {Router} from "@angular/router";


@Injectable()
export class AppEventHandlerService implements OnDestroy {

    private sideBarFilterSubscription: Subscription;

    constructor(private appEventEmitterService: AppEventEmitterService, private vmService: VerticalModuleService,
                private verticalDetailService: VerticalDetailService, private router: Router) {
        this.sideBarFilterSubscription = this.appEventEmitterService.notifySidebarFilterObservable$
            .subscribe((data: any) => {
                this.verticalDetailService.reachedFlag = true;
                this.sidebarEventHandler(data);
            });
    }

    public ngOnDestroy() {
        this.sideBarFilterSubscription.unsubscribe();
    }

    private sidebarEventHandler(data: any) {
        let requestObj: any = {
            colorCode: '',
            dos: data.dos,
            year: data.yaer,
            month: data.month,
            option: this.vmService.stateData.filterOption,
            sectionId: data.sectionId,
            docId: data.docId,
            pagination: '',
            startIndex: APP.PAGINATION.START_INDEX
        };
        this.verticalDetailService.vdRequest = requestObj;
        localStorage.setItem(APP.STORAGE.VERTICAL_DETAIL, JSON.stringify(requestObj));
        this.router.navigate([APP.NAVIGATION.VERTICAL_DETAIL]);
    }

}