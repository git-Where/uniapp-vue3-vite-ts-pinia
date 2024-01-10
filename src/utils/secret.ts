import CryptoJS from 'crypto-js'

var aesKey = 'TwxgxhARw0hnV8ONz8GOWE6wnFBtKgwP'
var aesIv = 'xdfDA9RUUoZnpGG8'

/**************************************************************
*字符串加密
*   str：需要加密的字符串
****************************************************************/
export function Encrypt (str) {
  var key = CryptoJS.enc.Utf8.parse(aesKey)
  var iv = CryptoJS.enc.Utf8.parse(aesIv)

  var encrypted = ''

  var srcs = CryptoJS.enc.Utf8.parse(str)
  encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  return encrypted.ciphertext.toString()
}
/*
 * 实体加密
 */
export function EntityEncrypt (param) {
  var _data = JSON.stringify(param)
  return Encrypt(_data)
}

/**************************************************************
*字符串解密
*   str：需要解密的字符串
****************************************************************/
export function Decrypt (str) {
  var key = CryptoJS.enc.Utf8.parse(aesKey)
  var iv = CryptoJS.enc.Utf8.parse(aesIv)
  var encryptedHexStr = CryptoJS.enc.Hex.parse(str)
  var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  var decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
