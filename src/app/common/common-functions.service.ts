import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Router} from "@angular/router";
import {APP} from "../constants/app.constants";

@Injectable()
export class CommonFunctionService {

    public static months = {
        '1': 'January',
        '2': 'February',
        '3': 'March',
        '4': 'April',
        '5': 'May',
        '6': 'June',
        '7': 'July',
        '8': 'August',
        '9': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December',
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
    };
    public static isEmpty(obj: any) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }

        return true;
    }

    public static handleError(error: Response, router: Router) {
        if (error.toString().includes("SyntaxError")) {
            router.navigate(['/login']);
            return;
        }
        router.navigate(['/dashboard']);
    }

    public static getComponentState() {
        let componentData: any = localStorage.getItem(APP.STORAGE.VERTICAL_DATA);
        if ('' != componentData && null != componentData) {
            return JSON.parse(localStorage.getItem(APP.STORAGE.VERTICAL_DATA));
        }

        return false;
    }

}