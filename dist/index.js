'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var crypto_1 = __importDefault(require("crypto"));
var x509_1 = require('@fidm/x509');
var base_1 = require("./lib/base");
var pay_request_1 = require("./lib/pay-request");
var Pay = /** @class */ (function (_super) {
    __extends(Pay, _super);
    function Pay(arg1, mchid, publicKey, privateKey, options) {
        var _this = _super.call(this) || this;
        _this.serial_no = ''; // 证书序列号
        _this.authType = 'WECHATPAY2-SHA256-RSA2048'; // 认证类型，目前为WECHATPAY2-SHA256-RSA2048
        if (arg1 instanceof Object) {
            _this.appid = arg1.appid;
            _this.mchid = arg1.mchid;
            if (arg1.serial_no)
                _this.serial_no = arg1.serial_no;
            _this.publicKey = arg1.publicKey;
            if (!_this.publicKey)
                throw new Error('缺少公钥');
            _this.privateKey = arg1.privateKey;
            if (!arg1.serial_no)
                _this.serial_no = _this.getSN(_this.publicKey);
            _this.authType = arg1.authType || 'WECHATPAY2-SHA256-RSA2048';
            _this.userAgent = arg1.userAgent || '127.0.0.1';
            _this.key = arg1.key;
        }
        else {
            var _optipns = options || {};
            _this.appid = arg1;
            _this.mchid = mchid || '';
            _this.publicKey = publicKey;
            _this.privateKey = privateKey;
            _this.authType = _optipns.authType || 'WECHATPAY2-SHA256-RSA2048';
            _this.userAgent = _optipns.userAgent || '127.0.0.1';
            _this.key = _optipns.key;
            _this.serial_no = _optipns.serial_no || '';
            if (!_this.publicKey)
                throw new Error('缺少公钥');
            if (!_this.serial_no)
                _this.serial_no = _this.getSN(_this.publicKey);
        }
        _this.httpService = new pay_request_1.PayRequest();
        return _this;
    }
    /**
     * 自定义创建http 请求
     */
    Pay.prototype.createHttp = function (service) {
        this.httpService = service;
    };
    /**
     * 获取微信平台key
     * @param apiSecret APIv3密钥
     * @returns
     */
    Pay.prototype.get_certificates = function (apiSecret) {
        return __awaiter(this, void 0, void 0, function () {
            var url, authorization, headers, result, data, _i, data_1, item, decryptCertificate;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = 'https://api.mch.weixin.qq.com/v3/certificates';
                        authorization = this.buildAuthorization('GET', url);
                        headers = this.getHeaders(authorization);
                        return [4 /*yield*/, this.httpService.get(url, headers)];
                    case 1:
                        result = _b.sent();
                        if (result.status === 200) {
                            data = (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.data;
                            for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                                item = data_1[_i];
                                decryptCertificate = this.decipher_gcm(item.encrypt_certificate.ciphertext, item.encrypt_certificate.associated_data, item.encrypt_certificate.nonce, apiSecret);
                                item.publicKey = x509_1.Certificate.fromPEM(Buffer.from(decryptCertificate)).publicKey.toPEM();
                            }
                            return [2 /*return*/, data];
                        }
                        else {
                            throw new Error('拉取平台证书失败');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 拉取平台证书到 Pay.certificates 中
     * @param apiSecret APIv3密钥
     * https://pay.weixin.qq.com/wiki/doc/apiv3/apis/wechatpay5_1.shtml
     */
    Pay.prototype.fetchCertificates = function (apiSecret) {
        return __awaiter(this, void 0, void 0, function () {
            var url, authorization, headers, result, data, newCertificates_1;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        url = 'https://api.mch.weixin.qq.com/v3/certificates';
                        authorization = this.buildAuthorization('GET', url);
                        headers = this.getHeaders(authorization, { 'Content-Type': 'application/json' });
                        return [4 /*yield*/, this.httpService.get(url, headers)];
                    case 1:
                        result = _b.sent();
                        if (result.status === 200) {
                            data = (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.data;
                            newCertificates_1 = {};
                            data.forEach(function (item) {
                                var decryptCertificate = _this.decipher_gcm(item.encrypt_certificate.ciphertext, item.encrypt_certificate.associated_data, item.encrypt_certificate.nonce, apiSecret);
                                newCertificates_1[item.serial_no] = x509_1.Certificate.fromPEM(Buffer.from(decryptCertificate)).publicKey.toPEM();
                            });
                            Pay.certificates = __assign(__assign({}, Pay.certificates), newCertificates_1);
                        }
                        else {
                            throw new Error('拉取平台证书失败');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 验证签名，提醒：node 取头部信息时需要用小写，例如：req.headers['wechatpay-timestamp']
     * @param params.timestamp HTTP头Wechatpay-Timestamp 中的应答时间戳
     * @param params.nonce HTTP头Wechatpay-Nonce 中的应答随机串
     * @param params.body 应答主体（response Body），需要按照接口返回的顺序进行验签，错误的顺序将导致验签失败。
     * @param params.serial HTTP头Wechatpay-Serial 证书序列号
     * @param params.signature HTTP头Wechatpay-Signature 签名
     * @param params.apiSecret APIv3密钥，如果在 构造器 中有初始化该值(this.key)，则可以不传入。当然传入也可以
     */
    Pay.prototype.verifySign = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var timestamp, nonce, body, serial, signature, apiSecret, publicKey, bodyStr, data, verify;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timestamp = params.timestamp, nonce = params.nonce, body = params.body, serial = params.serial, signature = params.signature, apiSecret = params.apiSecret;
                        publicKey = Pay.certificates[serial];
                        if (!!publicKey) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchCertificates(apiSecret)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        publicKey = Pay.certificates[serial];
                        if (!publicKey) {
                            throw new Error('平台证书序列号不相符，未找到平台序列号');
                        }
                        bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
                        data = "".concat(timestamp, "\n").concat(nonce, "\n").concat(bodyStr, "\n");
                        verify = crypto_1.default.createVerify('RSA-SHA256');
                        verify.update(data);
                        return [2 /*return*/, verify.verify(publicKey, signature, 'base64')];
                }
            });
        });
    };
    /**
     * 敏感信息加密
     * @param str 敏感信息字段（如用户的住址、银行卡号、手机号码等）
     * @returns
     */
    Pay.prototype.publicEncrypt = function (str, wxPublicKey, padding) {
        if (padding === void 0) { padding = crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING; }
        if (![crypto_1.default.constants.RSA_PKCS1_PADDING, crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING].includes(padding)) {
            throw new Error("Doesn't supported the padding mode(".concat(padding, "), here's only support RSA_PKCS1_OAEP_PADDING or RSA_PKCS1_PADDING."));
        }
        var encrypted = crypto_1.default.publicEncrypt({ key: wxPublicKey, padding: padding, oaepHash: 'sha1' }, Buffer.from(str, 'utf8')).toString('base64');
        return encrypted;
    };
    /**
     * 敏感信息解密
     * @param str 敏感信息字段（如用户的住址、银行卡号、手机号码等）
     * @returns
     */
    Pay.prototype.privateDecrypt = function (str, padding) {
        if (padding === void 0) { padding = crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING; }
        if (![crypto_1.default.constants.RSA_PKCS1_PADDING, crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING].includes(padding)) {
            throw new Error("Doesn't supported the padding mode(".concat(padding, "), here's only support RSA_PKCS1_OAEP_PADDING or RSA_PKCS1_PADDING."));
        }
        var decrypted = crypto_1.default.privateDecrypt({ key: this.privateKey, padding: padding, oaepHash: 'sha1' }, Buffer.from(str, 'base64'));
        return decrypted.toString('utf8');
    };
    /**
     * 构建请求签名参数
     * @param method Http 请求方式
     * @param url 请求接口 例如/v3/certificates
     * @param timestamp 获取发起请求时的系统当前时间戳
     * @param nonceStr 随机字符串
     * @param body 请求报文主体
     */
    Pay.prototype.getSignature = function (method, nonce_str, timestamp, url, body) {
        var str = method + '\n' + url + '\n' + timestamp + '\n' + nonce_str + '\n';
        if (body && body instanceof Object)
            body = JSON.stringify(body);
        if (body)
            str = str + body + '\n';
        if (method === 'GET')
            str = str + '\n';
        return this.sha256WithRsa(str);
    };
    // jsapi 和 app 支付参数签名 加密自动顺序如下 不能错乱
    // 应用id
    // 时间戳
    // 随机字符串
    // 预支付交易会话ID
    Pay.prototype.sign = function (str) {
        return this.sha256WithRsa(str);
    };
    // 获取序列号
    Pay.prototype.getSN = function (fileData) {
        if (!fileData && !this.publicKey)
            throw new Error('缺少公钥');
        if (!fileData)
            fileData = this.publicKey;
        if (typeof fileData == 'string') {
            fileData = Buffer.from(fileData);
        }
        var certificate = x509_1.Certificate.fromPEM(fileData);
        return certificate.serialNumber;
    };
    /**
     * SHA256withRSA
     * @param data 待加密字符
     * @param privatekey 私钥key  key.pem   fs.readFileSync(keyPath)
     */
    Pay.prototype.sha256WithRsa = function (data) {
        if (!this.privateKey)
            throw new Error('缺少秘钥文件');
        return crypto_1.default
            .createSign('RSA-SHA256')
            .update(data)
            .sign(this.privateKey, 'base64');
    };
    /**
     * 获取授权认证信息
     * @param nonceStr  请求随机串
     * @param timestamp 时间戳
     * @param signature 签名值
     */
    Pay.prototype.getAuthorization = function (nonce_str, timestamp, signature) {
        var _authorization = 'mchid="' +
            this.mchid +
            '",' +
            'nonce_str="' +
            nonce_str +
            '",' +
            'timestamp="' +
            timestamp +
            '",' +
            'serial_no="' +
            this.serial_no +
            '",' +
            'signature="' +
            signature +
            '"';
        return this.authType.concat(' ').concat(_authorization);
    };
    /**
     * 回调解密
     * @param ciphertext  Base64编码后的开启/停用结果数据密文
     * @param associated_data 附加数据
     * @param nonce 加密使用的随机串
     * @param key  APIv3密钥
     */
    Pay.prototype.decipher_gcm = function (ciphertext, associated_data, nonce, key) {
        if (!key)
            key = this.key;
        if (!key)
            throw new Error('缺少key');
        var _ciphertext = Buffer.from(ciphertext, 'base64');
        // 解密 ciphertext字符  AEAD_AES_256_GCM算法
        var authTag = _ciphertext.slice(_ciphertext.length - 16);
        var data = _ciphertext.slice(0, _ciphertext.length - 16);
        var decipher = crypto_1.default.createDecipheriv('aes-256-gcm', key, nonce);
        decipher.setAuthTag(authTag);
        decipher.setAAD(Buffer.from(associated_data));
        var decoded = decipher.update(data, undefined, 'utf8');
        try {
            return JSON.parse(decoded);
        }
        catch (e) {
            return decoded;
        }
    };
    /**
     * 参数初始化
     */
    Pay.prototype.buildAuthorization = function (method, url, params) {
        var nonce_str = Math.random()
            .toString(36)
            .substr(2, 15), timestamp = parseInt(+new Date() / 1000 + '').toString();
        var signature = this.getSignature(method, nonce_str, timestamp, url.replace('https://api.mch.weixin.qq.com', ''), params);
        var authorization = this.getAuthorization(nonce_str, timestamp, signature);
        return authorization;
    };
    //#region 支付相关接口
    /**
     * h5支付
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_3_1.shtml
     */
    Pay.prototype.transactions_h5 = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _params, url, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _params = __assign({ appid: this.appid, mchid: this.mchid }, params);
                        url = 'https://api.mch.weixin.qq.com/v3/pay/transactions/h5';
                        authorization = this.buildAuthorization('POST', url, _params);
                        headers = this.getHeaders(authorization, { 'Content-Type': 'application/json' });
                        return [4 /*yield*/, this.httpService.post(url, _params, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 合单h5支付
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter5_1_2.shtml
     */
    Pay.prototype.combine_transactions_h5 = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _params, url, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _params = __assign({ combine_appid: this.appid, combine_mchid: this.mchid }, params);
                        url = 'https://api.mch.weixin.qq.com/v3/combine-transactions/h5';
                        authorization = this.buildAuthorization('POST', url, _params);
                        headers = this.getHeaders(authorization, { 'Content-Type': 'application/json' });
                        return [4 /*yield*/, this.httpService.post(url, _params, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * native支付
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_4_1.shtml
     */
    Pay.prototype.transactions_native = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _params, url, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _params = __assign({ appid: this.appid, mchid: this.mchid }, params);
                        url = 'https://api.mch.weixin.qq.com/v3/pay/transactions/native';
                        authorization = this.buildAuthorization('POST', url, _params);
                        headers = this.getHeaders(authorization, { 'Content-Type': 'application/json' });
                        return [4 /*yield*/, this.httpService.post(url, _params, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 合单native支付
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter5_1_5.shtml
     */
    Pay.prototype.combine_transactions_native = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _params, url, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _params = __assign({ combine_appid: this.appid, combine_mchid: this.mchid }, params);
                        url = 'https://api.mch.weixin.qq.com/v3/combine-transactions/native';
                        authorization = this.buildAuthorization('POST', url, _params);
                        headers = this.getHeaders(authorization, { 'Content-Type': 'application/json' });
                        return [4 /*yield*/, this.httpService.post(url, _params, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * app支付
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_2_1.shtml
     */
    Pay.prototype.transactions_app = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _params, url, authorization, headers, result, data, str;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _params = __assign({ appid: this.appid, mchid: this.mchid }, params);
                        url = 'https://api.mch.weixin.qq.com/v3/pay/transactions/app';
                        authorization = this.buildAuthorization('POST', url, _params);
                        headers = this.getHeaders(authorization, { 'Content-Type': 'application/json' });
                        return [4 /*yield*/, this.httpService.post(url, _params, headers)];
                    case 1:
                        result = _a.sent();
                        if (result.status === 200 && result.data.prepay_id) {
                            data = {
                                appid: _params.appid,
                                partnerid: _params.mchid,
                                package: 'Sign=WXPay',
                                timestamp: parseInt(+new Date() / 1000 + '').toString(),
                                noncestr: Math.random()
                                    .toString(36)
                                    .substr(2, 15),
                                prepayid: result.data.prepay_id,
                                sign: '',
                            };
                            str = [data.appid, data.timestamp, data.noncestr, data.prepayid, ''].join('\n');
                            data.sign = this.sign(str);
                            result.data = data;
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 合单app支付
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter5_1_1.shtml
     */
    Pay.prototype.combine_transactions_app = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _params, url, authorization, headers, result, data, str;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _params = __assign({ combine_appid: this.appid, combine_mchid: this.mchid }, params);
                        url = 'https://api.mch.weixin.qq.com/v3/combine-transactions/app';
                        authorization = this.buildAuthorization('POST', url, _params);
                        headers = this.getHeaders(authorization, { 'Content-Type': 'application/json' });
                        return [4 /*yield*/, this.httpService.post(url, _params, headers)];
                    case 1:
                        result = _a.sent();
                        if (result.status === 200 && result.data.prepay_id) {
                            data = {
                                appid: _params.combine_appid,
                                partnerid: _params.combine_mchid,
                                package: 'Sign=WXPay',
                                timestamp: parseInt(+new Date() / 1000 + '').toString(),
                                noncestr: Math.random()
                                    .toString(36)
                                    .substr(2, 15),
                                prepayid: result.data.prepay_id,
                                sign: '',
                            };
                            str = [data.appid, data.timestamp, data.noncestr, data.prepayid, ''].join('\n');
                            data.sign = this.sign(str);
                            result.data = data;
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * JSAPI支付 或者 小程序支付
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_1_1.shtml
     */
    Pay.prototype.transactions_jsapi = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _params, url, authorization, headers, result, data, str;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _params = __assign({ appid: this.appid, mchid: this.mchid }, params);
                        url = 'https://api.mch.weixin.qq.com/v3/pay/transactions/jsapi';
                        authorization = this.buildAuthorization('POST', url, _params);
                        headers = this.getHeaders(authorization, { 'Content-Type': 'application/json' });
                        return [4 /*yield*/, this.httpService.post(url, _params, headers)];
                    case 1:
                        result = _a.sent();
                        if (result.status === 200 && result.data.prepay_id) {
                            data = {
                                appId: _params.appid,
                                timeStamp: parseInt(+new Date() / 1000 + '').toString(),
                                nonceStr: Math.random()
                                    .toString(36)
                                    .substr(2, 15),
                                package: "prepay_id=".concat(result.data.prepay_id),
                                signType: 'RSA',
                                paySign: '',
                            };
                            str = [data.appId, data.timeStamp, data.nonceStr, data.package, ''].join('\n');
                            data.paySign = this.sign(str);
                            result.data = data;
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 合单JSAPI支付 或者 小程序支付
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter5_1_3.shtml
     */
    Pay.prototype.combine_transactions_jsapi = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _params, url, authorization, headers, result, data, str;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _params = __assign({ combine_appid: this.appid, combine_mchid: this.mchid }, params);
                        url = 'https://api.mch.weixin.qq.com/v3/combine-transactions/jsapi';
                        authorization = this.buildAuthorization('POST', url, _params);
                        headers = this.getHeaders(authorization, { 'Content-Type': 'application/json' });
                        return [4 /*yield*/, this.httpService.post(url, _params, headers)];
                    case 1:
                        result = _a.sent();
                        if (result.status === 200 && result.data.prepay_id) {
                            data = {
                                appId: _params.combine_appid,
                                timeStamp: parseInt(+new Date() / 1000 + '').toString(),
                                nonceStr: Math.random()
                                    .toString(36)
                                    .substr(2, 15),
                                package: "prepay_id=".concat(result.data.prepay_id),
                                signType: 'RSA',
                                paySign: '',
                            };
                            str = [data.appId, data.timeStamp, data.nonceStr, data.package, ''].join('\n');
                            data.paySign = this.sign(str);
                            result.data = data;
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 查询订单
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_3_2.shtml
     */
    Pay.prototype.query = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = '';
                        if (params.transaction_id) {
                            url = "https://api.mch.weixin.qq.com/v3/pay/transactions/id/".concat(params.transaction_id, "?mchid=").concat(this.mchid);
                        }
                        else if (params.out_trade_no) {
                            url = "https://api.mch.weixin.qq.com/v3/pay/transactions/out-trade-no/".concat(params.out_trade_no, "?mchid=").concat(this.mchid);
                        }
                        else {
                            throw new Error('缺少transaction_id或者out_trade_no');
                        }
                        authorization = this.buildAuthorization('GET', url);
                        headers = this.getHeaders(authorization);
                        return [4 /*yield*/, this.httpService.get(url, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 合单查询订单
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter5_1_11.shtml
     */
    Pay.prototype.combine_query = function (combine_out_trade_no) {
        return __awaiter(this, void 0, void 0, function () {
            var url, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!combine_out_trade_no)
                            throw new Error('缺少combine_out_trade_no');
                        url = "https://api.mch.weixin.qq.com/v3/combine-transactions/out-trade-no/".concat(combine_out_trade_no);
                        authorization = this.buildAuthorization('GET', url);
                        headers = this.getHeaders(authorization);
                        return [4 /*yield*/, this.httpService.get(url, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 关闭订单
     * @param out_trade_no 请求参数 商户订单号 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_3_3.shtml
     */
    Pay.prototype.close = function (out_trade_no) {
        return __awaiter(this, void 0, void 0, function () {
            var _params, url, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!out_trade_no)
                            throw new Error('缺少out_trade_no');
                        _params = {
                            mchid: this.mchid,
                        };
                        url = "https://api.mch.weixin.qq.com/v3/pay/transactions/out-trade-no/".concat(out_trade_no, "/close");
                        authorization = this.buildAuthorization('POST', url, _params);
                        headers = this.getHeaders(authorization, { 'Content-Type': 'application/json' });
                        return [4 /*yield*/, this.httpService.post(url, _params, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 合单关闭订单
     * @param combine_out_trade_no 请求参数 总订单号 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter5_1_12.shtml
     * @param sub_orders array 子单信息
     */
    Pay.prototype.combine_close = function (combine_out_trade_no, sub_orders) {
        return __awaiter(this, void 0, void 0, function () {
            var _params, url, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!combine_out_trade_no)
                            throw new Error('缺少out_trade_no');
                        _params = {
                            combine_appid: this.appid,
                            sub_orders: sub_orders,
                        };
                        url = "https://api.mch.weixin.qq.com/v3/combine-transactions/out-trade-no/".concat(combine_out_trade_no, "/close");
                        authorization = this.buildAuthorization('POST', url, _params);
                        headers = this.getHeaders(authorization, { 'Content-Type': 'application/json' });
                        return [4 /*yield*/, this.httpService.post(url, _params, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 申请交易账单
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_1_6.shtml
     */
    Pay.prototype.tradebill = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, _params, querystring, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://api.mch.weixin.qq.com/v3/bill/tradebill';
                        _params = __assign({}, params);
                        querystring = Object.keys(_params)
                            .filter(function (key) {
                            return !!_params[key];
                        })
                            .sort()
                            .map(function (key) {
                            return key + '=' + _params[key];
                        })
                            .join('&');
                        url = url + "?".concat(querystring);
                        authorization = this.buildAuthorization('GET', url);
                        headers = this.getHeaders(authorization);
                        return [4 /*yield*/, this.httpService.get(url, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 申请资金账单
     * @param params 请求参数 object 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_1_7.shtml
     */
    Pay.prototype.fundflowbill = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, _params, querystring, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://api.mch.weixin.qq.com/v3/bill/fundflowbill';
                        _params = __assign({}, params);
                        querystring = Object.keys(_params)
                            .filter(function (key) {
                            return !!_params[key];
                        })
                            .sort()
                            .map(function (key) {
                            return key + '=' + _params[key];
                        })
                            .join('&');
                        url = url + "?".concat(querystring);
                        authorization = this.buildAuthorization('GET', url);
                        headers = this.getHeaders(authorization);
                        return [4 /*yield*/, this.httpService.get(url, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 下载账单
     * @param download_url 请求参数 路径 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_1_8.shtml
     */
    Pay.prototype.downloadBill = function (download_url) {
        return __awaiter(this, void 0, void 0, function () {
            var authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authorization = this.buildAuthorization('GET', download_url);
                        headers = this.getHeaders(authorization);
                        return [4 /*yield*/, this.httpService.get(download_url, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 申请退款
     * @param params 请求参数 路径 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_2_9.shtml
     */
    Pay.prototype.refunds = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, _params, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://api.mch.weixin.qq.com/v3/refund/domestic/refunds';
                        _params = __assign({}, params);
                        authorization = this.buildAuthorization('POST', url, _params);
                        headers = this.getHeaders(authorization, { 'Content-Type': 'application/json' });
                        return [4 /*yield*/, this.httpService.post(url, _params, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 查询单笔退款
     * @documentation 请求参数 路径 参数介绍 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_2_10.shtml
     */
    Pay.prototype.find_refunds = function (out_refund_no) {
        return __awaiter(this, void 0, void 0, function () {
            var url, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!out_refund_no)
                            throw new Error('缺少out_refund_no');
                        url = "https://api.mch.weixin.qq.com/v3/refund/domestic/refunds/".concat(out_refund_no);
                        authorization = this.buildAuthorization('GET', url);
                        headers = this.getHeaders(authorization);
                        return [4 /*yield*/, this.httpService.get(url, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //#endregion 支付相关接口
    //#region 商家转账到零钱
    /**
     * 发起商家转账零钱
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter4_3_1.shtml
     */
    Pay.prototype.batches_transfer = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, _params, serial_no, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://api.mch.weixin.qq.com/v3/transfer/batches';
                        _params = __assign({ appid: this.appid }, params);
                        serial_no = _params === null || _params === void 0 ? void 0 : _params.wx_serial_no;
                        delete _params.wx_serial_no;
                        authorization = this.buildAuthorization('POST', url, _params);
                        headers = this.getHeaders(authorization, { 'Wechatpay-Serial': serial_no || this.serial_no, 'Content-Type': 'application/json' });
                        return [4 /*yield*/, this.httpService.post(url, _params, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 微信批次单号查询批次单API
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter4_3_2.shtml
     */
    Pay.prototype.query_batches_transfer_list_wx = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, url, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = "https://api.mch.weixin.qq.com/v3/transfer/batches/batch-id/".concat(params.batch_id);
                        url = baseUrl + this.objectToQueryString(params, ['batch_id']);
                        authorization = this.buildAuthorization('GET', url);
                        headers = this.getHeaders(authorization);
                        return [4 /*yield*/, this.httpService.get(url, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 微信明细单号查询明细单API
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter4_3_3.shtml
     */
    Pay.prototype.query_batches_transfer_detail_wx = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, url, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = "https://api.mch.weixin.qq.com/v3/transfer/batches/batch-id/".concat(params.batch_id, "/details/detail-id/").concat(params.detail_id);
                        url = baseUrl + this.objectToQueryString(params, ['batch_id', 'detail_id']);
                        authorization = this.buildAuthorization('GET', url);
                        headers = this.getHeaders(authorization);
                        return [4 /*yield*/, this.httpService.get(url, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 商家批次单号查询批次单API
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter4_3_5.shtml
     */
    Pay.prototype.query_batches_transfer_list = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, url, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = "https://api.mch.weixin.qq.com/v3/transfer/batches/out-batch-no/".concat(params.out_batch_no);
                        url = baseUrl + this.objectToQueryString(params, ['out_batch_no']);
                        authorization = this.buildAuthorization('GET', url);
                        headers = this.getHeaders(authorization);
                        return [4 /*yield*/, this.httpService.get(url, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 商家明细单号查询明细单API
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter4_3_6.shtml
     */
    Pay.prototype.query_batches_transfer_detail = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var baseUrl, url, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = "https://api.mch.weixin.qq.com/v3/transfer/batches/out-batch-no/".concat(params.out_batch_no, "/details/out-detail-no/").concat(params.out_detail_no);
                        url = baseUrl + this.objectToQueryString(params, ['out_batch_no', 'out_detail_no']);
                        authorization = this.buildAuthorization('GET', url);
                        headers = this.getHeaders(authorization);
                        return [4 /*yield*/, this.httpService.get(url, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //#endregion 商家转账到零钱
    //#region 分账
    /**
     * 请求分账API
     * @param params
     * @returns
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter8_1_1.shtml
     */
    Pay.prototype.create_profitsharing_orders = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, _params, serial_no, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://api.mch.weixin.qq.com/v3/profitsharing/orders';
                        _params = __assign({ appid: this.appid }, params);
                        serial_no = _params === null || _params === void 0 ? void 0 : _params.wx_serial_no;
                        delete _params.wx_serial_no;
                        authorization = this.buildAuthorization('POST', url, _params);
                        headers = this.getHeaders(authorization, { 'Wechatpay-Serial': serial_no || this.serial_no, 'Content-Type': 'application/json' });
                        return [4 /*yield*/, this.httpService.post(url, _params, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 查询分账结果API
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter8_1_2.shtml
     */
    Pay.prototype.query_profitsharing_orders = function (transaction_id, out_order_no) {
        return __awaiter(this, void 0, void 0, function () {
            var url, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!transaction_id)
                            throw new Error('缺少transaction_id');
                        if (!out_order_no)
                            throw new Error('缺少out_order_no');
                        url = "https://api.mch.weixin.qq.com/v3/profitsharing/orders/".concat(out_order_no);
                        url = url + this.objectToQueryString({ transaction_id: transaction_id });
                        authorization = this.buildAuthorization('GET', url);
                        headers = this.getHeaders(authorization);
                        return [4 /*yield*/, this.httpService.get(url, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 请求分账回退API
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter8_1_3.shtml
     */
    Pay.prototype.profitsharing_return_orders = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, _params, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://api.mch.weixin.qq.com/v3/profitsharing/return-orders';
                        _params = __assign({}, params);
                        authorization = this.buildAuthorization('POST', url, _params);
                        headers = this.getHeaders(authorization, { 'Content-Type': 'application/json' });
                        return [4 /*yield*/, this.httpService.post(url, _params, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 查询分账回退结果API
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter8_1_4.shtml
     */
    Pay.prototype.query_profitsharing_return_orders = function (out_return_no, out_order_no) {
        return __awaiter(this, void 0, void 0, function () {
            var url, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!out_return_no)
                            throw new Error('缺少out_return_no');
                        if (!out_order_no)
                            throw new Error('缺少out_order_no');
                        url = "https://api.mch.weixin.qq.com/v3/profitsharing/return-orders/".concat(out_return_no);
                        url = url + this.objectToQueryString({ out_order_no: out_order_no });
                        authorization = this.buildAuthorization('GET', url);
                        headers = this.getHeaders(authorization);
                        return [4 /*yield*/, this.httpService.get(url, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 解冻剩余资金API
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter8_1_5.shtml
     */
    Pay.prototype.profitsharing_orders_unfreeze = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, _params, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://api.mch.weixin.qq.com/v3/profitsharing/orders/unfreeze';
                        _params = __assign({}, params);
                        authorization = this.buildAuthorization('POST', url, _params);
                        headers = this.getHeaders(authorization, { 'Content-Type': 'application/json' });
                        return [4 /*yield*/, this.httpService.post(url, _params, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 查询剩余待分金额API
     * @documentation 请看文档https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter8_1_6.shtml
     */
    Pay.prototype.query_profitsharing_amounts = function (transaction_id) {
        return __awaiter(this, void 0, void 0, function () {
            var url, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!transaction_id)
                            throw new Error('缺少transaction_id');
                        url = "https://api.mch.weixin.qq.com/v3/profitsharing/transactions/".concat(transaction_id, "/amounts");
                        authorization = this.buildAuthorization('GET', url);
                        headers = this.getHeaders(authorization);
                        return [4 /*yield*/, this.httpService.get(url, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 添加分账接收方API
     * @documentation https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter8_1_8.shtml
     */
    Pay.prototype.profitsharing_receivers_add = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, _params, serial_no, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://api.mch.weixin.qq.com/v3/profitsharing/receivers/add';
                        _params = __assign({ appid: this.appid }, params);
                        serial_no = _params === null || _params === void 0 ? void 0 : _params.wx_serial_no;
                        delete _params.wx_serial_no;
                        authorization = this.buildAuthorization('POST', url, _params);
                        headers = this.getHeaders(authorization, { 'Wechatpay-Serial': serial_no || this.serial_no, 'Content-Type': 'application/json' });
                        return [4 /*yield*/, this.httpService.post(url, _params, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 删除分账接收方API
     * @documentation https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter8_1_9.shtml
     */
    Pay.prototype.profitsharing_receivers_delete = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, _params, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://api.mch.weixin.qq.com/v3/profitsharing/receivers/delete';
                        _params = __assign({ appid: this.appid }, params);
                        authorization = this.buildAuthorization('POST', url, _params);
                        headers = this.getHeaders(authorization, { 'Content-Type': 'application/json' });
                        return [4 /*yield*/, this.httpService.post(url, _params, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 申请分账账单API
     * @documentation https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter8_1_11.shtml
     */
    Pay.prototype.profitsharing_bills = function (bill_date, tar_type) {
        return __awaiter(this, void 0, void 0, function () {
            var url, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!bill_date)
                            throw new Error('缺少bill_date');
                        url = "https://api.mch.weixin.qq.com/v3/profitsharing/bills";
                        url = url + this.objectToQueryString(__assign({ bill_date: bill_date }, (tar_type && { tar_type: tar_type })));
                        authorization = this.buildAuthorization('GET', url);
                        headers = this.getHeaders(authorization);
                        return [4 /*yield*/, this.httpService.get(url, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //#endregion 分账
    Pay.prototype.upload_images = function (pic_buffer, filename) {
        return __awaiter(this, void 0, void 0, function () {
            var fileinfo, sign, url, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileinfo = {
                            filename: filename,
                            sha256: '',
                        };
                        sign = crypto_1.default.createHash('sha256');
                        sign.update(pic_buffer);
                        fileinfo.sha256 = sign.digest('hex');
                        url = '/v3/merchant/media/upload';
                        authorization = this.buildAuthorization('POST', url, fileinfo);
                        headers = this.getHeaders(authorization, { 'Content-Type': 'multipart/form-data;boundary=boundary' });
                        return [4 /*yield*/, this.httpService.post(url, {
                                fileinfo: fileinfo,
                                pic_buffer: pic_buffer,
                            }, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 商家转账用户确认模式下，用户申请收款时，商户可通过此接口申请创建转账单
     */
    Pay.prototype.transfer_bills = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, _params, serial_no, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://api.mch.weixin.qq.com/v3/fund-app/mch-transfer/transfer-bills';
                        _params = __assign({ appid: this.appid }, params);
                        serial_no = _params === null || _params === void 0 ? void 0 : _params.wx_serial_no;
                        delete _params.wx_serial_no;
                        authorization = this.buildAuthorization('POST', url, _params);
                        headers = this.getHeaders(authorization, { 'Wechatpay-Serial': serial_no || this.serial_no, 'Content-Type': 'application/json' });
                        return [4 /*yield*/, this.httpService.post(url, _params, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 商户通过转账接口发起付款后，在用户确认收款之前可以通过该接口撤销付款
     */
    Pay.prototype.transfer_cancel = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, _params, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.mch.weixin.qq.com/v3/fund-app/mch-transfer/transfer-bills/out-bill-no/".concat(params.out_bill_no, "/cancel");
                        _params = __assign({ appid: this.appid }, params);
                        authorization = this.buildAuthorization('POST', url, _params);
                        headers = this.getHeaders(authorization, { mchid: this.mchid });
                        return [4 /*yield*/, this.httpService.post(url, params, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 商家转账用户确认模式下，根据商户单号查询转账单的详细信息
     */
    Pay.prototype.transfer_out_bill_no = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.mch.weixin.qq.com/v3/fund-app/mch-transfer/transfer-bills/out-bill-no/".concat(params.out_bill_no);
                        authorization = this.buildAuthorization('GET', url);
                        headers = this.getHeaders(authorization, { mchid: this.mchid });
                        return [4 /*yield*/, this.httpService.get(url, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 商家转账用户确认模式下，根据微信转账单号查询转账单的详细信息
     */
    Pay.prototype.transfer_bill_no = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, authorization, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.mch.weixin.qq.com/v3/fund-app/mch-transfer/transfer-bills/transfer-bill-no/".concat(params.transfer_bill_no);
                        authorization = this.buildAuthorization('GET', url);
                        headers = this.getHeaders(authorization, { mchid: this.mchid });
                        return [4 /*yield*/, this.httpService.get(url, headers)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Pay.certificates = {}; // 微信平台证书 key 是 serialNo, value 是 publicKey
    return Pay;
}(base_1.Base));
module.exports = Pay;
