/**
 * Created by Rabbit on 2017/5/15.
 */
export function fetch(obj){
    let method = obj.method || 'GET';
    let params = obj.params || '';
    // let setParams = encod
    console.log(obj.url);
    return new Promise((resolve,reject) => {
        let req = new XMLHttpRequest();
        req.open('GET',obj.url,true);
        req.onload = () => {
            console.log(req);
            resolve(req);
        };
        req.send();
    })
}

