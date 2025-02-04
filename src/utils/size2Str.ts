export function size2Str(limit) {
    let size = ''
    if (limit < 1024) {
        // 小于 1KB 转为B
        size = limit.toFixed(2) + 'B'
    } else if (limit < 1024 * 1024) {
        // 小于 1MB 转为KB
        size = (limit / 1024).toFixed(2) + 'KB'
    } else if (limit < 1024 * 1024 * 1024) {
        // 小于 1GB 转为MB
        size = (limit / (1024 * 1024)).toFixed(2) + 'MB'
    } else {
        // 小于 1TB 转为GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
    }
    let sizeStr = size + ''
    let index = sizeStr.indexOf('.')
    let dou = sizeStr.substring(index + 1, index + 3)
    if (dou === '00') {
        return sizeStr.substring(0, index) + sizeStr.substring(index + 3, sizeStr.length)
    }
    return size
}