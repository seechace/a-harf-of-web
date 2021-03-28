import { store as myAddress } from './getStore'

/**
 * 直接执行函数，信息记录至公共Store
 * @returns 获取网络定位
 */

export function getPosition() {
    if (window.navigator.geolocation) {
        let requestNum = 0;
        function startFn (){
            window.navigator.geolocation.getCurrentPosition(
                //这里为了避免赋值操作在位置信息返回之前执行，所以延迟一秒赋值
                async function (position) {
                    await delay(1000);
                    if (position) {
                        requestNum = 0;
                        myAddress.addressRef.value = `经度：${position.coords.longitude.toFixed(2)} / 纬度：${position.coords.latitude.toFixed(2)}`
                        console.log(myAddress.addressRef.value);
                    } else {
                        //失败后递归执行，如果请求数次仍然不成功，则不再执行
                        requestNum++;
                        if(requestNum < 5){
                            startFn();
                        }else{
                            alert("定位获取失败，请检查网络")
                        }
                    }
                },
                function (msg) {
                    alert(msg);
                }
            );
        }
        startFn();
    }
};


/**
 * 配合 async 与 await 使用
 * @param {Number} time 传入一个要延迟的毫秒数,默认1000
 * @returns 返回一个在延迟毫秒数之后resolve的Promise
 */
export function delay(time = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}