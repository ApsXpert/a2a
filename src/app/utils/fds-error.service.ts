/**
 * Created by Atif on 1/27/2017.
 */

import {Injectable, Injector} from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class FdsErrorService {

    private router: Router;

    constructor(private injector: Injector) {
        this.router = this.injector.get(Router);
    }

    /**
     * This method will handle errors and exception
     * @param error
     */
    public handleError(error: any) {
        this.router.navigate(['/error']);
    }
}