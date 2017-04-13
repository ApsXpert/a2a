/**
 * Created by Atif on 1/12/2017.
 */

import {Component, OnInit, OnDestroy} from '@angular/core';
import {VerticalDetailService} from "./vertical-detail.service";
import {ActivatedRoute, Router} from "@angular/router";
import {VerticalService} from "../vertical.service";
import {AppDataService} from "../../services/app_data.service";
import {LogoutService} from "../../services/logout.service";
import {VerticalModuleService} from "../services/vertical-module.service";
import {APP} from "../../constants/app.constants";
import {VerticalSidebarService} from "../vertical-sidebar/services/vertical-sidebar.service";


@Component({
    templateUrl: 'vertical-detail.component.html'
})
export class VerticalDetailComponent implements OnInit, OnDestroy {

    public algos = APP.ALGOS;

    constructor(private ar: ActivatedRoute, private vdcService: VerticalDetailService,
                private verticalService: VerticalService, private router: Router,
                private appDataService: AppDataService, private logout: LogoutService,
                private vmService: VerticalModuleService, private vsbService: VerticalSidebarService) {

        this.ar.params.subscribe(
            (param: any) => {
                this.vdcService.dos = param[APP.PARAM.VERTICAL.DOS] == undefined ? APP.DATA.EMPTY : param[APP.PARAM.VERTICAL.DOS];
                this.vdcService.detailFlag = param[APP.PARAM.VERTICAL.FLAG] == undefined ? false : param[APP.PARAM.VERTICAL.FLAG];
            });

        this.appDataService.graphBackButton = true;

        window.onbeforeunload = ()=>
            localStorage.setItem(APP.STORAGE.VERTICAL_DETAIL, JSON.stringify(this.vdcService.vdRequest));


        this.appDataService.currentComponent = APP.COMPONENT.VERTICAL_DETAIL;
    }

    /**
     * This is component init method and will set data to data services which was fetched by
     * resolvers when this component was called.
     */
    ngOnInit() {

        // if (this.vdcService.checkResponse(this.ar.snapshot.data[APP.RESOLVER.VERTICAL_DETAIL]))
        //     this.logout.doLogout(APP.MESSAGES.SESSION_EXPIRED);

        this.setDataToService(this.ar.snapshot.data[APP.RESOLVER.VERTICAL_DETAIL]);
        let mAddress = this.handleMultipleAddresses(this.vdcService.vdcData.doctorDetail.multiple_address);
        if (mAddress.flag == true)
            this.vdcService.doctorAddress = mAddress.address;
        else
            this.vdcService.doctorAddress = [];

        this.appDataService.loadingFlag = false;
    }

    /**
     * This is component destroy method and clear the local storage.
     */
    ngOnDestroy() {
        this.vdcService.reachedFlag = false;
        localStorage.setItem(APP.STORAGE.VERTICAL_DETAIL_FLAG, APP.DATA.EMPTY);
    }


    /**
     * This method sets the data to services
     * @param data
     */
    private setDataToService(data: any) {


        if (this.vdcService.vdRequest.sectionId != APP.ALGOS.CODE_DISTRIBUTION) {
            this.vdcService.vdcData.doctorDetail = data[0].data[0];
            this.vdcService.vdcData.topDetail = data[1].data;
            this.vdcService.vdcData.doctorSpecialty = data[2].data[0];
            this.vdcService.vdcData.doctorReports = data[3].data;
            this.vdcService.vdcData.count = data[3].count;

            if (this.vdcService.vdRequest.sectionId == APP.ALGOS.OVERREACTIVE)
                this.verticalService.setSideMenuAlgosGroup(data[4].group, data[4].data);
            else {
                this.vdcService.vdcData.patients = data[4].data;
                this.verticalService.setSideMenuAlgosGroup(data[5].group, data[5].data);
            }

            if (+this.vdcService.vdRequest.sectionId == APP.ALGOS.PATIENT_IN_CHAIR || +this.vdcService.vdRequest.sectionId == APP.ALGOS.DOCTOR_WITH_PATIENT)
                this.vdcService.vdcData.procedure = data[6].data[0];


            this.vsbService.updateName(this.vdcService.vdcData.doctorDetail.attend_last_name + ', ' + this.vdcService.vdcData.doctorDetail.attend_first_name
                + ' ' + this.vdcService.vdcData.doctorDetail.attend_middle_name);
        }

    }

    /**
     * This method handle back to list event.
     * @param event
     */
    public backToList(event: any) {
        this.router.navigate([APP.NAVIGATION.VERTICAL_LIST])
    }

    /**
     * This method will store the doctor multiple addresses into array
     * @param addresses
     * @returns {any}
     */
    private handleMultipleAddresses(addresses: string): any {

        if (!addresses) {
            return {
                flag: false,
                address: APP.DATA.EMPTY
            }
        }

        let split = addresses.split('|');
        return {
            flag: true,
            address: split
        }
    }

}