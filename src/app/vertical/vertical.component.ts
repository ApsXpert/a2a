/**
 * Created by Javed on 1/4/2017.
 */
import {Component, OnInit, ElementRef, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AppDataService} from "../services/app_data.service";
import {VerticalService} from "./vertical.service";
import {VerticalHandlerService} from "./services/vertical-handler.service";
import {VerticalEventEmitterService} from "./event-emitter.service";
import {Subscription} from "rxjs";
import {CommonFunctionService} from "../common/common-functions.service";
import {VerticalModuleService} from "./services/vertical-module.service";
import {APP} from "../constants/app.constants";
import {LogoutService} from "../services/logout.service";
import {VerticalDetailService} from "./vertical-detail/vertical-detail.service";
import {VerticalListService} from "./vertical-list/vertical-list.service";
declare var jQuery: any;
@Component({
    templateUrl: 'vertical.component.html'
})
export class VerticalComponent implements OnInit, OnDestroy {

    private backGraphSubscription: Subscription;
    public isLoading: boolean = false;
    public totalPages: number = 0;
    public pagesDropDownArr: number[] = [];
    public currentPage: number = 1;
    public noData: boolean = true;


    constructor(private router: Router, private _appDataService: AppDataService, private activatedRoute: ActivatedRoute,
                private verticalService: VerticalService, private elRef: ElementRef,
                private verticalHandlerService: VerticalHandlerService,
                private verticalEventEmitterService: VerticalEventEmitterService, private verticalListService: VerticalListService,
                private vmService: VerticalModuleService, private logout: LogoutService, private verticalDetailService: VerticalDetailService) {

        window.onbeforeunload = ()=> {
            this.vmService.stateData.pageRefresh.flag = true;
            localStorage.setItem(APP.STORAGE.VERTICAL_DATA, JSON.stringify(this.vmService.stateData));
            this._appDataService.currentComponent = APP.COMPONENT.VERTICAL;
        }

        this.backGraphSubscription = this.verticalEventEmitterService.backGraphNotifyObservable$
            .subscribe((data: any) => {
                this.drawFirstGraphOnPageRefresh(this.vmService.stateData.firstGraphRequest);
            });
    }

    /**
     * This method is called on initialization of component and this method delegate
     * the initialization task to VerticalHandlerService
     */
    ngOnInit() {
        this.verticalHandlerService.onVerticalInit(this);
        if (+this.vmService.stateData.sectionId == +APP.ALGOS.OVERACTIVE_STATISTICAL || +this.vmService.stateData.sectionId == APP.ALGOS.CODE_DISTRIBUTION) {
            this.verticalHandlerService.handleStatistical(this);
        }
    }

    /**
     * This method store current state to localStroage on destroy of component
     */
    ngOnDestroy() {
        this.backGraphSubscription.unsubscribe();
        this.vmService.stateData.pageRefresh.flag = false;
        localStorage.setItem(APP.STORAGE.VERTICAL_DATA, JSON.stringify(this.vmService.stateData));
    }

    /**
     * This method will check if algo is supported to date wise search and return true
     * or false.
     * @returns {boolean}
     */
    public isDisble() {
        if (this.vmService.stateData.sectionId == APP.ALGOS.OVERREACTIVE
            || this.vmService.stateData.sectionId == APP.ALGOS.RATIO_SIMPLE_TO_COMPLEX_COMPLEX_EXTRACTION) {
            return true;
        }

        return false;
    }

    /**
     * This method will check if algo is supported to year search and return true
     * or false.
     * @returns {boolean}
     */
    public isYearDisble() {
        if (this.vmService.stateData.sectionId == APP.ALGOS.CODE_DISTRIBUTION) {
            return true;
        }

        return false;
    }

    /**
     * This method will change the filter option when filter is changed from frontend.
     * @param filterOption
     */
    public changeFilterOption(filterOption: number) {
        this.verticalHandlerService.changeFilterOption(this, filterOption);
    }

    /**
     * This method will filter data on select option and draw first level graph
     */
    public filterData() {
        this.verticalHandlerService.filterData(this);
    }

    /**
     * This method will draw graph on the basis of provided data
     * @param data
     */
    private drawGraph(data: any) {
        if (data.data[0] == '') {
            this.noData = true;
            return;
        }
        this.noData = false;
        var self = this;
        jQuery('#chart1b').html('')
        let graphConfig = self.verticalService.getGraphConfigs(data.data[0], data.data[1], data.data[2], 0, 0,
            self.vmService.stateData.filterOption, self.vmService.stateData.year);
        let plot = jQuery.jqplot('chart1b', [eval(data.data[0])], graphConfig);
        self.bindGraphEvents(plot, self.vmService.stateData.filterOption, self.vmService.stateData.year);
    }

    /**
     * This method will bind events to graph
     * @param plot
     * @param filterOption
     * @param year
     */
    public bindGraphEvents(plot: any, filterOption: number, year: number) {

        // jQuery('#chart1b').bind('jqplotDataUnhighlight', function (ev: any, seriesIndex: any, pointIndex: any, data: any) {
        //     jQuery('#tooltip1b').hide();
        // });

        var self = this;
        jQuery('#chart1b').bind(APP.JQPLOT_EVENTS.DATA_HIGHLIGHT,
            function (ev: any, seriesIndex: any, pointIndex: any, data: any, radius: any) {
                let chartLeft = jQuery('#chart1b').offset().left,
                    chartTop = jQuery('#chart1b').offset().top,
                    x = plot.axes.xaxis.u2p(data[0]),
                    y = plot.axes.yaxis.u2p(data[1]);
                let color = '#000';
                let screenWidth = jQuery(window).width();
                jQuery('#tooltip1b').width(110);
                let differenceOfScreen = screenWidth - x;
                if (differenceOfScreen <= 500) {
                    jQuery('#tooltip1b').css({left: -170 + x + radius + 62, top: y + 23});
                } else {
                    jQuery('#tooltip1b').css({left: -120 + x + radius + 62, top: y + 23});
                }
                let totalDoctors = data[3];
                let minProcedure = data[4];
                let maxProcedure = data[5];
                let minIncome = data[6];
                let maxIncome = data[7];
                let colorCode = data[9];
                let tooltipLevel = data[11];
                if (tooltipLevel == "level1") {
                    jQuery('#tooltip1b').html('<span style="font-size:14px;font-weight:bold;color:' +
                        color + ';"># of Provider(s):' + totalDoctors + '</span><br /><a class="tooltip_more" id="next-graph">Show Providers</a>');
                    var ele = self.elRef.nativeElement.querySelector('#next-graph');
                    if (ele) {
                        ele.addEventListener('click', (event: any) => {
                            self.drawNextGraph(minProcedure, maxProcedure, minIncome, maxIncome, colorCode, filterOption, year, totalDoctors)
                        });
                    }
                } else {
                    var graphYear = data[5];
                    var drId = data[4];
                    var drColorCode = data[6];
                    jQuery('#tooltip1b').html('<span style="font-size:14px;font-weight:bold;color:' +
                        color + ';">Dr. ' + data[3] + '</span><br /><a class="tooltip_more" id="vertical-detail">More Details</a>');
                    var ele = self.elRef.nativeElement.querySelector('#vertical-detail')
                    if (ele) {
                        ele.addEventListener('click', (event: any) =>
                            self.verticalDetail(drId, drColorCode, graphYear));
                    }
                }
                jQuery('#tooltip1b').show();
            });
    }

    /**
     * This method will draw second level graph.
     * @param minProcedure
     * @param maxProcedure
     * @param minIncome
     * @param maxIncome
     * @param colorCode
     * @param filterOption
     * @param year
     * @param totalDoctors
     */
    public drawNextGraph(minProcedure: any, maxProcedure: any, minIncome: any, maxIncome: any, colorCode: any, filterOption: any, year: any, totalDoctors: number) {
        var self = this;
        let resp = this.verticalHandlerService.drawNextGraph(self, minProcedure, maxProcedure, minIncome, maxIncome, colorCode, filterOption, year, totalDoctors);
        this.initPageDropDown(resp);
    }

    /**
     * This method initialize drop down for second level graph when it has multiple pages.
     * @param resp
     */
    private initPageDropDown(resp: number) {
        this.pagesDropDownArr = new Array();
        for (let i = 1; i <= resp; i++) {
            this.pagesDropDownArr.push(i);
        }
    }

    /**
     * This method will active vertical detail state when click on second level graph detail link.
     * @param drId
     * @param drColorCode
     * @param graphYear
     */
    public verticalDetail(drId: any, drColorCode: any, graphYear: any) {
        var self = this;
        this.verticalHandlerService.verticalDetail(self, drId, drColorCode, graphYear);
    }

    /**
     * This method will handle first level graph on page refresh.
     * @param requestObj
     */
    public drawFirstGraphOnPageRefresh(requestObj: any) {
        var self = this;
        self.verticalHandlerService.drawFirstGraphOnPageRefresh(this, requestObj);

    }

    /**
     * This method will handle second level graph on page refresh.
     * @param requestObj
     */
    public drawSecondGraphOnPageRefresh(requestObj: any) {
        this.initPageDropDown(Math.ceil(+requestObj.totalDoctors / APP.DATA.PAGE_LIMIT));
        this.verticalHandlerService.drawSecondGraphOnPageRefresh(this, requestObj);
    }

    /**
     * This method handle page refresh and check wheter it is first level graph refresh
     * or second level graph refresh.
     */
    private onPageRefresh() {
        this.verticalHandlerService.onPageRefresh(this);
    }

    /**
     * This method will fetch graph data when graph page changed.
     * @param event
     */
    public onGraphPageChange(event: any) {
        this.vmService.stateData.secondGraphRequest.offest = APP.DATA.PAGE_LIMIT;
        this.vmService.stateData.secondGraphRequest.pagePosition = (this.currentPage - 1) * APP.DATA.PAGE_LIMIT;
        this.vmService.stateData.firstGraph = false;
        this.verticalService.getSecondLevelGraphData(this.vmService.stateData.secondGraphRequest)
            .subscribe(
                (data: any) => {
                    if (+data.statusCode == APP.CODES.UN_AUTHORIZED || data.success == false) {
                        this.logout.doLogout(APP.MESSAGES.SESSION_EXPIRED);
                    } else {
                        this.drawGraph(data);
                        this._appDataService.graphBackButton = true;
                        this.isLoading = false;
                    }
                },
                (error: any) => CommonFunctionService.handleError(error, this.router)
            )

    }

}