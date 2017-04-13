/**
 * Created by Atif on 1/25/2017.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'fdsModules'
})
export class SidebarModulePipe implements PipeTransform {
    transform(value: any, args: any[]): any {
        let keys: any = [];
        for (let key in value) {
            keys.push({key: key, value: value[key]});
        }
        return keys;
    }
}