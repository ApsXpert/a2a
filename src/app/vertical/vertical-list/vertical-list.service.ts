/**
 * Created by Atif on 1/16/2017.
 */

import {Injectable} from '@angular/core';
import {URL} from "../../constants/constant.urls";
import {CenteralHttpService} from "../../services/centeral-http.service";
import {APP} from "../../constants/app.constants";
import {LogoutService} from "../../services/logout.service";

@Injectable()
export class VerticalListService {

    public vlcData: any = {
        procedureList: [],
        topDetail: {},
        doctorDetail: {},
        doctorSpecialty: {},
        patients: {},
        count: {}
    };
    public vlRequest: any = {};
    public doctorAddress: any = [];
    public mAddressFlag = false;

    constructor(private logout: LogoutService) {
    }

    /**
     * This method check response if it is valid or not.
     * @param data
     * @returns {boolean}
     */
    public checkResponse(data: any[]) {
        if ((false == data[0].success || +data[0].statusCode == APP.CODES.UN_AUTHORIZED) || (false == data[1].success || +data[1].statusCode == APP.CODES.UN_AUTHORIZED)
            || (false == data[2].success || +data[2].statusCode == APP.CODES.UN_AUTHORIZED) || (false == data[3].success || +data[3].statusCode == APP.CODES.UN_AUTHORIZED)) {
            return false;
        } else {
            return true;
        }
    }

    public setData(data: any) {
        if (+data.statusCode == APP.CODES.UN_AUTHORIZED || data.success == false)
            this.logout.doLogout(APP.MESSAGES.SESSION_EXPIRED);

        this.vlcData.procedureList = data.data;

        if (data.count)
            this.vlcData.count = data.count;

    }
}