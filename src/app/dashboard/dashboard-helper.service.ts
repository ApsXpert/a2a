/**
 * Created by Atif on 1/10/2017.
 */

import {Injectable} from "@angular/core";
import {DashboardService} from "./dashboard.service";
@Injectable()
export class DashboardHelper {

    emptyObject: any = {
        algo_title: "",
        total_red: 0,
        total_green: 0,
        total_yellow: 0,
        number_of_providers: 0,
        name: ""

    };

    /**
     * This method give empty object if there is no data in the selected year
     * @param moduleId
     * @param algoTitle
     * @param algoName
     * @returns {any}
     */
    public getEmptyDataObject(moduleId: number, algoTitle: string, algoName: string) {

        this.emptyObject.algo_title = algoTitle;
        this.emptyObject.name = algoName;
        return this.emptyObject;
    }
}