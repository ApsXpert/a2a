/**
 * Created by Atif on 2/3/2017.
 */

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
    transform(value: any, args: any[]): any {
        if (null != value) {
            let split = value.split(' ');
            if (split.length > 0) {
                let _split = split[0].split('-');
                if (_split.length == 3) {
                    return _split[1] + '/' + _split[2] + '/' + _split[0];
                } else {
                    return value;
                }
            }
        }
    }
}