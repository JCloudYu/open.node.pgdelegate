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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *	Author: cheny
 *	Create: 2021-08-10
**/
var postgres = require("pg");
var PGFormat = require("pg-format");
var URI = require("./lib/uri.js");
var __PGDelegate = new WeakMap();
var PGDelegate = /** @class */ (function () {
    function PGDelegate() {
    }
    PGDelegate.init = function (conn_info) {
        return __awaiter(this, void 0, void 0, function () {
            var _1, _2, _3, _4, _5, conn_options, uri_info, uri_path, sep, db_name, port, instance, pool;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _1 = conn_info.user, _2 = conn_info.password, _3 = conn_info.host, _4 = conn_info.database, _5 = conn_info.port, conn_options = __rest(conn_info, ["user", "password", "host", "database", "port"]);
                        uri_info = new URI(conn_info.uri);
                        uri_path = uri_info.pathname;
                        sep = uri_path.indexOf('/', 1);
                        db_name = uri_path.substring(1, sep <= 0 ? uri_path.length : sep);
                        port = parseInt(uri_info.port || '5432');
                        instance = new PGDelegate();
                        pool = new postgres.Pool(__assign({ user: uri_info.username, password: uri_info.password, host: uri_info.hostname, port: port, database: db_name }, conn_options));
                        __PGDelegate.set(instance, { pool: pool });
                        return [4 /*yield*/, pool.connect()];
                    case 1:
                        // Test connection
                        (_a.sent()).release();
                        return [2 /*return*/, instance];
                }
            });
        });
    };
    PGDelegate.format = function (text, values) {
        return PGFormat(text, values);
    };
    Object.defineProperty(PGDelegate.prototype, "is_connected", {
        get: function () {
            return __PGDelegate.get(this).pool !== null;
        },
        enumerable: false,
        configurable: true
    });
    PGDelegate.prototype.release = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __PGDelegate.get(this).pool.end()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PGDelegate.prototype.query = function (text, values) {
        return __awaiter(this, void 0, void 0, function () {
            var pool, inst_client;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pool = __PGDelegate.get(this).pool;
                        if (!pool)
                            throw new Error("Postgres connection has been dropped!");
                        return [4 /*yield*/, pool.connect()];
                    case 1:
                        inst_client = _a.sent();
                        return [4 /*yield*/, Promise.resolve()
                                .then(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(values !== undefined)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, inst_client.query(text, values)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                        case 2: return [4 /*yield*/, inst_client.query(text)];
                                        case 3: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); })
                                .finally(function () { return inst_client.release(); })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return PGDelegate;
}());
;
exports.default = PGDelegate;
