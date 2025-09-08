//import md5 from 'md5';

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

const encryptPassword = (password) => {
    //return md5(password.toString());
}

const getFileNameFromPath = (path) => {
    if (!path) throw("getFileNameFromPath - path is empty!")
    return path.split(/[\\/]/).pop();
}

export {
    getParams,
    formatNumber,
    encryptPassword,
    getFileNameFromPath
}