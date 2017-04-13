import {Injectable} from "@angular/core";
import {URL} from '../constants/constant.urls';
import {CenteralHttpService} from "../services/centeral-http.service";
import {HttpService} from "../services/HttpService";
import {VerticalModuleService} from "./services/vertical-module.service";
import {APP} from "../constants/app.constants";
import {Router} from "@angular/router";
declare var jQuery: any;
@Injectable()
export class VerticalService {


    public vdRequest: any;
    public sideBarAlgoGroups: any;

    constructor(private centeralHttpService: CenteralHttpService, private httpService: HttpService,
                public vmService: VerticalModuleService, private router: Router) {
    }

    /**
     * This method will structure data for side menu module drop down.
     * @param group
     * @param data
     */
    public setSideMenuAlgosGroup(group: any[], data: any) {
        let _temp: any = {};
        for (let i of group) {
            _temp[i.group_name] = new Array();
            data.filter(
                (x: any) => {
                    if (i.group_name == x.group_name) {
                        _temp[i.group_name].push(x);
                    }
                }
            )
        }
        if (null == this.vmService.stateData.sectionId || undefined == this.vmService.stateData.sectionId) {
            for (var key in _temp) {
                this.vmService.stateData.sectionId = _temp[key][0].algo_id;
                break;

            }
        }
        this.sideBarAlgoGroups = _temp;
    }

    /**
     * This is getter method to get side menu data for drop down.
     * @returns {Observable<R>}
     */
    public getDropdownYear() {
        return this.centeralHttpService
            .get(URL.DASHBOARD_SIDEMENU);
    }

    /**
     * This method will fetch the data from server for first level graph
     * @param body
     * @returns {Observable<R>}
     */
    public getGraphData(body: any) {
        return this.centeralHttpService.post(URL.ALGO_GRAPH, body);
    }

    /**
     * This method will fetch the data from server for first level graph
     * @param body
     * @returns {Observable<R>}
     */
    public getGraphDataForStatistical(body: any) {
        return this.centeralHttpService.post(URL.STATISTICAL.GRAPH, body);
    }

    /**
     * This method will fetch the data from server for first level graph
     * @param body
     * @returns {Observable<R>}
     */
    public getDoctorProcedures(body: any) {
        return this.centeralHttpService.post(URL.STATISTICAL.PROCEDURE, body);
    }

    /**
     * This method will fetch the data from server for second level graph
     * @param body
     * @returns {Observable<R>}
     */
    public getSecondLevelGraphData(body: any) {
        return this.centeralHttpService.post(URL.SECOND_LEVEL_GRAPH, body);
    }

    /**
     * This method will fetch the doctors for auto complete
     * @param body
     * @returns {Observable<R>}
     */
    public searchProviders(searchText: string) {
        return this.httpService.getProviders("https://www.fraudlens.com/fraudlens/doctors/_search?q=" + searchText);
    }


    /**
     * This method will calculate ticks and lines for graph.
     * @param maXval
     * @returns {string}
     */
    public getTicksAndCenterLine(maXval: any) {

        let graphTicks = Math.ceil(maXval / 2);

        if (graphTicks % 2 == 0) {
            graphTicks = graphTicks + 1;
        } else if (graphTicks % 2 != 0) {
        }
        if (graphTicks <= 2) {
            graphTicks = 3;
        }
        let centeralLine = Math.ceil(graphTicks / 2);

        return graphTicks + '-' + centeralLine;

    }

    /**
     * This method return graph configurations
     * @param arr
     * @param maxX
     * @param maxY
     * @param minX
     * @param minY
     * @param filterOption
     * @param year
     * @returns {{title: string, animate: boolean, animateReplot: boolean, axesDefaults: {labelRenderer: any}, axes: {xaxis: {label: string, numberTicks: any, tickOptions: {formatString: string}, labelOptions: {fontSize: string, textColor: string}, min: any, max: any}, yaxis: {label: string, numberTicks: any, tickOptions: {prefix: string, formatString: string, formatter: any}, labelOptions: {fontSize: string, textColor: string}, min: any, max: any}}, seriesColors: (string|string|string)[], seriesDefaults: {renderer: any, rendererOptions: {highlightMouseOver: boolean, autoscaleBubbles: boolean, autoscalePointsFactor: number, bubbleAlpha: number, highlightAlpha: number, showLabels: boolean}, shadow: boolean, shadowAlpha: number}, cursor: {show: boolean, showTooltip: boolean, zoom: number}, grid: {drawGridLines: boolean, gridLineColor: string, background: string, borderColor: string, borderWidth: number, drawGridMiddlelines: number, gridMiddleLineColor: string, centerLine: any}}}
     */
    public getGraphConfigs(arr: any, maxX: any, maxY: any, minX: any, minY: any, filterOption: number, year: number) {

        minX = parseFloat(minX);
        maxX = parseFloat(maxX) + 1;
        minY = parseFloat(minY);
        maxY = parseFloat(maxY);

        if ((minY == maxY)) {
            // this means we have only one record - FDS-1802
            minX = minX / 2;
            minX = parseFloat(minX);
            maxX = parseFloat(maxX);
            minY = minY / 2;
            minY = parseFloat(minY);
            maxX = parseFloat(maxX) + 5;
            maxY = parseFloat(maxY) + 100;

        }

        let graphTicks: any;
        let centeralLine: any;
        let prodcdureDifference = maxX - minX;
        maxX = parseFloat(maxX);

        if (maxX < 10 && prodcdureDifference < 10) {

            let getLineAndTicks = this.getTicksAndCenterLine(maxX);
            let _getLineAndTicks = getLineAndTicks.split("-");
            graphTicks = _getLineAndTicks[0];
            centeralLine = _getLineAndTicks[1];

        } else {
            centeralLine = 6;
        }

        let configObj = {

            title: '',
            animate: true,
            animateReplot: true,
            axesDefaults: {
                labelRenderer: jQuery.jqplot.CanvasAxisLabelRenderer
            },

            axes: {
                xaxis: {
                    label: 'Procedures Performed',
                    numberTicks: graphTicks,
                    tickOptions: {
                        formatString: '%#d'
                    },
                    labelOptions: {
                        fontSize: '12px',
                        textColor: '#fff'
                    },
                    min: minX,
                    max: maxX,

                },
                yaxis: {
                    label: 'Dollars Earned',
                    numberTicks: graphTicks,
                    tickOptions: {
                        prefix: '$',
                        formatString: '%d', formatter: jQuery.jqplot.moneyFormatter
                    },
                    labelOptions: {
                        fontSize: '12px',
                        textColor: '#fff'
                    },
                    min: minY,
                    max: maxY,
                }
            },
            seriesColors: ["#e33535", "#fbea00", "#52cd1c"],
            seriesDefaults: {
                renderer: jQuery.jqplot.BubbleRenderer,
                rendererOptions: {
                    highlightMouseOver: true,
                    autoscaleBubbles: false,
                    autoscalePointsFactor: 0,
                    //autoscaleMultiplier: 0.55,
                    //highlightMouseDown: true,

                    bubbleAlpha: 0.6,
                    highlightAlpha: 0.8,
                    showLabels: false
                },
                shadow: true,
                shadowAlpha: 0.05
            },

            cursor: {
                show: true,
                showTooltip: false,
                //tooltipLocation:'sw',
                zoom: 1,
                //constrainZoomTo: 'x'
                //constrainZoomTo: 'x'/*Ticket #1144 We change zooming option vertically, to avoid overlapping dots from boundary of graph.*/
            },
            grid: {
                drawGridLines: true,        // wether to draw lines across the grid or not.
                gridLineColor: '#111',    	// **Color of the grid lines.
                background: 'transparent',      		// CSS color spec for background color of grid.
                borderColor: '#333',     	// CSS color spec for border around grid.
                borderWidth: 1.0,           // pixel width of border around grid.
                drawGridMiddlelines: 6,
                gridMiddleLineColor: '#525252',
                centerLine: centeralLine
            }
        };

        return configObj;
    }

    /**
     * This method return the current module id.
     * @returns {any}
     */
    public getModuleId() {

        if (this.vmService.stateData.currentModuleId > 0) {
            return this.vmService.stateData.currentModuleId;
        }

        let componentData: any = localStorage.getItem(APP.STORAGE.VERTICAL_DATA);
        if ('' == componentData || null == componentData) {
            this.router.navigate([APP.NAVIGATION.DASHBOARD]);
            return;
        }

        componentData = JSON.parse(localStorage.getItem(APP.STORAGE.VERTICAL_DATA));
        if ('' != componentData.currentModuleId && null != componentData.currentModuleId && 0 != componentData.currentModuleId) {
            return componentData.currentModuleId;
        } else {
            this.router.navigate([APP.NAVIGATION.DASHBOARD]);
        }

    }
}