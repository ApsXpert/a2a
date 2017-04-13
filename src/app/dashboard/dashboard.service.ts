/**
 * This service class is used for dashboard data processing and event delegations
 */
import {Injectable} from '@angular/core';
import {DashboardHelper} from "./dashboard-helper.service";
import {APP} from "../constants/app.constants";

@Injectable()
export class DashboardService {

    public tabs: any;
    public dashboardStats: any;
    public dashboardCurrentYearStats: any;
    public currentTabStats: any;
    public appModuleGroup: any;
    public _appModules: any;
    public moduleStats: any;
    public currentYear = 2015;
    public currentModule = 1;
    public fsxStats: any;
    public crownBuildStats: any;
    public timeStats: any;
    public locationStats: any;
    public perioStats: any;
    public extractionStats: any;
    public otherStats: any;


    constructor(private dashboardHelper: DashboardHelper) {
    }

    /**
     * Setter for tabs
     * @param tabs
     */
    public setTabs(tabs: any) {
        let tempTab = new Array();
        for (let tab of tabs) {
            tempTab.push({
                title: tab.module_name,
                moduleId: tab.id,
                flag: false
            })
        }
        tempTab[0].flag = true;
        this.tabs = tempTab;
    }

    /**
     * This method set the stats for dashboard
     * @param stats
     */
    public setDashboardStats(stats: any) {
        this.dashboardStats = stats;
        this.setCurrentStats();
    }

    /**
     * This method set the stats for default year
     */
    public setCurrentStats() {
        this.dashboardCurrentYearStats = this.dashboardStats.filter(
            (x: any) => {
                if (x.year == this.currentYear)
                    return x;
            }
        )

        this.currentTabStats = this.dashboardCurrentYearStats.filter(
            (x: any) => {
                if (+x.module_id == this.currentModule)
                    return x;
            }
        )
    }

    /**
     * This method set the current dashboard year stats
     * @param year
     */
    public setDashboardCurrentYearStats(year: any) {
        this.dashboardCurrentYearStats = this.dashboardStats.map(
            (x: any) => {
                if (x.year === year)
                    return x;
            }
        )
    }

    public setModuleStats() {
        this.setCurrentStats();
        let temp = this.appModuleGroup.filter(
            (x: any) => {
                if (+x.module_id == this.currentModule)
                    return x;
            }
        );
        let _temp: any = {};
        for (let i of temp) {
            _temp[i.group_name] = new Array();
            this.currentTabStats.filter(
                (x: any) => {
                    if (i.group_name == x.algo_title)
                        _temp[i.group_name].push(x);
                }
            )
        }
        this.moduleStats = _temp;
        this.fsxStats = _temp['Full Series X-Rays'][0];
        this.crownBuildStats = _temp['Crown build up '][0];
        this.timeStats = _temp['Time Analysis'][0];
        this.locationStats = _temp['place'][0];
        this.perioStats = _temp['perio'][0];
        this.extractionStats = _temp['extraction'][0];

    }

    public changeModuleStats() {

        let temp = this.dashboardStats.filter(
            (x: any) => {
                if (+x.module_id == this.currentModule && x.year == this.currentYear && +x.isactive == 1)
                    return x;
            }
        );

        if (temp.length == 0)
            temp.push(this.dashboardHelper.getEmptyDataObject(this.currentModule, this.otherStats.algo_title, this.otherStats.name));

        this.moduleStats = temp;
        this.otherStats = temp[0];
    }

    /**
     * This method set the dashboard module for default year and if year changed
     */
    public processDashboardChange() {
        if (this.currentModule == 1)
            this.setModuleStats();
        else
            this.changeModuleStats();

    }

    /**
     * This method check response and return true or false depending on data
     * @param data
     * @returns {boolean}
     */
    public checkResponse(data: any[]) {
        return ((+data[0].statusCode == APP.CODES.UN_AUTHORIZED || data[0].success == false)
        || (+data[1].statusCode == APP.CODES.UN_AUTHORIZED || data[1].success == false));
    }
}

