/**
 * This component is for third molar extraction detail
 */

import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {VerticalDetailService} from "../../../vertical-detail/vertical-detail.service";
import {APP} from "../../../../constants/app.constants";
import {CommonFunctionService} from "../../../../common/common-functions.service";
import {AppDataService} from "../../../../services/app_data.service";
import {LogoutService} from "../../../../services/logout.service";
import {Router} from "@angular/router";
import {CenteralHttpService} from "../../../../services/centeral-http.service";
import {URL} from "../../../../constants/constant.urls";

@Component({

    selector: 'third-molar-extraction-detail',
    templateUrl: 'third-molar-extraction-detail.component.html'
})
export class TMEDetailComponent implements OnInit {

    public currentPageNumber: number = APP.PAGINATION.CURRENT_PAGE;
    public orderBy: number;
    public mid: string;
    public loadingPagination = false;
    public trObj: any = {};
    public isExpanded: boolean = false;
    public isCollapsed: boolean = true;
    @Output()
    public toList: EventEmitter<boolean> = new EventEmitter();

    constructor(private vdcService: VerticalDetailService, private appDataService: AppDataService,
                private logout: LogoutService, private router: Router, private centralHttpService: CenteralHttpService) {
    }

    ngOnInit() {
    }

    /**
     * This will emit event when back to list button
     */
    public backToList() {
        this.toList.emit(true);
    }

    /**
     * This method handle pagination
     * @param pageNumber
     */
    public pageChanged(pageNumber: any) {

        this.appDataService.loadingFlag = true;
        this.currentPageNumber = pageNumber;
        this.vdcService.vdRequest.startIndex = (pageNumber * APP.PAGINATION.PER_PAGE) - APP.PAGINATION.PER_PAGE;
        this.vdcService.vdRequest.pagination = true;
        this.centralHttpService.post(URL.THIRD_MOLAR.DOCTOR_REPORTS, this.vdcService.vdRequest)
            .subscribe(
                (data: any) => this.vdcService.setData(data),
                (error: any) => CommonFunctionService.handleError(error, this.router)
            )
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
     * This method resolve image complete url
     * @param path
     * @param name
     * @param extension
     * @returns {string}
     */
    public getImageURL(path: string, name: string, extension: string) {
        return path + name + '.' + extension;
    }

    /**
     * This method set flag to true or false to show or collapse the detail table rows.
     * @param id
     */
    public showTR(id: string) {
        this.trObj[id] = !this.trObj[id];
        if (this.isCollapsed) {
            this.checkIfAllExpand();
        } else {
            this.checkIfAllCollpase();
        }
    }

    /**
     * This method search patient by patient id.
     */
    public searchByMID() {

        this.appDataService.loadingFlag = true;
        this.vdcService.vdRequest.mid = this.mid;
        this.vdcService.vdRequest.startIndex = APP.PAGINATION.START_INDEX;
        this.vdcService.vdRequest.pagination = APP.DATA.EMPTY;

        if (this.mid == "1") {
            this.vdcService.vdRequest.mid = '';
        }

        this.centralHttpService.post(URL.THIRD_MOLAR.DOCTOR_REPORTS, this.vdcService.vdRequest)
            .subscribe(
                (data: any) => this.vdcService.setData(data),
                (error: any) => CommonFunctionService.handleError(error, this.router)
            )
    }

    /**
     * This method sort data by patient id.
     * @param by
     */
    public sortByMID(by: any) {

        this.appDataService.loadingFlag = true;
        this.vdcService.vdRequest.orderBy = this.orderBy;
        this.vdcService.vdRequest.startIndex = APP.PAGINATION.START_INDEX;
        this.vdcService.vdRequest.pagination = APP.DATA.EMPTY;

        this.centralHttpService.post(URL.THIRD_MOLAR.DOCTOR_REPORTS, this.vdcService.vdRequest)
            .subscribe(
                (data: any) => this.vdcService.setData(data),
                (error: any) => CommonFunctionService.handleError(error, this.router)
            )
    }

    /**
     * This method expand all rows of table
     * @param data
     */
    public expandAll(data: any) {
        this.isExpanded = true;
        this.isCollapsed = false;
        for (let report of data) {
            this.trObj[report.stats.mid] = true;
        }
    }

    /**
     * This method collapse all rows of table
     * @param data
     */
    public collapseAll(data: any) {
        this.isExpanded = false;
        this.isCollapsed = true;
        for (let report of data) {
            this.trObj[report.stats.mid] = false;
        }
    }

    /**
     * This method check if all rows are expanded then show the collapse all button
     */
    private checkIfAllCollpase() {
        let allCollapse = true;
        for (var prop in this.trObj) {
            if (this.trObj[prop]) {
                allCollapse = false;
                break;
            }
        }
        if (allCollapse) {
            this.isExpanded = false;
            this.isCollapsed = true;
        } else {
            this.isExpanded = true;
            this.isCollapsed = false;
        }
    }

    /**
     * This method check if all rows are collapsed then show the expand all button
     */
    private checkIfAllExpand() {
        let allExpand = true;
        for (var prop in this.trObj) {
            if (!this.trObj[prop]) {
                allExpand = false;
                break;
            }
        }
        if (allExpand) {
            this.isCollapsed = false;
            this.isExpanded = true;
        } else {
            this.isCollapsed = true;
            this.isExpanded = false;
        }
    }

}