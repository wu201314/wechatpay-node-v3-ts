"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
var superagent_1 = __importDefault(require("superagent"));
var Base = /** @class */ (function () {
    function Base() {
        this.userAgent = '127.0.0.1'; // User-Agent
    }
    /**
     * get 请求参数处理
     * @param object query 请求参数
     * @param exclude 需要排除的字段
     * @returns
     */
    Base.prototype.objectToQueryString = function (object, exclude) {
        if (exclude === void 0) { exclude = []; }
        var str = Object.keys(object)
            .filter(function (key) { return !exclude.includes(key); })
            .map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(object[key]);
        })
            .join('&');
        if (str)
            str = '?' + str;
        return str || '';
    };
    /**
     * 获取请求头
     * @param authorization
     */
    Base.prototype.getHeaders = function (authorization, headers) {
        if (headers === void 0) { headers = {}; }
        return __assign(__assign({}, headers), { Accept: 'application/json', 'User-Agent': this.userAgent, Authorization: authorization, 'Accept-Encoding': 'gzip' });
    };
    /**
     * post 请求
     * @param url  请求接口
     * @param params 请求参数
     * @deprecated 弃用
     */
    Base.prototype.postRequest = function (url, params, authorization) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1, err;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, superagent_1.default
                                .post(url)
                                .send(params)
                                .set({
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                'User-Agent': this.userAgent,
                                Authorization: authorization,
                                'Accept-Encoding': 'gzip',
                            })];
                    case 1:
                        result = _c.sent();
                        return [2 /*return*/, __assign({ status: result.status }, result.body)];
                    case 2:
                        error_1 = _c.sent();
                        err = JSON.parse(JSON.stringify(error_1));
                        return [2 /*return*/, __assign({ status: err.status, errRaw: err }, (((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.text) && JSON.parse((_b = err === null || err === void 0 ? void 0 : err.response) === null || _b === void 0 ? void 0 : _b.text)))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * post 请求 V2
     * @param url  请求接口
     * @param params 请求参数
     * @deprecated 弃用
     */
    Base.prototype.postRequestV2 = function (url_1, params_1, authorization_1) {
        return __awaiter(this, arguments, void 0, function (url, params, authorization, headers) {
            var result, error_2, err;
            var _a;
            if (headers === void 0) { headers = {}; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, superagent_1.default
                                .post(url)
                                .send(params)
                                .set(__assign(__assign({}, headers), { Accept: 'application/json', 'Content-Type': 'application/json', 'User-Agent': this.userAgent, Authorization: authorization, 'Accept-Encoding': 'gzip' }))];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, {
                                status: result.status,
                                data: result.body,
                            }];
                    case 2:
                        error_2 = _b.sent();
                        err = JSON.parse(JSON.stringify(error_2));
                        return [2 /*return*/, {
                                status: err.status,
                                errRaw: err,
                                error: (_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.text,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * get 请求
     * @param url  请求接口
     * @param query 请求参数
     * @deprecated 弃用
     */
    Base.prototype.getRequest = function (url_1, authorization_1) {
        return __awaiter(this, arguments, void 0, function (url, authorization, query) {
            var result, data, error_3, err;
            var _a, _b;
            if (query === void 0) { query = {}; }
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, superagent_1.default
                                .get(url)
                                .query(query)
                                .set({
                                Accept: 'application/json',
                                'User-Agent': this.userAgent,
                                Authorization: authorization,
                                'Accept-Encoding': 'gzip',
                            })];
                    case 1:
                        result = _c.sent();
                        data = {};
                        switch (result.type) {
                            case 'application/json':
                                data = __assign({ status: result.status }, result.body);
                                break;
                            case 'text/plain':
                                data = {
                                    status: result.status,
                                    data: result.text,
                                };
                                break;
                            case 'application/x-gzip':
                                data = {
                                    status: result.status,
                                    data: result.body,
                                };
                                break;
                            default:
                                data = __assign({ status: result.status }, result.body);
                        }
                        return [2 /*return*/, data];
                    case 2:
                        error_3 = _c.sent();
                        err = JSON.parse(JSON.stringify(error_3));
                        return [2 /*return*/, __assign({ status: err.status, errRaw: err }, (((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.text) && JSON.parse((_b = err === null || err === void 0 ? void 0 : err.response) === null || _b === void 0 ? void 0 : _b.text)))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * get 请求 v2
     * @param url  请求接口
     * @param query 请求参数
     * @deprecated 弃用
     */
    Base.prototype.getRequestV2 = function (url_1, authorization_1) {
        return __awaiter(this, arguments, void 0, function (url, authorization, query) {
            var result, data, error_4, err;
            var _a;
            if (query === void 0) { query = {}; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, superagent_1.default
                                .get(url)
                                .query(query)
                                .set({
                                Accept: 'application/json',
                                'User-Agent': this.userAgent,
                                Authorization: authorization,
                                'Accept-Encoding': 'gzip',
                            })];
                    case 1:
                        result = _b.sent();
                        data = {};
                        if (result.type === 'text/plain') {
                            data = {
                                status: result.status,
                                data: result.text,
                            };
                        }
                        else {
                            data = {
                                status: result.status,
                                data: result.body,
                            };
                        }
                        return [2 /*return*/, data];
                    case 2:
                        error_4 = _b.sent();
                        err = JSON.parse(JSON.stringify(error_4));
                        return [2 /*return*/, {
                                status: err.status,
                                errRaw: err,
                                error: (_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.text,
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Base;
}());
exports.Base = Base;
