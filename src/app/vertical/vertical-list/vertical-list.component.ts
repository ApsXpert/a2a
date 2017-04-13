/**
 * Created by Atif on 1/16/2017.
 */

import {Component, OnInit, OnDestroy} from "@angular/core";
import {VerticalListService} from "./vertical-list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VerticalDetailService} from "../vertical-detail/vertical-detail.service";
import {VerticalService} from "../vertical.service";
import {CommonFunctionService} from "../../common/common-functions.service";
import {AppDataService} from "../../services/app_data.service";
import {LogoutService} from "../../services/logout.service";
import {VerticalModuleService} from "../services/vertical-module.service";
import {APP} from "../../constants/app.constants";
import {VerticalSidebarService} from "../vertical-sidebar/services/vertical-sidebar.service";

@Component({
    templateUrl: 'vertical-list.component.html'
})
export class VerticalListComponent implements OnInit, OnDestroy {


    public algos = APP.ALGOS;

    constructor(private ar: ActivatedRoute, private vlService: VerticalListService, private verticalDetailService: VerticalDetailService,
                private router: Router, private verticalService: VerticalService, private appDataService: AppDataService,
                private logout: LogoutService, private vmService: VerticalModuleService, private vsbService: VerticalSidebarService) {

        this.appDataService.graphBackButton = true;
        window.onbeforeunload = ()=> {
            localStorage.setItem(APP.STORAGE.VERTICAL_LIST, JSON.stringify(this.vlService.vlRequest));
        }
        this.appDataService.currentComponent = APP.COMPONENT.VERTICAL_LIST;
    }

    /**
     * This is component init method and will set data to data services which was fetched by
     * resolvers when this component was called.
     */
    ngOnInit() {

        if (false == this.vlService.checkResponse(this.ar.snapshot.data[APP.RESOLVER.VERTICAL_LIST]))
            this.logout.doLogout(APP.MESSAGES.SESSION_EXPIRED);
        

        this.setDataToService(this.ar.snapshot.data[APP.RESOLVER.VERTICAL_LIST]);

        this.vsbService.updateName(this.vlService.vlcData.doctorDetail.attend_last_name + ', ' + this.vlService.vlcData.doctorDetail.attend_first_name
            + ' ' + this.vlService.vlcData.doctorDetail.attend_middle_name);

        let mAddress = this.handleMultipleAddresses(this.vlService.vlcData.doctorDetail.multiple_address);
        if (mAddress.flag == true)
            this.vlService.doctorAddress = mAddress.address;
        else
            this.vlService.doctorAddress = [];


        this.appDataService.loadingFlag = false;
    }

    /**
     * This is component destroy method and set the data to local storage.
     */
    ngOnDestroy() {
        localStorage.setItem(APP.STORAGE.VERTICAL_LIST, JSON.stringify(this.vlService.vlRequest));
    }

    /**
     * This method sets the data to services
     * @param data
     */
    private setDataToService(data: any) {

        this.verticalService.setSideMenuAlgosGroup(data[4].group, data[4].data);
        this.vlService.vlcData.doctorDetail = data[0].data[0];
        this.vlService.vlcData.topDetail = data[1].data;
        this.vlService.vlcData.doctorSpecialty = data[2].data[0];
        this.vlService.vlcData.procedureList = data[3].data;
        this.vlService.vlcData.count = data[3].count;

        if (this.vlService.vlRequest.sectionId == APP.ALGOS.OVERREACTIVE)
            this.vlService.vlcData.patients = data[5].data;


        if (this.vlService.vlRequest.sectionId == APP.ALGOS.PATIENT_IN_CHAIR)
            this.vlService.vlcData.topDetail.tTime = +this.vlService.vlcData.topDetail.final_time + +this.vlService.vlcData.topDetail.fill_time;

    }

    /**
     * This method will store the doctor multiple addresses into array
     * @param addresses
     * @returns {any}
     */
    private handleMultipleAddresses(addresses: string): any {

        if ('' == addresses || null == addresses || undefined == addresses) {
            return {
                flag: false,
                address: ''
            }
        }

        let split = addresses.split('|');
        return {
            flag: true,
            address: split
        }
    }

}