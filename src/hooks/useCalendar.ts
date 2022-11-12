
// 返回当前是否为闰月
export function useLeapmonth(month: number): boolean {
    let arr = [1, 3, 5, 7, 8, 10, 12]
    return arr.includes(month)
};

export function useLeapyear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0)
};

// 返回中文周几
export function weekday(week: number) {
    switch (week) {
        case 0:
            return "周一";
            break;
        case 1:
            return "周二";
            break;
        case 2:
            return "周三";
            break;
        case 3:
            return "周四";
            break;
        case 4:
            return "周五";
            break;
        case 5:
            return "周六";
            break;
        case 6:
            return "周日";
            break;
    }
};

// 返回当前月有几天
export function useMonthDay(str: string): number {
    let num: number | undefined = undefined;
    if (useLeapmonth(Number(str.split(',')[1]))) {
        num = 31
    } else if (Number(str.split(',')[1]) === 2) {
        if (useLeapyear(Number(str.split(',')[0]))) {
            num = 29
        } else {
            num = 28
        }
    } else {
        num = 30
    }
    return num
}