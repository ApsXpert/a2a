/**
 * Created by Atif on 1/24/2017.
 */

import { Injectable } from '@angular/core';
import {CanDeactivate, Router} from "@angular/router";
import {Observable} from "rxjs";
import {APP} from "../constants/app.constants";

@Injectable()
export class PreviousRouteRecorder implements CanDeactivate<any>{

    constructor(private router: Router) { }

    canDeactivate(component: any): Observable<boolean> | boolean {
        localStorage.setItem(APP.STORAGE.PREVIOUS_REQUEST, this.router.url);
        return true;
    }

}