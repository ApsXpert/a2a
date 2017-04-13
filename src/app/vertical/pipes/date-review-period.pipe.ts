/**
 * Created by Atif on 2/8/2017.
 */

import {Pipe, PipeTransform} from '@angular/core';
import {CommonFunctionService} from "../../common/common-functions.service";
import {VerticalModuleService} from "../services/vertical-module.service";

@Pipe({
    name: 'reviewDate'
})

export class ReviewDatePipe implements PipeTransform {

    constructor(private vmService: VerticalModuleService) {
    }

    transform(value: any, args: any[]): any {

        let componentState = this.vmService.stateData.secondGraphRequest;
        if (CommonFunctionService.isEmpty(componentState)) {
            componentState = CommonFunctionService.getComponentState();
            if(componentState != false){
                componentState = componentState.secondGraphRequest;
            }else{
                return '';
            }
        }

        if(undefined == value || null == value){
            return componentState.year;
        }

        let returnVal: any = null;
        if (value == 0 || value == '') {

            if (!CommonFunctionService.isEmpty(componentState)) {
                let option = componentState.option;
                switch (+option) {
                    case 1:
                        returnVal = componentState.year;
                        break;
                    case 2:
                        returnVal = CommonFunctionService.months[componentState.month] + ', ' + componentState.year;
                        break;
                    case 3:
                        let dos = componentState.dos.split('/');
                        if (dos.length == 3) {
                            returnVal = CommonFunctionService.months[dos[0]] + ' ' + dos[1] + ', ' + dos[2];
                        }
                        break;
                }
                return returnVal;
            }
        } else {
            let dos = value.split('-');
            if (dos.length > 0) {
                returnVal = CommonFunctionService.months[dos[0]] + ' ' + dos[1] + ', ' + dos[2];
            }
            return returnVal;
        }


        return '';
    }
}