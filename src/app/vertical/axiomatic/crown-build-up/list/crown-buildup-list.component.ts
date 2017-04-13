/**
 * Created by Atif on 1/31/2017.
 */

import {Component, OnInit} from '@angular/core';
import {VerticalListService} from "../../../vertical-list/vertical-list.service";
import {Router} from "@angular/router";
import {APP} from "../../../../constants/app.constants";
import {CommonFunctionService} from "../../../../common/common-functions.service";
import {LogoutService} from "../../../../services/logout.service";
import {VerticalDetailService} from "../../../vertical-detail/vertical-detail.service";
import {CenteralHttpService} from "../../../../services/centeral-http.service";
import {URL} from "../../../../constants/constant.urls";

@Component({
    selector: 'crown-buildup-list',
    templateUrl: 'crown-buildup-list.component.html'
})
export class CBUListComponent implements OnInit {
    public currentPageNumber: number = APP.PAGINATION.CURRENT_PAGE;
    public searchDay: string;
    public searchIndicator: string;
    public loadingPagination = false;

    constructor(private vlService: VerticalListService, private router: Router, private logout: LogoutService,
                private verticalDetailService: VerticalDetailService, private centeralHttpService: CenteralHttpService) {
    }

    ngOnInit() {
    }

    /**
     * This method handle pagination
     * @param pageNumber
     */
    public pageChanged(pageNumber: any) {
        this.loadingPagination = true;
        this.currentPageNumber = pageNumber;
        this.vlService.vlRequest.startIndex = (pageNumber * APP.PAGINATION.PER_PAGE) - APP.PAGINATION.PER_PAGE;
        this.vlService.vlRequest.pagination = true;
        this.centeralHttpService.post(URL.CROWN_BUILD_UP.DOCTOR_YEARLY_REPORTS, this.vlService.vlRequest)
            .subscribe(
                (data: any) => {
                    this.vlService.setData(data);
                    this.loadingPagination = false;
                },
                (error: any) => CommonFunctionService.handleError(error, this.router)
            )
    }

    /**
     * This method resolve image complete url
     * @param name
     * @param extension
     * @returns {string}
     */
    public getImageUrl(name: string, extension: string) {
        let path = APP.PATH.IMAGES;
        return path + name + '.' + extension;
    }

    /**
     * This method activate date wise detail state
     * @param dos
     * @param attend
     */
    public dateWiseReport(dos: string, attend: string) {

        let requestObj: any = {
            dos: dos,
            sectionId: this.vlService.vlRequest.sectionId,
            docId: attend,
            pagination: APP.DATA.EMPTY,
            startIndex: APP.PAGINATION.START_INDEX
        };

        this.verticalDetailService.vdRequest = requestObj;
        this.router.navigate([APP.NAVIGATION.VERTICAL_DETAIL + '/' + dos.replace('/', '-').replace('/', '-')]);
    }

    /**
     * This method return serial number on page bases.
     * @param index
     * @returns {number}
     */
    public getSrNo(index: number) {
        return ((this.currentPageNumber * APP.SERIAL.NUMBER) - APP.SERIAL.NUMBER) + index + APP.SERIAL.PAGE;
    }


    /**
     * This method search data by date.
     */
    public searchByDay() {

        this.currentPageNumber = APP.PAGINATION.CURRENT_PAGE;
        this.loadingPagination = true;
        this.vlService.vlRequest.searchDay = this.searchDay;
        this.vlService.vlRequest.startIndex = APP.PAGINATION.START_INDEX;
        this.vlService.vlRequest.pagination = APP.DATA.EMPTY;
        this.centeralHttpService.post(URL.CROWN_BUILD_UP.DOCTOR_YEARLY_REPORTS, this.vlService.vlRequest)
            .subscribe(
                (data: any) => {
                    this.vlService.setData(data);
                    this.loadingPagination = false;
                },
                (error: any) => CommonFunctionService.handleError(error, this.router)
            )
    }

    /**
     * This method search data by color code.
     */
    public searchByIndicator() {
        this.currentPageNumber = APP.PAGINATION.CURRENT_PAGE;
        this.loadingPagination = true;
        this.vlService.vlRequest.searchIndicator = this.searchIndicator;
        this.vlService.vlRequest.startIndex = APP.PAGINATION.START_INDEX;
        this.vlService.vlRequest.pagination = APP.DATA.EMPTY;
        this.centeralHttpService.post(URL.CROWN_BUILD_UP.DOCTOR_YEARLY_REPORTS, this.vlService.vlRequest)
            .subscribe(
                (data: any) => {
                    this.vlService.setData(data);
                    this.loadingPagination = false;
                },
                (error: any) => CommonFunctionService.handleError(error, this.router)
            )

    }

}