/**
 * Created by Atif on 1/10/2017.
 */

import {Component} from "@angular/core";
import {VerticalService} from "../vertical.service";
import {CommonFunctionService} from "../../common/common-functions.service";
import {Router} from "@angular/router";
import {AppEventEmitterService} from "../../services/app-event-emitter.service";
import {VerticalSidebarService} from "./services/vertical-sidebar.service";

@Component({
    selector: 'vertical-sidebar',
    templateUrl: 'vertical-sidebar.component.html'
})
export class VerticalSidebarComponent {
    public date: any;
    public provider: any;
    public algoId: any;
    public results: any[];
    public resultData: any[];

    constructor(private verticalService: VerticalService, private vsbService: VerticalSidebarService,
                private appEventEmitterService: AppEventEmitterService, private router: Router) {
    }


    /**
     * This method will search doctors for auto complete.
     * @param event
     */
    public search(event: any) {
        this.verticalService.searchProviders(event.query)
            .subscribe(
                (data: any) => {
                    this.vsbService.resultData = data.hits.hits;
                    this.vsbService.results = this.filterResult(data.hits.hits)
                },
                (error: any) => CommonFunctionService.handleError(error, this.router)
            )
    }


    /**
     * This method will fetch data from server on the basis of selected provider and date.
     */
    public filterData(){

        if(CommonFunctionService.isEmpty(this.date)){
           return;
        }

        let dos: string = this.vsbService.date.month + "/" + this.vsbService.date.day + "/" + this.vsbService.date.year;
        let filterQuery: any = {
            docId: this.vsbService.provider.id,
            providerName: this.vsbService.provider.name,
            dos: dos,
            sectionId: this.vsbService.algoId,
            year: this.vsbService.date.year,
            month: this.vsbService.date.month
        }
        this.appEventEmitterService.notifySidebarFilterToOther(filterQuery);
    }

    /**
     * This method will format data for doctor auto complete search
     * @param data
     * @returns {any[]}
     */
    private filterResult(data: any[]){
        let results: any[] = new Array();;
        for(let d of data){
            results.push({
                text: d._source.text + ' [ ' + d._source.city + ' - ' + d._source.state + ' ]',
                id: d._source.id,
                name: d._source.text
            });
        }
        return results;
    }

}