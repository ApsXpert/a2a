/**
 * This is dashboard component class which have method and data to
 * handle dashboard states and events.
 */

import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {AppDataService} from '../services/app_data.service';
import {DashboardService} from './dashboard.service';
import {LogoutService} from "../services/logout.service";

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

    public axiomaticFlag: boolean = true;
    public impossibleFlag: boolean = false;
    public statisticalFlag: boolean = false;
    public connectionFlag: boolean = false;

    constructor(private ar: ActivatedRoute, private _dashboardService: DashboardService,
                private _appDataService: AppDataService, private logout: LogoutService) {

        this._appDataService.graphBackButton = false;
        if (this._appDataService.loginFlag)
            this._appDataService.setIsLoggedIn(true);

    }

    /**
     * This is component initialization method which done initialization task
     */
    ngOnInit() {

        if (this._dashboardService.checkResponse(this.ar.snapshot.data['dashboardData'])) {
            this.logout.doLogout("Your session expired. Please login again");
            return;
        }

        this._appDataService.dashboardSideMenuYears = this.ar.snapshot.data['dashboardData'][0].data;
        this._dashboardService.setDashboardStats(this.ar.snapshot.data['dashboardData'][1].data);
        this._dashboardService.appModuleGroup = this.ar.snapshot.data['dashboardData'][1].groups;
        this._dashboardService._appModules = this.ar.snapshot.data['dashboardData'][1].module;
        this._dashboardService.setModuleStats();
        this._appDataService.loadingFlag = false;

    }

    /**
     * This method change the module section when header tab clicked
     * @param tab
     */
    public changeTab(tab: string) {

        this._dashboardService.tabs = this._dashboardService.tabs
            .map(
                (x: any) => {
                    if (x.title == tab) {
                        return {title: x.title, flag: true}
                    } else {
                        return {title: x.title, flag: false}
                    }
                }
            )
    }

    public yearChange(year: any) {
        this._dashboardService.setDashboardCurrentYearStats(year);
    }

    public getStatsByGroup(module: string) {
        return this._dashboardService.moduleStats[module];
    }

    public changeTimeAlgo(index: number, moduleName: string) {
        this._dashboardService.timeStats = this._dashboardService.moduleStats[moduleName][index];
    }

    public changeLocationAlgo(index: number, moduleName: string) {
        this._dashboardService.locationStats = this._dashboardService.moduleStats[moduleName][index];
    }

    public changePerioAlgo(index: number, moduleName: string) {
        this._dashboardService.perioStats = this._dashboardService.moduleStats[moduleName][index];
    }

    public changeExtractionAlgo(index: number, moduleName: string) {
        this._dashboardService.extractionStats = this._dashboardService.moduleStats[moduleName][index];
    }

    public changeImpStatisticalAlgo(index: number) {
        this._dashboardService.otherStats = this._dashboardService.moduleStats[index];
    }

    /**
     * This method calculates the percentage of algo bar values
     * @param totlalProvider
     * @param rygProvider
     * @returns {any}
     */
    public calculatePercentage(totlalProvider: number, rygProvider: number) {
        if (+rygProvider === 0) {
            return "0%";
        }
        let percentage: any;
        percentage = (rygProvider / totlalProvider) * 100;
        if (percentage === 0) {
            return percentage + "%";
        }
        percentage = percentage.toFixed(4);
        return percentage + "%";
    }

    /**
     * This method calculate the height of algo bars
     * @param totlalProvider
     * @param rygProvider
     * @returns {any}
     */
    public getBarHeights(totlalProvider: number, rygProvider: number) {
        if (+rygProvider === 0) {
            return "1px";
        }
        let percentage: any;
        percentage = (rygProvider / totlalProvider) * 100;
        if (percentage === 0) {
            return percentage + 1 + "px";
        }
        percentage = percentage + 1;
        percentage = percentage.toFixed(2);
        return percentage + "px";
    }

    /**
     * This method handle the module change event
     * @param moduleId
     */
    public moduleTabChanged(moduleId: number) {

        this._dashboardService.currentModule = moduleId;
        switch (+moduleId) {
            case 1:
                this._dashboardService.setModuleStats();
                this.axiomaticFlag = true;
                this.impossibleFlag = false;
                this.statisticalFlag = false;
                this.connectionFlag = false;
                break;
            case 2:
                this._dashboardService.changeModuleStats();
                this.axiomaticFlag = false;
                this.impossibleFlag = true;
                this.statisticalFlag = false;
                this.connectionFlag = false;
                break;
            case 3:
                this._dashboardService.changeModuleStats();
                this.axiomaticFlag = false;
                this.impossibleFlag = false;
                this.statisticalFlag = true;
                this.connectionFlag = false;
                break;
            case 4:
                this.axiomaticFlag = false;
                this.impossibleFlag = false;
                this.statisticalFlag = false;
                this.connectionFlag = true;
                this._dashboardService.changeModuleStats();
                break;
        }

    }

    /**
     * This method handle the year drop down change and load the selected year data
     * @param year
     */
    public yearChanged(year: number) {
        this._dashboardService.currentYear = year;
        this._dashboardService.processDashboardChange();
    }

}