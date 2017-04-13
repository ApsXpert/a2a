/**
 * Created by Atif on 1/9/2017.
 */

import {Injectable} from "@angular/core";
import {AppResponse} from "../models/app_response";
import {APP} from "../constants/app.constants";
@Injectable()
export class TokenSerivce {

    public static checkSessionTimeOut(): boolean {
        if (APP.DATA.EMPTY === localStorage.getItem(APP.STORAGE.USER_INFO) || null == localStorage.getItem(APP.STORAGE.USER_INFO)) {
            return false;
        }

        let data: AppResponse = JSON.parse(localStorage.getItem(APP.STORAGE.USER_INFO));
        let expiryTime = data.token.expiryTime;
        let cTime = new Date().valueOf() / 1000;
        if (cTime >= expiryTime || null == data.token.token || APP.DATA.EMPTY === data.token.token) {
            return false;
        }
        return true;
    }
}