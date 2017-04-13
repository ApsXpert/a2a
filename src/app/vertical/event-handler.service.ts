/**
 * Created by Atif on 1/24/2017.
 */

import {Injectable, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {VerticalEventEmitterService} from "./event-emitter.service";
import {Router} from "@angular/router";
import {VerticalModuleService} from "./services/vertical-module.service";
import {AppDataService} from "../services/app_data.service";
import {APP} from "../constants/app.constants";
import {CommonFunctionService} from "../common/common-functions.service";

@Injectable()
export class EventHandlerService implements OnDestroy {

    private backGraphSubscription: Subscription;

    constructor(private eventEmitterService: VerticalEventEmitterService,
                private router: Router, private vmService: VerticalModuleService,
                private _appDataService: AppDataService) {

        this.backGraphSubscription = this.eventEmitterService.backGraphNotifyObservableVD$
            .subscribe((data: boolean) => {
                this.handleBackGraph();
            });
    }

    /**
     * This method will be called automatically and unsubscribe registered Subscription.
     */
    public ngOnDestroy() {
        this.backGraphSubscription.unsubscribe();
    }

    /**
     * This method will handle back to graph from list or detail pages.
     */
    private handleBackGraph() {

        if (this.vmService.stateData.sectionId == 0) {
            let componentData = CommonFunctionService.getComponentState();

            if (componentData) {
                this.vmService.stateData.sectionId = componentData.sectionId;
                this.vmService.stateData.paramYear = componentData.year;

            } else {
                this.router.navigate([APP.NAVIGATION.DASHBOARD]);
            }
        }
        this.vmService.stateData.pageRefresh.flag = true;

        if (this._appDataService.currentComponent == APP.COMPONENT.IMPOSSIBLE_DETAIL) {
            this._appDataService.currentComponent = APP.COMPONENT.VERTICAL;
            this.router.navigate([APP.NAVIGATION.IMPOSSIBLE + this.vmService.stateData.currentModuleId]);
        } else {
            this._appDataService.currentComponent = APP.COMPONENT.VERTICAL;

            if (this.vmService.stateData.visitOption == 1)
                this.router.navigate([APP.NAVIGATION.AXIOMATIC + this.vmService.stateData.sectionId + '/' + this.vmService.stateData.paramYear]);

            else if (this.vmService.stateData.visitOption == 2)
                this.router.navigate([APP.NAVIGATION.AXIOMATIC + this.vmService.stateData.currentModuleId]);

        }
    }

}