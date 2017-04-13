/**
 * This component is for Comprehensive periodontal exam list
 */

import {Component, OnInit} from '@angular/core';
import {VerticalListService} from "../../vertical-list/vertical-list.service";
import {Router} from "@angular/router";
import {LogoutService} from "../../../services/logout.service";
import {VerticalDetailService} from "../../vertical-detail/vertical-detail.service";
import {CenteralHttpService} from "../../../services/centeral-http.service";
import {APP} from "../../../constants/app.constants";
import {URL} from "../../../constants/constant.urls";
import {CommonFunctionService} from "../../../common/common-functions.service";

@Component({
    selector: 'impossible-ages-list',
    templateUrl: 'impossible-ages-list.component.html'
})
export class ImpossibleAgesListComponent implements OnInit {
    public currentPageNumber: number = APP.PAGINATION.CURRENT_PAGE;
    public searchDay: string;
    public searchIndicator: string;
    public loadingPagination = false;

    constructor(private vlService: VerticalListService, private router: Router, private logout: LogoutService,
                private verticalDetailService: VerticalDetailService, private centeralHttpService: CenteralHttpService) {
    }

    ngOnInit() {}

    /**
     * This method handle pagination
     * @param pageNumber
     */
    public pageChanged(pageNumber: any) {
        this.loadingPagination = true;
        this.currentPageNumber = pageNumber;
        this.vlService.vlRequest.startIndex = (pageNumber * APP.PAGINATION.PER_PAGE) - APP.PAGINATION.PER_PAGE;;
        this.vlService.vlRequest.pagination = true;

        this.centeralHttpService.post(URL.IMPOSSIBLE.DOCTOR_YEARLY_REPORTS, this.vlService.vlRequest)
            .subscribe(
                (data: any) => {
                    if (+data.statusCode == APP.CODES.UN_AUTHORIZED || data.success == false) {
                        this.logout.doLogout(APP.MESSAGES.SESSION_EXPIRED);
                    } else {
                        this.vlService.vlcData.procedureList = data.data;
                        this.loadingPagination = false;
                    }
                },
                (error: any) => {
                    CommonFunctionService.handleError(error, this.router);
                }
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
    public dateWiseReport(dos: string, attend: string, color: string) {

        let requestObj: any = {
            dos: dos,
            sectionId: this.vlService.vlRequest.sectionId,
            docId: attend,
            pagination: APP.DATA.EMPTY,
            color : color,
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

        this.vlService.vlRequest.searchDay = this.searchDay;
        this.vlService.vlRequest.startIndex = APP.PAGINATION.START_INDEX;
        this.vlService.vlRequest.pagination = APP.DATA.EMPTY;
        this.centeralHttpService.post(URL.IMPOSSIBLE.DOCTOR_YEARLY_REPORTS, this.vlService.vlRequest)
            .subscribe(
                (data: any) => {
                    if (+data.statusCode == APP.CODES.UN_AUTHORIZED || data.success == false) {
                        this.logout.doLogout(APP.MESSAGES.SESSION_EXPIRED);
                    } else {
                        this.vlService.vlcData.procedureList = data.data;
                        this.vlService.vlcData.count = data.count;
                    }
                },
                (error: any) => CommonFunctionService.handleError(error, this.router)
            )
    }

    /**
     * This method search data by color code.
     */
    public searchByIndicator() {
        this.vlService.vlRequest.searchIndicator = this.searchIndicator;
        this.vlService.vlRequest.startIndex = APP.PAGINATION.START_INDEX;
        this.vlService.vlRequest.pagination = APP.DATA.EMPTY;
        this.centeralHttpService.post(URL.IMPOSSIBLE.DOCTOR_YEARLY_REPORTS, this.vlService.vlRequest)
            .subscribe(
                (data: any) => {
                    if (+data.statusCode == APP.CODES.UN_AUTHORIZED || data.success == false) {
                        this.logout.doLogout(APP.MESSAGES.SESSION_EXPIRED);
                    } else {
                        this.vlService.vlcData.procedureList = data.data;
                        this.vlService.vlcData.count = data.count;
                    }

                },
                (error: any) => CommonFunctionService.handleError(error, this.router)
            )

    }

}