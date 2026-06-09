let Imagekit = require('imagekit');
// npm i imagekit

let storageInstance = new Imagekit({
    publicKey : "public_5LYLTpvRQ2bj+JlP3T2ojiZuQRY=",
    privateKey : "private_CCc9cG6+MfGVTXCbcbEN1KV6mdg=", 
    urlEndpoint : "https://ik.imagekit.io/041bvb005"
});

let sendFiles = async (file, fileName) => {
    try{
        let options = {
            file,
            fileName,
            folder : "kodex" // kodex names se Imagekit pe file me save hoga
        }
    return await storageInstance.upload(options)
    }catch(err) {
        console.log("error while uploading file to imagekit", err)
    }
}

module.exports = sendFiles;