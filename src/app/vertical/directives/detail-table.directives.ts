/**
 * Created by Atif on 1/26/2017.
 */

import {Directive, ViewContainerRef, TemplateRef, Input} from "@angular/core";
@Directive({
    selector: '[fdsDetailTable]'
})
export class DetailTableDirective{

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef){}

    @Input() set fdsDetailTable(data: any) {
       console.log(data);
    }
}