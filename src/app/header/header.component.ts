/**
 * This component class of header and contains method for event handling related to header
 */

import {Component} from '@angular/core';
import {LogoutEmitterService} from '../services/logout_emmiter.service';
import {DashboardService} from "../dashboard/dashboard.service";
import {URL} from "../constants/constant.urls";
import {AppDataService} from "../services/app_data.service";
import {VerticalEventEmitterService} from "../vertical/event-emitter.service";
import {CommonFunctionService} from "../common/common-functions.service";
import {VerticalService} from "../vertical/vertical.service";
import {Router} from "@angular/router";
import {CenteralHttpService} from "../services/centeral-http.service";

@Component({
    selector: 'fds-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent{

    constructor(private logoutEmitterService: LogoutEmitterService, public _dashboardService: DashboardService,
                private centeralHttpService: CenteralHttpService, private _appDataService: AppDataService,
                private verticalEventEmitterService: VerticalEventEmitterService,
                private vService: VerticalService, private router: Router) {

        this.centeralHttpService
            .get(URL.ACTIVE_TABS)
            .subscribe(
                (data: any) => {
                    if (+data.statusCode == 401 || data.success == false) {
                        this.logoutEmitterService.notifyOther(true);
                    } else {
                        this._dashboardService.setTabs(data.data);
                    }
                },
                (error: any)=> CommonFunctionService.handleError(error, this.router)
            )
    }

    logout() {
        this.logoutEmitterService.notifyOther(true);
    }

    public backToGraph() {

        if (this._appDataService.currentComponent == 'V') {
            this.verticalEventEmitterService.backGraphNotifyOther(true);
        } else {
            this.verticalEventEmitterService.backGraphNotifyOtherVD(true);
        }
    }
}
