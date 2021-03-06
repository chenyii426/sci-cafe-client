import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "userDataFilter"
})

export class UserDataFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row=>row.firstName.toLowerCase().indexOf(query) > -1);
        }
        return array;
    }
}