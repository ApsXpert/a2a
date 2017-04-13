/**
 * Created by Atif on 1/18/2017.
 */

import {Injectable} from '@angular/core';
import {CommonFunctionService} from "../../common/common-functions.service";
import {LogoutService} from "../../services/logout.service";
import {VerticalModuleService} from "./vertical-module.service";
import {VerticalService} from "../vertical.service";
import {APP} from "../../constants/app.constants";
import {VerticalSidebarService} from "../vertical-sidebar/services/vertical-sidebar.service";

@Injectable()
export class VerticalHandlerService {


    constructor(private logout: LogoutService, private vmService: VerticalModuleService,
                private vService: VerticalService, private vsbService: VerticalSidebarService) {
    }

    /**
     * This method is called from ngOnInit of vertical component and this method will
     * do initializing task for vertical component.
     * This method is taking reference of vertical component as argument
     * @param vc
     */
    public onVerticalInit(vc: any) {

        this.vmService.stateData.currentModuleName = vc.router.url.split("/")[1];
        vc.activatedRoute.params.subscribe((param: any) => this.handleParam(param));

        if (this.checkResponse(vc.activatedRoute.snapshot.data))
            this.logout.doLogout(APP.MESSAGES.SESSION_EXPIRED);

        vc.verticalService.setSideMenuAlgosGroup(vc.activatedRoute.snapshot.data[APP.RESOLVER.AXIOMATIC_DATA][0].group,
            vc.activatedRoute.snapshot.data[APP.RESOLVER.AXIOMATIC_DATA][0].data);
        vc._appDataService.dashboardSideMenuYears = vc.activatedRoute.snapshot.data[APP.RESOLVER.AXIOMATIC_DATA][1].data;

        vc.onPageRefresh();


    }

    /**
     * This method handle statistical section
     * @param vc
     */
    public handleStatistical(vc: any) {

        vc.isLoading = true;
        this.vmService.stateData.yearOption = true;
        this.vmService.stateData.monthOption = true;
        this.vmService.stateData.dayOption = false;
        this.vmService.stateData.filterOption = APP.FILTER_OPTIONS.MONTH;

        let postObject: any = {
            date_of_service: this.vmService.stateData.month + "/" + this.vmService.stateData.day + "/" + this.vmService.stateData.year,
            opetions: this.vmService.stateData.filterOption,
            month: this.vmService.stateData.month,
            filterYear: this.vmService.stateData.year,
            year: this.vmService.stateData.year,
            day: this.vmService.stateData.day,
            sectionId: this.vmService.stateData.sectionId,
            filter_options_temp: this.vmService.stateData.filterOption
        }

        if (vc.isDisble())
            postObject.opetions = APP.FILTER_OPTIONS.YEAR;

        this.vmService.stateData.firstGraphRequest = postObject;
        this.vmService.stateData.firstGraph = true;

        this.getDoctorProcedures(vc, postObject);
        this.getGraphDataForStatistical(vc, postObject);

    }

    /**
     * This method get doctor procedures from backend for statistical
     * @param vc
     * @param body
     */
    private getDoctorProcedures(vc: any, body: any) {
        this.vService.getDoctorProcedures(body)
            .subscribe(
                (data: any) => {
                    this.vsbService.algoId = this.vmService.stateData.sectionId;
                    this.vsbService.procedures = data.data;
                },
                (error: any) => CommonFunctionService.handleError(error, vc.router)
            )
    }

    /**
     * This method get graph data from backend for statistical
     * @param vc
     * @param body
     */
    private getGraphDataForStatistical(vc: any, body: any) {
        this.vService.getGraphDataForStatistical(body)
            .subscribe(
                (data: any) => {
                    this.drawGraph(data, vc);
                    vc._appDataService.graphBackButton = false;
                },
                (error: any) => CommonFunctionService.handleError(error, vc.router)
            )
    }

    /**
     * This method get url parameter and set these parameter to data service
     * @param param
     */
    private handleParam(param: any) {

        this.vmService.stateData.visitOption = 1;
        this.vmService.stateData.paramYear = param[APP.PARAM.VERTICAL.YEAR];
        this.vmService.stateData.year = param[APP.PARAM.VERTICAL.YEAR];
        this.vmService.stateData.sectionId = param[APP.PARAM.VERTICAL.SECTION_ID];

        if (param[APP.PARAM.MODULE_ID]) {
            this.vmService.stateData.visitOption = 2;
            this.vmService.stateData.currentModuleId = param[APP.PARAM.MODULE_ID];
        }

        this.setDates();
    }

    /**
     * This method set the default dates in filter options
     */
    private setDates() {
        var date = new Date();
        this.vmService.stateData.paramYear = date.getFullYear() - 2;
        this.vmService.stateData.year = date.getFullYear() - 2;
        this.vmService.stateData.month = date.getMonth() + 1;
        this.vmService.stateData.day = date.getDate() - 1;
    }

    /**
     * This method check if data is valid or not
     * @param data
     * @returns {boolean}
     */
    private checkResponse(data: any) {

        if(data.length < 2)
            return true;

        return ((+data[APP.RESOLVER.AXIOMATIC_DATA][0].statusCode == APP.CODES.UN_AUTHORIZED
        || !data[APP.RESOLVER.AXIOMATIC_DATA][0].success)
        || (+data[APP.RESOLVER.AXIOMATIC_DATA][1].statusCode == APP.CODES.UN_AUTHORIZED
        || !data[APP.RESOLVER.AXIOMATIC_DATA][1].success));
    }

    /**
     * This method will set option and flag variable when filter option is selected [day, month, year]
     * @param vc
     * @param filterOption
     */
    public changeFilterOption(vc: any, filterOption: number) {

        switch (+filterOption) {
            case APP.FILTER_OPTIONS.DAY:
                this.vmService.stateData.yearOption = true;
                this.vmService.stateData.monthOption = true;
                this.vmService.stateData.dayOption = true;
                this.vmService.stateData.filterOption = APP.FILTER_OPTIONS.DAY;
                break;
            case APP.FILTER_OPTIONS.MONTH:
                this.vmService.stateData.yearOption = true;
                this.vmService.stateData.monthOption = true;
                this.vmService.stateData.dayOption = false;
                this.vmService.stateData.filterOption = APP.FILTER_OPTIONS.MONTH;
                break;
            case APP.FILTER_OPTIONS.YEAR:
                this.vmService.stateData.yearOption = true;
                this.vmService.stateData.monthOption = false;
                this.vmService.stateData.dayOption = false;
                this.vmService.stateData.filterOption = APP.FILTER_OPTIONS.YEAR;
                break;
        }
    }

    /**
     * This method is responsible for fetching data on the base of selected filter options.
     * @param vc
     */
    public filterData(vc: any) {
        vc.isLoading = true;
        let postObject: any = {
            date_of_service: this.vmService.stateData.month + "/" + this.vmService.stateData.day + "/" + this.vmService.stateData.year,
            opetions: this.vmService.stateData.filterOption,
            month: this.vmService.stateData.month,
            filterYear: this.vmService.stateData.year,
            year: this.vmService.stateData.year,
            day: this.vmService.stateData.day,
            sectionId: this.vmService.stateData.sectionId,
            filter_options_temp: this.vmService.stateData.filterOption
        }

        if (vc.isDisble())
            postObject.opetions = APP.FILTER_OPTIONS.YEAR;

        this.vmService.stateData.firstGraphRequest = postObject;
        this.vmService.stateData.firstGraph = true;
        this.vService.getGraphData(postObject)
            .subscribe(
                (data: any) => {
                    this.drawGraph(data, vc);
                    vc._appDataService.graphBackButton = false;
                },
                (error: any) => CommonFunctionService.handleError(error, vc.router)
            )
    }

    /**
     * This method will fetch data from server for second level graph.
     * @param vc
     * @param minProcedure
     * @param maxProcedure
     * @param minIncome
     * @param maxIncome
     * @param colorCode
     * @param filterOption
     * @param year
     * @param totalDoctors
     * @returns {number}
     */
    public drawNextGraph(vc: any, minProcedure: any, maxProcedure: any, minIncome: any, maxIncome: any, colorCode: any, filterOption: any, year: any, totalDoctors: number) {

        vc.isLoading = true;

        let requestObj: any = {
            colorCode: colorCode,
            dos: this.vmService.stateData.month + "/" + this.vmService.stateData.day + "/" + this.vmService.stateData.year,
            year: this.vmService.stateData.year,
            month: this.vmService.stateData.month,
            option: this.vmService.stateData.filterOption,
            maxIncome: maxIncome,
            minIncome: minIncome,
            minProc: minProcedure,
            maxProc: maxProcedure,
            sectionId: this.vmService.stateData.sectionId,
            offest: 0,
            pagePosition: 0
        };

        if (totalDoctors > APP.DATA.PAGE_LIMIT) {
            this.calculateTotalPages(totalDoctors);
            requestObj.pagePosition = 0;
            requestObj.offest = APP.DATA.PAGE_LIMIT;
            requestObj.totalDoctors = totalDoctors;
        }

        this.vmService.stateData.secondGraphRequest = requestObj;
        this.vmService.stateData.firstGraph = false;
        vc.verticalService.getSecondLevelGraphData(requestObj)
            .subscribe(
                (data: any) => {
                    this.drawGraph(data, vc);
                    vc._appDataService.graphBackButton = true;
                },
                (error: any) => CommonFunctionService.handleError(error, vc.router)
            )
        if (totalDoctors > APP.DATA.PAGE_LIMIT) {
            return this.calculateTotalPages(totalDoctors);

        }
    }

    /**
     * This method get data to draw the graph and delegate this task to component drawGraph method
     * @param data
     */
    private drawGraph(data: any, vc: any) {

        if (+data.statusCode == APP.CODES.UN_AUTHORIZED || data.success == false) {
            this.logout.doLogout(APP.MESSAGES.SESSION_EXPIRED);
        } else {
            vc.drawGraph(data);
            vc.isLoading = false;
        }
    }

    /**
     * This method will calculate total number of pages for second level graph
     * @param total
     * @returns {number}
     */
    private calculateTotalPages(total: number) {
        return Math.ceil(total / APP.DATA.PAGE_LIMIT);
    }

    /**
     * This method will save the current state to vertical detail service and activate the date level detail
     * state of provider
     * @param vc
     * @param drId
     * @param drColorCode
     * @param graphYear
     */
    public verticalDetail(vc: any, drId: any, drColorCode: any, graphYear: any) {
        let requestObj: any = {
            colorCode: drColorCode,
            dos: this.vmService.stateData.month + "/" + this.vmService.stateData.day + "/" + this.vmService.stateData.year,
            year: graphYear,
            month: this.vmService.stateData.month,
            option: this.vmService.stateData.filterOption,
            sectionId: this.vmService.stateData.sectionId,
            docId: drId,
            pagination: APP.DATA.EMPTY,
            startIndex: APP.PAGINATION.START_INDEX
        };

        if (this.vmService.stateData.sectionId == APP.ALGOS.CODE_DISTRIBUTION) {
            requestObj.dataLevel = 2;
            requestObj.xSlider = 2;
            vc.verticalDetailService.vdRequest = requestObj;
            vc.verticalService.vdRequest = requestObj;
            localStorage.setItem(APP.STORAGE.VERTICAL_DETAIL, JSON.stringify(requestObj));
            vc.router.navigate([APP.NAVIGATION.VERTICAL_DETAIL_FULL + '/true']);
        } else if (APP.FILTER_OPTIONS.DAY == this.vmService.stateData.filterOption) {
            vc.verticalDetailService.vdRequest = requestObj;
            vc.verticalService.vdRequest = requestObj;
            localStorage.setItem(APP.STORAGE.VERTICAL_DETAIL, JSON.stringify(requestObj));
            vc.router.navigate([APP.NAVIGATION.VERTICAL_DETAIL_FULL + '/true']);

        } else {
            vc.verticalListService.vlRequest = requestObj;
            localStorage.setItem(APP.STORAGE.VERTICAL_LIST, JSON.stringify(requestObj));
            vc.router.navigate([APP.NAVIGATION.VERTICAL_LIST]);
        }
    }

    /**
     * This method will draw first level graph on page refresh
     * @param vc
     * @param requestObj
     */
    public drawFirstGraphOnPageRefresh(vc: any, requestObj: any) {
        vc.isLoading = true;
        vc.verticalService.getGraphData(requestObj)
            .subscribe(
                (data: any) => {
                    if (+data.statusCode == APP.CODES.UN_AUTHORIZED || data.success == false) {
                        this.logout.doLogout(APP.MESSAGES.SESSION_EXPIRED);
                    } else {
                        vc.drawGraph(data);
                        vc._appDataService.graphBackButton = false;
                        vc.isLoading = false;
                    }
                },
                (error: any) => CommonFunctionService.handleError(error, vc.router)
            );
    }

    /**
     * This method will draw second level graph on page refresh
     * @param vc
     * @param requestObj
     */
    public drawSecondGraphOnPageRefresh(vc: any, requestObj: any) {

        vc.isLoading = true;
        vc.verticalService.getSecondLevelGraphData(requestObj)
            .subscribe(
                (data: any) => {
                    this.drawGraph(data, vc);
                    vc._appDataService.graphBackButton = true;
                },
                (error: any) => CommonFunctionService.handleError(error, vc.router)
            );
    }

    /**
     * This method handle page refresh and check wheter it is first level graph refresh
     * or second level graph refresh.
     * @param vc
     */
    public onPageRefresh(vc: any) {

        let previousRoute = localStorage.getItem(APP.STORAGE.PREVIOUS_REQUEST);
        if (previousRoute == APP.NAVIGATION.DASHBOARD) return;

        if (!previousRoute)
            this.logout.doLogout(APP.MESSAGES.DATA_NOT_FOUND);

        if (CommonFunctionService.isEmpty(this.vmService.stateData.pageRefresh))
            return;

        if (!CommonFunctionService.isEmpty(this.vmService.stateData.secondGraphRequest)) {
            vc.drawSecondGraphOnPageRefresh(this.vmService.stateData.secondGraphRequest);
            return;
        }

        let componentData: any = localStorage.getItem(APP.STORAGE.VERTICAL_DATA);
        if (!componentData) return;

        componentData = JSON.parse(localStorage.getItem(APP.STORAGE.VERTICAL_DATA));
        this.vmService.stateData = componentData;

        if (!CommonFunctionService.isEmpty(componentData.secondGraphRequest)) {
            vc.drawSecondGraphOnPageRefresh(this.vmService.stateData.secondGraphRequest);
            return;
        }

    }

    /**
     * This method filter the data for statistical module
     * @param vc
     */
    public filterDataForStatistical(vc: any) {
        vc.isLoading = true;
        let postObject: any = {
            date_of_service: this.vmService.stateData.month + "/" + this.vmService.stateData.day + "/" + this.vmService.stateData.year,
            opetions: this.vmService.stateData.filterOption,
            month: this.vmService.stateData.month,
            filterYear: this.vmService.stateData.year,
            year: this.vmService.stateData.year,
            day: this.vmService.stateData.day,
            sectionId: this.vmService.stateData.sectionId,
            filter_options_temp: this.vmService.stateData.filterOption
        }

        if (vc.isDisble())
            postObject.opetions = APP.FILTER_OPTIONS.YEAR;

        this.vmService.stateData.firstGraphRequest = postObject;
        this.vmService.stateData.firstGraph = true;
        this.vService.getGraphData(postObject)
            .subscribe(
                (data: any) => this.drawGraph(data, vc),
                (error: any) => CommonFunctionService.handleError(error, vc.router)
            )
    }
}