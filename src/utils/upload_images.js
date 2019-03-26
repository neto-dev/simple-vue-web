import Axios from "axios";

var CryptoJS = require("crypto-js");

var apiKey = '659972882336739'
var apiSecret = 't1WIZirbg4jpjKUhIdlrNULp110'
var cloud = 'dqbrwdvns'


export function UploadImage(item, folder = 'default') {
    return new Promise((resolve, reject) => {
        let timestamp = (Date.now() / 1000 | 0).toString();
        let hash_string = 'timestamp=' + timestamp + apiSecret
        let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload'

        let formData = new FormData();

        formData.append('file', item);
        formData.append('timestamp', timestamp);
        formData.append('api_key', apiKey)
        formData.append('signature', CryptoJS.SHA1(hash_string).toString());

        var xhr = new XMLHttpRequest();
        xhr.open("POST", upload_url, true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

        xhr.send(formData);

        xhr.onreadystatechange = function (e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                resolve(response);
            } else if (xhr.status != 200) {
                reject(xhr);
            }
        };
    })
}

export default UploadImage;

// uploadToCloudinary(item) {
//     return new Promise((resolve, reject) => {
//         let format = item.type === 'video/mp4' ? 'video' : 'image'
//         let timestamp = ((Date.now() / 1000) | 0).toString();
//         let hash_string = "timestamp=" + timestamp + plux.cloudinary.api_secret;
//         let upload_url =
//             "https://api.cloudinary.com/v1_1/" +
//             plux.cloudinary.cloud +
//             "/" + format + "/upload";
//         let formdata = new FormData();
//         let encrypted = CryptoJS.SHA1(hash_string).toString();
//         var xhr = new XMLHttpRequest();
//         xhr.open("POST", upload_url, true);
//         xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

//         formdata.append("file", item);
//         formdata.append("timestamp", timestamp);
//         formdata.append("api_key", plux.cloudinary.api_key);
//         formdata.append("signature", encrypted);
//         xhr.send(formdata);

//         xhr.onreadystatechange = function (e) {
//             if (xhr.readyState == 4 && xhr.status == 200) {
//                 var response = JSON.parse(xhr.responseText);
//                 resolve(response);
//             } else if (xhr.status != 200) {
//                 reject(xhr);
//             }
//         };
//     });
// }