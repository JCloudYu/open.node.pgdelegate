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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PGTypes = exports.PGDelegate = void 0;
var postgres = require("pg");
var fs = require("fs");
var path = require("path");
var PGFormat = require("pg-format-fix");
var URI = require("./lib/uri.js");
;
;
;
var BASE_DIR = process.cwd();
var __PGDelegate = new WeakMap();
var ____DEFAULT_SERIALIZER = function (value) { return value; };
var ____serializer = ____DEFAULT_SERIALIZER;
var PGDelegate = /** @class */ (function () {
    function PGDelegate() {
    }
    PGDelegate.setTypeParser = function (oid, parser) {
        postgres.types.setTypeParser(oid, parser);
        return this;
    };
    PGDelegate.getTypeParser = function (oid) {
        var result = postgres.types.getTypeParser(oid);
        return result;
    };
    PGDelegate.setTypeSerializer = function (serializer) {
        if (typeof serializer !== "function")
            return;
        ____serializer = serializer;
    };
    PGDelegate.getTypeSerializer = function () {
        return ____serializer;
    };
    PGDelegate.init = function (conn_info) {
        return __awaiter(this, void 0, void 0, function () {
            var _1, _2, _3, _4, _5, conn_options, uri_info, uri_path, sep, db_name, port, search_params, ssl_mode, ssl_info, ca_path, cert_path, key_path, instance, pool;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _1 = conn_info.user, _2 = conn_info.password, _3 = conn_info.host, _4 = conn_info.database, _5 = conn_info.port, conn_options = __rest(conn_info, ["user", "password", "host", "database", "port"]);
                        uri_info = new URI(conn_info.uri);
                        uri_path = uri_info.pathname;
                        sep = uri_path.indexOf('/', 1);
                        db_name = uri_path.substring(1, sep <= 0 ? uri_path.length : sep);
                        port = parseInt(uri_info.port || '5432');
                        search_params = new URLSearchParams(uri_info.search || '');
                        ssl_mode = search_params.get('sslmode');
                        if (!ssl_mode || ssl_mode === 'disable') {
                            delete conn_options.ssl;
                        }
                        else {
                            ssl_info = conn_options.ssl;
                            if (ssl_info === undefined || typeof ssl_info === "boolean") {
                                ssl_info = {};
                            }
                            else {
                                if (typeof ssl_info.ca_file === "string") {
                                    ca_path = path.resolve(BASE_DIR, ssl_info.ca_file);
                                    ssl_info.ca = fs.readFileSync(ca_path).toString('utf8');
                                    ssl_info.ca_file = undefined;
                                }
                                if (typeof ssl_info.cert_file === "string") {
                                    cert_path = path.resolve(BASE_DIR, ssl_info.cert_file);
                                    ssl_info.cert = fs.readFileSync(cert_path).toString('utf8');
                                    ssl_info.cert_file = undefined;
                                }
                                if (typeof ssl_info.key_file === "string") {
                                    key_path = path.resolve(BASE_DIR, ssl_info.key_file);
                                    ssl_info.key = fs.readFileSync(key_path).toString('utf8');
                                    ssl_info.key_file = undefined;
                                }
                            }
                            switch (ssl_mode) {
                                case 'allow':
                                case 'prefer':
                                case 'require':
                                    conn_options.ssl = Object.assign({
                                        rejectUnauthorized: false
                                    }, ssl_info);
                                    break;
                                case 'verify-ca':
                                case 'verify-full':
                                    conn_options.ssl = Object.assign({
                                        rejectUnauthorized: true
                                    }, ssl_info);
                                    break;
                                default:
                                    throw new RangeError("Invalid SSL mode: ".concat(ssl_mode));
                            }
                        }
                        instance = new PGDelegate();
                        pool = new postgres.Pool(__assign({ user: decodeURIComponent(uri_info.username || ''), password: decodeURIComponent(uri_info.password || ''), host: uri_info.hostname, port: port, database: decodeURIComponent(db_name) }, conn_options));
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
        if (values === void 0) { values = {}; }
        if (Array.isArray(values)) {
            return PGFormat.apply(void 0, __spreadArray([text], values, false));
        }
        else if (Object(values) === values) {
            var result = ParseVarMap(text, values);
            return PGFormat.apply(void 0, __spreadArray([result.sql], result.values, false));
        }
        else {
            throw Object.assign(new TypeError("Given values must be an object or an array!"), { text: text, values: values });
        }
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
                                var incomint_values;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(values !== undefined)) return [3 /*break*/, 2];
                                            incomint_values = values.map(____serializer);
                                            return [4 /*yield*/, inst_client.query(text, incomint_values)];
                                        case 1: 
                                        // @ts-ignore
                                        return [2 /*return*/, _a.sent()];
                                        case 2: return [4 /*yield*/, inst_client.query(text)];
                                        case 3: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); })
                                .catch(function (e) {
                                e.sql = text;
                                e.values = values;
                                return Promise.reject(e);
                            })
                                .finally(function () { return inst_client.release(); })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PGDelegate.prototype.exec = function (text, values) {
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
                                var result, incomint_values, final_sql;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(values !== undefined)) return [3 /*break*/, 2];
                                            result = ParseVarMap(text, values || {});
                                            incomint_values = result.values.map(____serializer);
                                            final_sql = PGFormat.apply(void 0, __spreadArray([result.sql], incomint_values, false));
                                            return [4 /*yield*/, inst_client.query(final_sql)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                        case 2: return [4 /*yield*/, inst_client.query(text)];
                                        case 3: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); })
                                .catch(function (e) {
                                e.sql = text;
                                e.values = values;
                                return Promise.reject(e);
                            })
                                .finally(function () { return inst_client.release(); })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return PGDelegate;
}());
exports.PGDelegate = PGDelegate;
;
var PGTypes;
(function (PGTypes) {
    PGTypes[PGTypes["BOOL"] = 16] = "BOOL";
    PGTypes[PGTypes["BYTEA"] = 17] = "BYTEA";
    PGTypes[PGTypes["CHAR"] = 18] = "CHAR";
    PGTypes[PGTypes["INT8"] = 20] = "INT8";
    PGTypes[PGTypes["INT2"] = 21] = "INT2";
    PGTypes[PGTypes["INT4"] = 23] = "INT4";
    PGTypes[PGTypes["REGPROC"] = 24] = "REGPROC";
    PGTypes[PGTypes["TEXT"] = 25] = "TEXT";
    PGTypes[PGTypes["OID"] = 26] = "OID";
    PGTypes[PGTypes["TID"] = 27] = "TID";
    PGTypes[PGTypes["XID"] = 28] = "XID";
    PGTypes[PGTypes["CID"] = 29] = "CID";
    PGTypes[PGTypes["JSON"] = 114] = "JSON";
    PGTypes[PGTypes["XML"] = 142] = "XML";
    PGTypes[PGTypes["PG_NODE_TREE"] = 194] = "PG_NODE_TREE";
    PGTypes[PGTypes["SMGR"] = 210] = "SMGR";
    PGTypes[PGTypes["PATH"] = 602] = "PATH";
    PGTypes[PGTypes["POLYGON"] = 604] = "POLYGON";
    PGTypes[PGTypes["CIDR"] = 650] = "CIDR";
    PGTypes[PGTypes["FLOAT4"] = 700] = "FLOAT4";
    PGTypes[PGTypes["FLOAT8"] = 701] = "FLOAT8";
    PGTypes[PGTypes["ABSTIME"] = 702] = "ABSTIME";
    PGTypes[PGTypes["RELTIME"] = 703] = "RELTIME";
    PGTypes[PGTypes["TINTERVAL"] = 704] = "TINTERVAL";
    PGTypes[PGTypes["CIRCLE"] = 718] = "CIRCLE";
    PGTypes[PGTypes["MACADDR8"] = 774] = "MACADDR8";
    PGTypes[PGTypes["MONEY"] = 790] = "MONEY";
    PGTypes[PGTypes["MACADDR"] = 829] = "MACADDR";
    PGTypes[PGTypes["INET"] = 869] = "INET";
    PGTypes[PGTypes["ACLITEM"] = 1033] = "ACLITEM";
    PGTypes[PGTypes["BPCHAR"] = 1042] = "BPCHAR";
    PGTypes[PGTypes["VARCHAR"] = 1043] = "VARCHAR";
    PGTypes[PGTypes["DATE"] = 1082] = "DATE";
    PGTypes[PGTypes["TIME"] = 1083] = "TIME";
    PGTypes[PGTypes["TIMESTAMP"] = 1114] = "TIMESTAMP";
    PGTypes[PGTypes["TIMESTAMPTZ"] = 1184] = "TIMESTAMPTZ";
    PGTypes[PGTypes["INTERVAL"] = 1186] = "INTERVAL";
    PGTypes[PGTypes["TIMETZ"] = 1266] = "TIMETZ";
    PGTypes[PGTypes["BIT"] = 1560] = "BIT";
    PGTypes[PGTypes["VARBIT"] = 1562] = "VARBIT";
    PGTypes[PGTypes["NUMERIC"] = 1700] = "NUMERIC";
    PGTypes[PGTypes["REFCURSOR"] = 1790] = "REFCURSOR";
    PGTypes[PGTypes["REGPROCEDURE"] = 2202] = "REGPROCEDURE";
    PGTypes[PGTypes["REGOPER"] = 2203] = "REGOPER";
    PGTypes[PGTypes["REGOPERATOR"] = 2204] = "REGOPERATOR";
    PGTypes[PGTypes["REGCLASS"] = 2205] = "REGCLASS";
    PGTypes[PGTypes["REGTYPE"] = 2206] = "REGTYPE";
    PGTypes[PGTypes["UUID"] = 2950] = "UUID";
    PGTypes[PGTypes["TXID_SNAPSHOT"] = 2970] = "TXID_SNAPSHOT";
    PGTypes[PGTypes["PG_LSN"] = 3220] = "PG_LSN";
    PGTypes[PGTypes["PG_NDISTINCT"] = 3361] = "PG_NDISTINCT";
    PGTypes[PGTypes["PG_DEPENDENCIES"] = 3402] = "PG_DEPENDENCIES";
    PGTypes[PGTypes["TSVECTOR"] = 3614] = "TSVECTOR";
    PGTypes[PGTypes["TSQUERY"] = 3615] = "TSQUERY";
    PGTypes[PGTypes["GTSVECTOR"] = 3642] = "GTSVECTOR";
    PGTypes[PGTypes["REGCONFIG"] = 3734] = "REGCONFIG";
    PGTypes[PGTypes["REGDICTIONARY"] = 3769] = "REGDICTIONARY";
    PGTypes[PGTypes["JSONB"] = 3802] = "JSONB";
    PGTypes[PGTypes["REGNAMESPACE"] = 4089] = "REGNAMESPACE";
    PGTypes[PGTypes["REGROLE"] = 4096] = "REGROLE";
})(PGTypes || (exports.PGTypes = PGTypes = {}));
exports.default = PGDelegate;
function ParseVarMap(sql, data) {
    var i = 0, parsed = '', values = [];
    while (i < sql.length) {
        switch (sql[i]) {
            case "\\": {
                var _a = EatEscape(sql, i), idx = _a.idx, parts = _a.parts;
                i = idx;
                parsed += parts;
                break;
            }
            case "{": {
                var _b = EatValue(sql, i), idx = _b.idx, key = _b.key;
                var value = data[key];
                if (value === undefined) {
                    throw Object.assign(new RangeError("Unable to locate value key \"".concat(key, "\" in data map!")), {
                        sql: sql,
                        data: data
                    });
                }
                values.push(value);
                i = idx;
                parsed += ((value instanceof BigInt) || (typeof value === "bigint")) ? '%s' : '%L';
                break;
            }
            case "[": {
                var _c = EatColumn(sql, i), idx = _c.idx, key = _c.key;
                if (data[key] === undefined) {
                    throw Object.assign(new RangeError("Unable to locate column key \"".concat(key, "\" in data map!")), {
                        sql: sql,
                        data: data
                    });
                }
                values.push(data[key]);
                i = idx;
                parsed += '%I';
                break;
            }
            default: {
                parsed += sql[i++];
                break;
            }
        }
    }
    return { sql: parsed, values: values };
}
function EatEscape(sql, idx) {
    var str = sql.substring(idx, idx + 2);
    switch (str) {
        case "\\\\":
            str = "\\";
            break;
        case "\\{":
            str = "{";
            break;
        default:
            break;
    }
    return { parts: str, idx: idx + str.length };
}
function EatValue(sql, idx) {
    var to = idx;
    while (to < sql.length) {
        if (sql[to] === "}")
            break;
        to++;
    }
    if (to === idx + 1)
        throw Object.assign(new SyntaxError("Missing key name near offset ".concat(idx, "!")), { sql: sql });
    if (to === sql.length)
        throw Object.assign(new SyntaxError("Missing closing operator '}' near offset ".concat(idx, "!")), { sql: sql });
    return { idx: to + 1, key: sql.substring(idx + 1, to) };
}
function EatColumn(sql, idx) {
    var to = idx;
    while (to < sql.length) {
        if (sql[to] === "]")
            break;
        to++;
    }
    if (to === idx + 1)
        throw Object.assign(new SyntaxError("Missing key name near offset ".concat(idx, "!")), { sql: sql });
    if (to === sql.length)
        throw Object.assign(new SyntaxError("Missing closing operator ']' near offset ".concat(idx, "!")));
    return { idx: to + 1, key: sql.substring(idx + 1, to) };
}
