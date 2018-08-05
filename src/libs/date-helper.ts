/**
 * Date().Now as a string compatible with MySQL datetime format
 */
export function toUtcString(date: Date) {
    return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

/**
 * get YYYYMMdd string from Date object
 */
export function getYYYYMMDD(date: Date) {
    let dd = date.getDate().toString();
    let mm = (date.getMonth() + 1).toString(); //January is 0!
    let yyyy = date.getFullYear().toString();
    if (Number(dd) < 10) dd = '0' + dd;
    if (Number(mm) < 10) mm = '0' + mm;
    return yyyy + mm + dd;
}

/**
 * get YYYY-MM-DD hh:mm:ss  string from Date object
 */
export function getDateTimeString(date: Date) {
    let DD = date.getDate().toString();
    let MM = (date.getMonth() + 1).toString(); //January is 0!
    let YYYY = date.getFullYear().toString();
    let hh = date.getHours().toString();
    let mm = date.getMinutes().toString();
    let ss = date.getSeconds().toString();
    if (Number(DD) < 10) DD = '0' + DD;
    if (Number(MM) < 10) MM = '0' + MM;
    if (Number(hh) < 10) hh = '0' + hh;
    if (Number(mm) < 10) mm = '0' + mm;
    if (Number(ss) < 10) ss = '0' + ss;

    return YYYY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
}

export function getDateForQA(date: Date) {
    let DD = date.getDate().toString();
    let MM = (date.getMonth() + 1).toString(); //January is 0!
    let YYYY = date.getFullYear().toString();
    let hh = date.getHours().toString();
    let mm = date.getMinutes().toString();
    let ss = date.getSeconds().toString();
    if (Number(DD) < 10) DD = '0' + DD;
    if (Number(MM) < 10) MM = '0' + MM;
    if (Number(hh) < 10) hh = '0' + hh;
    if (Number(mm) < 10) mm = '0' + mm;
    if (Number(ss) < 10) ss = '0' + ss;

    return DD + "/" + MM + "/" + YYYY + " " + hh + ":" + mm
}


/**
 * get yyyy-mm-dd string from Date object
 */
export function getDateString(date: Date) {
    let dd = date.getDate().toString();
    let mm = (date.getMonth() + 1).toString(); //January is 0!
    let yyyy = date.getFullYear().toString();
    if (Number(dd) < 10) dd = '0' + dd;
    if (Number(mm) < 10) mm = '0' + mm;
    return yyyy + "-" + mm + "-" + dd;
}

/**
 * get Time HHMMSS string from Date object
 */
export function getNoColonTime(date: Date) {
    let hh = date.getHours().toString();
    let mm = date.getMinutes().toString();
    let ss = date.getSeconds().toString();
    if (Number(hh) < 10) hh = '0' + hh;
    if (Number(mm) < 10) mm = '0' + mm;
    if (Number(ss) < 10) ss = '0' + ss;

    return hh + mm + ss;
}

/**
 * get Time hh:mm:ss string from Date object
 */
export function getTime(date: Date) {
    let hh = date.getHours().toString();
    let mm = date.getMinutes().toString();
    let ss = date.getSeconds().toString();
    if (Number(hh) < 10) hh = '0' + hh;
    if (Number(mm) < 10) mm = '0' + mm;
    if (Number(ss) < 10) ss = '0' + ss;

    return hh + ":" + mm + ":" + ss;
}

/**
 * Add minute to Date()
 */
export function addMinute(date: Date, min: number): Date {
    return new Date(date.getTime() + min * 60000);
}

/**
 * Add second to Date()
 */
export function addSecond(date: Date, sec: number): Date {
    return new Date(date.getTime() + sec * 1000);
}

/*
 * Get UTC Search Boundary.
 */
export function getBoundUTCDate(lowerDate: Date, upperDate: Date): any {
    let fromDate = lowerDate;
    fromDate.setHours(0);
    fromDate.setMinutes(0);
    fromDate.setSeconds(0);
    let monthNo = (fromDate.getUTCMonth() + 1) >= 10 ? fromDate.getUTCMonth() + 1 : `0${fromDate.getUTCMonth() + 1}`;
    let dateNo = fromDate.getUTCDate() >= 10 ? fromDate.getUTCDate() : `0${fromDate.getUTCDate()}`;
    let hrNo = fromDate.getUTCHours() >= 10 ? fromDate.getUTCHours() : `0${fromDate.getUTCHours()}`;
    let minuteNo = fromDate.getUTCMinutes() >= 10 ? fromDate.getUTCMinutes() : `0${fromDate.getUTCMinutes()}`;
    let secondNo = fromDate.getUTCSeconds() >= 10 ? fromDate.getUTCSeconds() : `0${fromDate.getUTCSeconds()}`;
    const lowerDatetime = `${fromDate.getUTCFullYear()}-${monthNo}-${dateNo} ${hrNo}:${minuteNo}:${secondNo}`;

    let toDate = upperDate || lowerDate;
    toDate.setHours(23);
    toDate.setMinutes(59);
    toDate.setSeconds(59);
    monthNo = (toDate.getUTCMonth() + 1) >= 10 ? toDate.getUTCMonth() + 1 : `0${toDate.getUTCMonth() + 1}`;
    dateNo = toDate.getUTCDate() >= 10 ? toDate.getUTCDate() : `0${toDate.getUTCDate()}`;
    hrNo = toDate.getUTCHours() >= 10 ? toDate.getUTCHours() : `0${toDate.getUTCHours()}`;
    minuteNo = toDate.getUTCMinutes() >= 10 ? toDate.getUTCMinutes() : `0${toDate.getUTCMinutes()}`;
    secondNo = toDate.getUTCSeconds() >= 10 ? toDate.getUTCSeconds() : `0${toDate.getUTCSeconds()}`;
    const upperDatetime = `${toDate.getUTCFullYear()}-${monthNo}-${dateNo} ${hrNo}:${minuteNo}:${secondNo}`;

    return {
        from: lowerDatetime,
        to: upperDatetime
    }
}

export function getFirstDayOfMonthUtc() {
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

export function getLastDayOfMonthUtc() {
    let date = new Date();
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
    return lastDay.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

export function getFirstDayOfYearUtc() {
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), 0);
    return firstDay.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

export function getLastDayOfYearUtc() {
    let date = new Date();
    let lastDay = new Date(date.getFullYear() + 1, 0);
    return lastDay.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

export function getTodayUtc() {
    let date = new Date();
    let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return today.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

export function getNotTodayUtc(day: number, hours: number) {
    let date = new Date();
    let lastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + day, hours);
    return lastDay.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

export function getNowplus(date: Date, day: number, hours: number) {
    let today = new Date(date.getFullYear(), date.getMonth(), date.getDate() + day,
        date.getHours() + hours, date.getMinutes(), date.getSeconds());
    return today.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}