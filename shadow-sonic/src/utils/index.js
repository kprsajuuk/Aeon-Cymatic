import moment from 'moment';

const DownloadBlob = (data, name='') => {
    let fileName = name || 'test';
    let blob = new Blob([data.data]);
    let objectUrl = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
};

const GetDuration = (str, unit='milliseconds') => {
    let duration = moment.duration(str, unit);
    let hour = duration.hours() > 1 ? duration.hours() + 'h' : '';
    let minute = duration.minutes() + ':';
    let second = duration.seconds().toString();
    if (minute.length < 3){minute = '0' + minute}
    if (second.length < 2){second = '0' + second}
    return hour + minute + second;
}

const getParams = (url) => {
    try {
        url = url.match(/\?([^#]+)/)[1];
        url = decodeURIComponent(url);
        let obj = {}, arr = url.split('&');
        for (let i = 0; i < arr.length; i++) {
            let subArr = arr[i].split('=');
            obj[subArr[0]] = subArr[1];
        }
        return obj;
    } catch (err) {
        return null;
    }
};

export {
    DownloadBlob,
    GetDuration,
    getParams
}