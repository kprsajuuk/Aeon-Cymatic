import dayjs from "dayjs";

const getParams = (url: string) => {
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

const formatNumber = (number, round: number = 2, roundUp: boolean = false) => {
    let result = number, cell = number.toString().match(/^(-?)(\d*)(\.(\d+))?$/);
    if (cell) {
        let int = cell[2] || '0', decimal = cell[4];
        result = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if (decimal) {
            let d = decimal.substring(0, round);
            if (roundUp && Number(decimal[round]) >= 5) {
                d = Number(d) + 1
            }
            result = result + '.' + d;
        }
    }
    return result;
}


const getFileNameFromPath = (path) => {
    if (!path) throw("getFileNameFromPath - path is empty!")
    return path.split(/[\\/]/).pop();
}

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

const GetDuration = (time, unit:any="milliseconds") => {
    const d = dayjs.duration(time, unit);
    const hours = String(Math.floor(d.asHours())).padStart(2, "0");
    const minutes = String(d.minutes()).padStart(2, "0");
    const sec = String(d.seconds()).padStart(2, "0");
    return `${hours}:${minutes}:${sec}`;
}

export {
    getParams,
    formatNumber,
    DownloadBlob,
    getFileNameFromPath,
    GetDuration,
}