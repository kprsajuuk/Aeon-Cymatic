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

export {
    DownloadBlob
}