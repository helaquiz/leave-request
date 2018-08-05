// import * as _ from 'lodash'
import { DAL } from '../data-accesss/DAL'
import * as crypto from "crypto"
import * as dateHelper from "./date-helper";

export function trimSpace(data: any) {
    return data.replace(/ /g, '');
}
export function easyPhoneNumber(data: any) {
    return data.replace(/-/g, '');
}
export function removeSymbol(data: string) {
    return data.replace(/-|:/g, '');
}
export function cuteString(data: string) {
    return data.replace(/[\/\\#,+()$~%.'":*?<>{}]/g, '=');
}
export function cuteQueryString(data: string) {
    return '%' + data.replace(/[\/\\#,+()$~%.'":*?<>{}-]/g, '%') + '%'
}
export function genNowCode(b: string) {
    let data = (new Date()).valueOf()
    return b + data;
}
export function cuteSpace(data: string) {
    return data.replace(/ {2,}/g, ' ');
}
export function simpleStringify(object: any) {
    var simpleObject: any = {};
    for (var prop in object) {
        if (!object.hasOwnProperty(prop)) {
            continue;
        }
        if (typeof (object[prop]) == 'object') {
            continue;
        }
        if (typeof (object[prop]) == 'function') {
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject, null, 2); // returns cleaned up JSON
}

export function toJson(data: JSON) {
    return JSON.stringify(data, null, 2);
}