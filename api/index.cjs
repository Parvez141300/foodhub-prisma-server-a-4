"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/dotenv@17.2.3/node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/.pnpm/dotenv@17.2.3/node_modules/dotenv/package.json"(exports2, module2) {
    module2.exports = {
      name: "dotenv",
      version: "17.2.3",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        pretest: "npm run lint && npm run dts-check",
        test: "tap run tests/**/*.js --allow-empty-coverage --disable-coverage --timeout=60000",
        "test:coverage": "tap run tests/**/*.js --show-full-coverage --timeout=60000 --coverage-report=text --coverage-report=lcov",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      homepage: "https://github.com/motdotla/dotenv#readme",
      funding: "https://dotenvx.com",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@types/node": "^18.11.3",
        decache: "^4.6.2",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-version": "^9.5.0",
        tap: "^19.2.0",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/.pnpm/dotenv@17.2.3/node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/.pnpm/dotenv@17.2.3/node_modules/dotenv/lib/main.js"(exports2, module2) {
    "use strict";
    var fs = require("fs");
    var path2 = require("path");
    var os = require("os");
    var crypto = require("crypto");
    var packageJson = require_package();
    var version = packageJson.version;
    var TIPS = [
      "\u{1F510} encrypt with Dotenvx: https://dotenvx.com",
      "\u{1F510} prevent committing .env to code: https://dotenvx.com/precommit",
      "\u{1F510} prevent building .env in docker: https://dotenvx.com/prebuild",
      "\u{1F4E1} add observability to secrets: https://dotenvx.com/ops",
      "\u{1F465} sync secrets across teammates & machines: https://dotenvx.com/ops",
      "\u{1F5C2}\uFE0F backup and recover secrets: https://dotenvx.com/ops",
      "\u2705 audit secrets and track compliance: https://dotenvx.com/ops",
      "\u{1F504} add secrets lifecycle management: https://dotenvx.com/ops",
      "\u{1F511} add access controls to secrets: https://dotenvx.com/ops",
      "\u{1F6E0}\uFE0F  run anywhere with `dotenvx run -- yourcommand`",
      "\u2699\uFE0F  specify custom .env file path with { path: '/custom/path/.env' }",
      "\u2699\uFE0F  enable debug logging with { debug: true }",
      "\u2699\uFE0F  override existing env vars with { override: true }",
      "\u2699\uFE0F  suppress all logs with { quiet: true }",
      "\u2699\uFE0F  write to custom object with { processEnv: myObject }",
      "\u2699\uFE0F  load multiple .env files with { path: ['.env.local', '.env'] }"
    ];
    function _getRandomTip() {
      return TIPS[Math.floor(Math.random() * TIPS.length)];
    }
    function parseBoolean(value) {
      if (typeof value === "string") {
        return !["false", "0", "no", "off", ""].includes(value.toLowerCase());
      }
      return Boolean(value);
    }
    function supportsAnsi() {
      return process.stdout.isTTY;
    }
    function dim(text) {
      return supportsAnsi() ? `\x1B[2m${text}\x1B[0m` : text;
    }
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      options = options || {};
      const vaultPath = _vaultPath(options);
      options.path = vaultPath;
      const result = DotenvModule.configDotenv(options);
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _warn(message) {
      console.error(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _log(message) {
      console.log(`[dotenv@${version}] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path2.resolve(process.cwd(), ".env.vault");
      }
      if (fs.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path2.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      const debug = parseBoolean(process.env.DOTENV_CONFIG_DEBUG || options && options.debug);
      const quiet = parseBoolean(process.env.DOTENV_CONFIG_QUIET || options && options.quiet);
      if (debug || !quiet) {
        _log("Loading env from encrypted .env.vault");
      }
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path2.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      let debug = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || options && options.debug);
      let quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || options && options.quiet);
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug) {
          _debug("No encoding is specified. UTF-8 is used by default");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path3 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs.readFileSync(path3, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug) {
            _debug(`Failed to load ${path3} ${e.message}`);
          }
          lastError = e;
        }
      }
      const populated = DotenvModule.populate(processEnv, parsedAll, options);
      debug = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || debug);
      quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || quiet);
      if (debug || !quiet) {
        const keysCount = Object.keys(populated).length;
        const shortPaths = [];
        for (const filePath of optionPaths) {
          try {
            const relative = path2.relative(process.cwd(), filePath);
            shortPaths.push(relative);
          } catch (e) {
            if (debug) {
              _debug(`Failed to load ${filePath} ${e.message}`);
            }
            lastError = e;
          }
        }
        _log(`injecting env (${keysCount}) from ${shortPaths.join(",")} ${dim(`-- tip: ${_getRandomTip()}`)}`);
      }
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config2(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      const populated = {};
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
            populated[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
          populated[key] = parsed[key];
        }
      }
      return populated;
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config: config2,
      decrypt,
      parse,
      populate
    };
    module2.exports.configDotenv = DotenvModule.configDotenv;
    module2.exports._configVault = DotenvModule._configVault;
    module2.exports._parseVault = DotenvModule._parseVault;
    module2.exports.config = DotenvModule.config;
    module2.exports.decrypt = DotenvModule.decrypt;
    module2.exports.parse = DotenvModule.parse;
    module2.exports.populate = DotenvModule.populate;
    module2.exports = DotenvModule;
  }
});

// node_modules/.pnpm/dotenv@17.2.3/node_modules/dotenv/lib/env-options.js
var require_env_options = __commonJS({
  "node_modules/.pnpm/dotenv@17.2.3/node_modules/dotenv/lib/env-options.js"(exports2, module2) {
    "use strict";
    var options = {};
    if (process.env.DOTENV_CONFIG_ENCODING != null) {
      options.encoding = process.env.DOTENV_CONFIG_ENCODING;
    }
    if (process.env.DOTENV_CONFIG_PATH != null) {
      options.path = process.env.DOTENV_CONFIG_PATH;
    }
    if (process.env.DOTENV_CONFIG_QUIET != null) {
      options.quiet = process.env.DOTENV_CONFIG_QUIET;
    }
    if (process.env.DOTENV_CONFIG_DEBUG != null) {
      options.debug = process.env.DOTENV_CONFIG_DEBUG;
    }
    if (process.env.DOTENV_CONFIG_OVERRIDE != null) {
      options.override = process.env.DOTENV_CONFIG_OVERRIDE;
    }
    if (process.env.DOTENV_CONFIG_DOTENV_KEY != null) {
      options.DOTENV_KEY = process.env.DOTENV_CONFIG_DOTENV_KEY;
    }
    module2.exports = options;
  }
});

// node_modules/.pnpm/dotenv@17.2.3/node_modules/dotenv/lib/cli-options.js
var require_cli_options = __commonJS({
  "node_modules/.pnpm/dotenv@17.2.3/node_modules/dotenv/lib/cli-options.js"(exports2, module2) {
    "use strict";
    var re = /^dotenv_config_(encoding|path|quiet|debug|override|DOTENV_KEY)=(.+)$/;
    module2.exports = function optionMatcher(args) {
      const options = args.reduce(function(acc, cur) {
        const matches = cur.match(re);
        if (matches) {
          acc[matches[1]] = matches[2];
        }
        return acc;
      }, {});
      if (!("quiet" in options)) {
        options.quiet = "true";
      }
      return options;
    };
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/app.ts
var import_express11 = __toESM(require("express"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_node = require("better-auth/node");

// src/lib/auth.ts
var import_better_auth = require("better-auth");
var import_prisma = require("better-auth/adapters/prisma");

// node_modules/.pnpm/dotenv@17.2.3/node_modules/dotenv/config.js
(function() {
  require_main().config(
    Object.assign(
      {},
      require_env_options(),
      require_cli_options()(process.argv)
    )
  );
})();

// src/lib/prisma.ts
var import_adapter_pg = require("@prisma/adapter-pg");

// generated/prisma/client.ts
var path = __toESM(require("path"), 1);
var import_node_url = require("url");

// generated/prisma/internal/class.ts
var runtime = __toESM(require("@prisma/client/runtime/client"), 1);
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Meal {\n  id          String @id @default(uuid())\n  provider_id String\n  category_id String\n  cuisine_id  String\n  dietery_id  String\n\n  title        String   @db.VarChar(250)\n  description  String   @db.Text\n  stock        Int\n  price        Int\n  image_url    String\n  is_available Boolean  @default(true)\n  is_featured  Boolean  @default(false)\n  created_at   DateTime @default(now())\n  updated_at   DateTime @updatedAt\n\n  provider User     @relation(fields: [provider_id], references: [id], onDelete: Cascade)\n  category Category @relation(fields: [category_id], references: [id], onDelete: Cascade)\n  cuisine  Cuisine  @relation(fields: [cuisine_id], references: [id], onDelete: Cascade)\n  dietery  Dietery  @relation(fields: [dietery_id], references: [id], onDelete: Cascade)\n\n  orderItems    OrderItem[]\n  reviews       Review[]\n  wishlistItems WishlistItem[]\n  cartItems     CartItem[]\n}\n\nmodel Category {\n  id         String   @id @default(uuid())\n  name       String   @unique\n  creator_id String\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  creator User   @relation(fields: [creator_id], references: [id])\n  meals   Meal[]\n}\n\nmodel Cuisine {\n  id         String   @id @default(uuid())\n  name       String   @unique\n  creator_id String\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  creator User   @relation(fields: [creator_id], references: [id])\n  meals   Meal[]\n}\n\nmodel Dietery {\n  id         String   @id @default(uuid())\n  name       String   @unique\n  creator_id String\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  creator User   @relation(fields: [creator_id], references: [id])\n  meals   Meal[]\n}\n\nmodel Cart {\n  id      String @id @default(uuid())\n  user_id String @unique\n\n  created_at DateTime   @default(now())\n  updated_at DateTime   @updatedAt\n  cartItems  CartItem[]\n  orders     Order[]\n}\n\nmodel CartItem {\n  id       String @id @default(uuid())\n  cart_id  String\n  meal_id  String\n  quantity Int\n\n  cart Cart @relation(fields: [cart_id], references: [id], onDelete: Cascade)\n  meal Meal @relation(fields: [meal_id], references: [id], onDelete: Cascade)\n\n  @@unique([cart_id, meal_id])\n}\n\nenum Order_Status {\n  PENDING\n  PROCESSING\n  DELIVERED\n  CANCELLED\n}\n\nmodel Order {\n  id      String  @id @default(uuid())\n  user_id String\n  cart_id String?\n\n  // Address details\n  name        String\n  phone       String\n  division    String\n  district    String\n  thana       String\n  area        String\n  street      String?\n  postal_code String?\n\n  order_status Order_Status @default(PENDING)\n  total_price  Int\n  created_at   DateTime     @default(now())\n  orderItems   OrderItem[]\n\n  user User  @relation(fields: [user_id], references: [id], onDelete: Cascade)\n  cart Cart? @relation(fields: [cart_id], references: [id], onDelete: Cascade)\n}\n\nmodel OrderItem {\n  id       String @id @default(uuid())\n  order_id String\n  meal_id  String\n  quantity Int\n  order    Order  @relation(fields: [order_id], references: [id], onDelete: Cascade)\n  meal     Meal   @relation(fields: [meal_id], references: [id], onDelete: Cascade)\n}\n\nmodel Wishlist {\n  id      String @id @default(uuid())\n  user_id String @unique\n\n  created_at    DateTime       @default(now())\n  wishlistItems WishlistItem[]\n}\n\nmodel WishlistItem {\n  id          String @id @default(uuid())\n  wishlist_id String\n  meal_id     String\n\n  wishlist Wishlist @relation(fields: [wishlist_id], references: [id], onDelete: Cascade)\n  meal     Meal     @relation(fields: [meal_id], references: [id], onDelete: Cascade)\n\n  @@unique([wishlist_id, meal_id])\n}\n\nmodel Review {\n  id         String   @id @default(uuid())\n  author_id  String\n  meal_id    String\n  rating     Float\n  comment    String   @db.Text\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  user User @relation(fields: [author_id], references: [id], onDelete: Cascade)\n  meal Meal @relation(fields: [meal_id], references: [id], onDelete: Cascade)\n}\n\nmodel Profile {\n  id      String @id @default(uuid())\n  user_id String @unique\n\n  phone       String\n  division    String\n  district    String\n  thana       String\n  area        String\n  street      String?\n  postal_code String?\n\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  user User @relation(fields: [user_id], references: [id], onDelete: Cascade)\n}\n\nmodel User {\n  id            String     @id\n  name          String\n  email         String\n  emailVerified Boolean    @default(false)\n  image         String?\n  createdAt     DateTime   @default(now())\n  updatedAt     DateTime   @updatedAt\n  role          String?    @default("CUSTOMER")\n  phone         String?\n  is_active     String?    @default("ACTIVE")\n  sessions      Session[]\n  accounts      Account[]\n  profile       Profile?\n  orders        Order[]\n  reviews       Review[]\n  meals         Meal[]\n  categories    Category[]\n  cuisines      Cuisine[]\n  dieteries     Dietery[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"provider_id","kind":"scalar","type":"String"},{"name":"category_id","kind":"scalar","type":"String"},{"name":"cuisine_id","kind":"scalar","type":"String"},{"name":"dietery_id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Int"},{"name":"image_url","kind":"scalar","type":"String"},{"name":"is_available","kind":"scalar","type":"Boolean"},{"name":"is_featured","kind":"scalar","type":"Boolean"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"provider","kind":"object","type":"User","relationName":"MealToUser"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMeal"},{"name":"cuisine","kind":"object","type":"Cuisine","relationName":"CuisineToMeal"},{"name":"dietery","kind":"object","type":"Dietery","relationName":"DieteryToMeal"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MealToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MealToReview"},{"name":"wishlistItems","kind":"object","type":"WishlistItem","relationName":"MealToWishlistItem"},{"name":"cartItems","kind":"object","type":"CartItem","relationName":"CartItemToMeal"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"creator_id","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"creator","kind":"object","type":"User","relationName":"CategoryToUser"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoryToMeal"}],"dbName":null},"Cuisine":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"creator_id","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"creator","kind":"object","type":"User","relationName":"CuisineToUser"},{"name":"meals","kind":"object","type":"Meal","relationName":"CuisineToMeal"}],"dbName":null},"Dietery":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"creator_id","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"creator","kind":"object","type":"User","relationName":"DieteryToUser"},{"name":"meals","kind":"object","type":"Meal","relationName":"DieteryToMeal"}],"dbName":null},"Cart":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"cartItems","kind":"object","type":"CartItem","relationName":"CartToCartItem"},{"name":"orders","kind":"object","type":"Order","relationName":"CartToOrder"}],"dbName":null},"CartItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"cart_id","kind":"scalar","type":"String"},{"name":"meal_id","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToCartItem"},{"name":"meal","kind":"object","type":"Meal","relationName":"CartItemToMeal"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"cart_id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"division","kind":"scalar","type":"String"},{"name":"district","kind":"scalar","type":"String"},{"name":"thana","kind":"scalar","type":"String"},{"name":"area","kind":"scalar","type":"String"},{"name":"street","kind":"scalar","type":"String"},{"name":"postal_code","kind":"scalar","type":"String"},{"name":"order_status","kind":"enum","type":"Order_Status"},{"name":"total_price","kind":"scalar","type":"Int"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToOrder"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"order_id","kind":"scalar","type":"String"},{"name":"meal_id","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrderItem"}],"dbName":null},"Wishlist":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"wishlistItems","kind":"object","type":"WishlistItem","relationName":"WishlistToWishlistItem"}],"dbName":null},"WishlistItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"wishlist_id","kind":"scalar","type":"String"},{"name":"meal_id","kind":"scalar","type":"String"},{"name":"wishlist","kind":"object","type":"Wishlist","relationName":"WishlistToWishlistItem"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToWishlistItem"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"author_id","kind":"scalar","type":"String"},{"name":"meal_id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Float"},{"name":"comment","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReview"}],"dbName":null},"Profile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"division","kind":"scalar","type":"String"},{"name":"district","kind":"scalar","type":"String"},{"name":"thana","kind":"scalar","type":"String"},{"name":"area","kind":"scalar","type":"String"},{"name":"street","kind":"scalar","type":"String"},{"name":"postal_code","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"ProfileToUser"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"role","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"is_active","kind":"scalar","type":"String"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"profile","kind":"object","type":"Profile","relationName":"ProfileToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"meals","kind":"object","type":"Meal","relationName":"MealToUser"},{"name":"categories","kind":"object","type":"Category","relationName":"CategoryToUser"},{"name":"cuisines","kind":"object","type":"Cuisine","relationName":"CuisineToUser"},{"name":"dieteries","kind":"object","type":"Dietery","relationName":"DieteryToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var runtime2 = __toESM(require("@prisma/client/runtime/client"), 1);
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
var import_meta = {};
globalThis["__dirname"] = path.dirname((0, import_node_url.fileURLToPath)(import_meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new import_adapter_pg.PrismaPg({ connectionString, ssl: { rejectUnauthorized: false } });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
var auth = (0, import_better_auth.betterAuth)({
  database: (0, import_prisma.prismaAdapter)(prisma, {
    provider: "postgresql"
    // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: false
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      is_active: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  trustedOrigins: [process.env.APP_URL || "http://localhost:3000"]
});

// src/modules/meal/meal.route.ts
var import_express = require("express");

// src/modules/meal/meal.service.ts
var getAllOrQueryMealFromDB = async ({
  search,
  category,
  cuisine,
  dietery,
  minPrice,
  maxPrice,
  page,
  limit,
  skip,
  sort_by,
  sort_order
}) => {
  const addCondition = [];
  if (search) {
    addCondition.push({
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          category: {
            name: {
              contains: search,
              mode: "insensitive"
            }
          }
        }
      ]
    });
  }
  if (category) {
    addCondition.push({
      category_id: {
        in: category.split(",")
      }
    });
  }
  if (cuisine) {
    addCondition.push({
      cuisine_id: {
        in: cuisine.split(",")
      }
    });
  }
  if (dietery) {
    addCondition.push({
      dietery_id: {
        in: dietery.split(",")
      }
    });
  }
  if (minPrice || maxPrice) {
    addCondition.push({
      price: {
        gte: minPrice || 0,
        lte: maxPrice || 1e4
      }
    });
  }
  const safeSortOrder = sort_order.toLowerCase() === "desc" ? "desc" : "asc";
  const result = await prisma.meal.findMany({
    skip,
    take: limit,
    where: {
      AND: addCondition,
      is_available: true
    },
    orderBy: {
      [sort_by]: safeSortOrder
    },
    include: {
      category: {
        select: {
          id: true,
          name: true
        }
      },
      cuisine: {
        select: {
          id: true,
          name: true
        }
      },
      dietery: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
  const totalItems = await prisma.meal.count({
    where: {
      AND: addCondition
    }
  });
  return {
    data: result,
    pagination: {
      totalItems,
      currentPage: page,
      limit,
      totalPages: Math.ceil(totalItems / limit)
    }
  };
};
var getAllFeaturedMealsFromDB = async () => {
  const result = await prisma.meal.findMany({
    where: {
      is_featured: true
    }
  });
  return result;
};
var getMealByIdFromDB = async (mealId) => {
  const result = await prisma.meal.findUnique({
    where: {
      id: mealId
    },
    include: {
      provider: true,
      category: true,
      cuisine: true,
      dietery: true
    }
  });
  return result;
};
var getMealsByProviderIdFromDB = async (providerId) => {
  const userData = await prisma.user.findUnique({
    where: {
      id: providerId
    }
  });
  if (!userData?.id) {
    throw new Error("This user does not exists");
    return;
  }
  const result = await prisma.meal.findMany({
    where: {
      provider_id: providerId
    },
    orderBy: {
      created_at: "desc"
    },
    include: {
      category: {
        select: {
          id: true,
          name: true
        }
      },
      cuisine: {
        select: {
          id: true,
          name: true
        }
      },
      dietery: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
  return result;
};
var createMealIntoDB = async (payload) => {
  const result = await prisma.meal.create({
    data: {
      ...payload,
      stock: Number(payload?.stock),
      price: Number(payload?.price)
    }
  });
  return result;
};
var updateMealByIdInDB = async ({ mealId, payload }) => {
  const mealData = await prisma.meal.findUnique({
    where: {
      id: mealId
    }
  });
  if (!mealData?.id) {
    throw new Error("To update Meal this meal does not exist");
    return;
  }
  const providerData = await prisma.user.findUnique({
    where: {
      id: mealData?.provider_id
    },
    select: {
      id: true
    }
  });
  if (providerData?.id !== mealData.provider_id) {
    throw new Error("creator is not valid to update meal's data");
    return;
  }
  await prisma.category.findUniqueOrThrow({
    where: {
      id: payload.category_id
    }
  });
  await prisma.cuisine.findUniqueOrThrow({
    where: {
      id: payload.cuisine_id
    }
  });
  await prisma.dietery.findUniqueOrThrow({
    where: {
      id: payload.dietery_id
    }
  });
  const result = await prisma.meal.update({
    where: {
      id: mealId
    },
    data: {
      title: payload.title || mealData.title,
      description: payload.description || mealData.description,
      image_url: payload.image_url || mealData.image_url,
      stock: Number(payload?.stock) || Number(mealData.stock),
      price: Number(payload?.price) || Number(mealData.price),
      is_available: Boolean(payload?.is_available) || Boolean(mealData.is_available),
      category: { connect: { id: payload.category_id || mealData.category_id } },
      cuisine: { connect: { id: payload.cuisine_id || mealData.cuisine_id } },
      dietery: { connect: { id: payload.dietery_id || mealData.dietery_id } }
    }
  });
  return result;
};
var deleteMealByIdInDB = async ({ mealId }) => {
  const mealData = await prisma.meal.findUnique({
    where: {
      id: mealId
    },
    select: {
      id: true,
      provider_id: true
    }
  });
  if (!mealData?.id) {
    return { message: "To delete Meal this meal does not exist" };
  }
  const providerData = await prisma.user.findUnique({
    where: {
      id: mealData?.provider_id
    },
    select: {
      id: true
    }
  });
  if (providerData?.id !== mealData.provider_id) {
    return { message: "creator is not valid to delete meal's data" };
  }
  const result = await prisma.meal.delete({
    where: {
      id: mealId
    },
    select: {
      id: true,
      title: true,
      category: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
  return result;
};
var mealService = {
  getAllOrQueryMealFromDB,
  getAllFeaturedMealsFromDB,
  getMealByIdFromDB,
  getMealsByProviderIdFromDB,
  createMealIntoDB,
  updateMealByIdInDB,
  deleteMealByIdInDB
};

// src/helpers/paginationAndSortingHelper.ts
var paginationAndSortingHelper = (options) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit || 0;
  const sort_by = options.sort_by || "created_at";
  const sort_order = options.sort_order || "desc";
  return { page, limit, skip, sort_by, sort_order };
};

// src/modules/meal/meal.controller.ts
var getAllOrQueryMeal = async (req, res) => {
  try {
    const { search, category, cuisine, dietery, minPrice, maxPrice } = req.query;
    const searchString = typeof search === "string" ? search : void 0;
    const categoryString = typeof category === "string" ? category : void 0;
    const cuisineString = typeof cuisine === "string" ? cuisine : void 0;
    const dieteryString = typeof dietery === "string" ? dietery : void 0;
    const minP = minPrice ? Number(minPrice) : void 0;
    const maxP = maxPrice ? Number(maxPrice) : void 0;
    const { page, limit, skip, sort_by, sort_order } = paginationAndSortingHelper(req.query);
    const result = await mealService.getAllOrQueryMealFromDB({ search: searchString, category: categoryString, cuisine: cuisineString, dietery: dieteryString, minPrice: minP, maxPrice: maxP, page, limit, skip, sort_by, sort_order });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error?.message || "Internal server error" });
  }
};
var getAllFeaturedMeals = async (req, res) => {
  try {
    const result = await mealService.getAllFeaturedMealsFromDB();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error?.message || "Internal server error" });
  }
};
var getMealById = async (req, res) => {
  try {
    const { mealId } = req.params;
    const result = await mealService.getMealByIdFromDB(mealId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error?.message || "Internal server error" });
  }
};
var getMealsByProviderId = async (req, res) => {
  try {
    const { providerId } = req.params;
    const result = await mealService.getMealsByProviderIdFromDB(providerId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
var createMeal = async (req, res) => {
  try {
    const payload = req.body;
    const result = await mealService.createMealIntoDB(payload);
    res.status(201).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
var updateMealById = async (req, res) => {
  try {
    const { mealId } = req.params;
    const payload = req.body;
    const result = await mealService.updateMealByIdInDB({ mealId, payload });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error?.message || "Internal server error" });
  }
};
var deleteMealById = async (req, res) => {
  try {
    const { mealId } = req.params;
    const result = await mealService.deleteMealByIdInDB({ mealId });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error?.message || "Internal server error" });
  }
};
var mealController = {
  getAllOrQueryMeal,
  getAllFeaturedMeals,
  getMealById,
  getMealsByProviderId,
  createMeal,
  updateMealById,
  deleteMealById
};

// src/middleware/authMiddleware.ts
var authMiddleware = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({ message: "Unauthorized access" });
      }
      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
        emailVerified: session.user.emailVerified
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "This user has no permission to access this resource" });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
var authMiddleware_default = authMiddleware;

// src/modules/meal/meal.route.ts
var router = (0, import_express.Router)();
router.get("/meals", mealController.getAllOrQueryMeal);
router.get("/meals/featured", mealController.getAllFeaturedMeals);
router.get("/meals/:mealId", mealController.getMealById);
router.get("/provider/meals/:providerId", mealController.getMealsByProviderId);
router.post("/provider/meals", authMiddleware_default("PROVIDER" /* PROVIDER */), mealController.createMeal);
router.patch("/provider/meals/:mealId", authMiddleware_default("PROVIDER" /* PROVIDER */), mealController.updateMealById);
router.delete("/provider/meals/:mealId", authMiddleware_default("PROVIDER" /* PROVIDER */), mealController.deleteMealById);
var mealRouter = router;

// src/modules/category/category.route.ts
var import_express2 = require("express");

// src/modules/category/category.service.ts
var getAllCategoryFromDB = async () => {
  const result = await prisma.category.findMany({
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          role: true
        }
      }
    },
    orderBy: {
      created_at: "desc"
    }
  });
  return result;
};
var createCategoryIntoDB = async (payload) => {
  const categoryData = await prisma.category.findUnique({
    where: {
      name: payload.name
    }
  });
  if (categoryData) {
    return { message: "Category already exists" };
  }
  const result = await prisma.category.create({
    data: payload
  });
  return result;
};
var deleteCategoryFromDb = async (category_id) => {
  const isExistCategory = await prisma.category.findUnique({
    where: {
      id: category_id
    }
  });
  if (!isExistCategory) {
    throw new Error("This category does not exists");
    return;
  }
  const result = await prisma.category.delete({
    where: {
      id: category_id
    }
  });
  return result;
};
var categoryService = {
  getAllCategoryFromDB,
  createCategoryIntoDB,
  deleteCategoryFromDb
};

// src/modules/category/category.controller.ts
var getAllCategory = async (req, res) => {
  try {
    const result = await categoryService.getAllCategoryFromDB();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
var createCategory = async (req, res) => {
  try {
    const payload = req.body;
    const result = await categoryService.createCategoryIntoDB(payload);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
var deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category_id = categoryId;
    const result = await categoryService.deleteCategoryFromDb(category_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
var categoryController = {
  getAllCategory,
  createCategory,
  deleteCategory
};

// src/modules/category/category.route.ts
var router2 = (0, import_express2.Router)();
router2.get("/categories", categoryController.getAllCategory);
router2.post("/categories", categoryController.createCategory);
router2.delete("/categories/:categoryId", categoryController.deleteCategory);
var categoryRouter = router2;

// src/modules/user/user.route.ts
var import_express3 = require("express");

// src/modules/user/user.service.ts
var getAllProviderFromDB = async () => {
  const result = await prisma.user.findMany({
    where: {
      role: "PROVIDER"
    }
  });
  return result;
};
var getProviderWithMenuFromDB = async (providerId) => {
  const result = await prisma.user.findUnique({
    where: {
      id: providerId
    },
    include: {
      meals: true,
      profile: true
    }
  });
  return result;
};
var getAllOrSearchUserFromDB = async (search) => {
  const result = await prisma.user.findMany({
    where: {
      AND: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive"
            }
          },
          {
            email: {
              contains: search
            }
          }
        ]
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var updateUserStatusInDB = async ({ userId, payload }) => {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true
    }
  });
  if (!userData?.id) {
    return { message: "User not found" };
  }
  if (!payload?.is_active) {
    return { message: "user status to update data not found" };
  }
  const result = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      is_active: payload.is_active
    },
    select: {
      id: true,
      name: true,
      email: true,
      is_active: true
    }
  });
  return result;
};
var updateUserRoleInDB = async ({ userId, role }) => {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  if (!userData?.id) {
    return { message: "This user not found!!!!" };
  }
  const result = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      role
    }
  });
  return result;
};
var userService = {
  getAllProviderFromDB,
  getProviderWithMenuFromDB,
  getAllOrSearchUserFromDB,
  updateUserStatusInDB,
  updateUserRoleInDB
};

// src/modules/user/user.controller.ts
var getAllProvider = async (req, res) => {
  try {
    const result = await userService.getAllProviderFromDB();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
var getProviderWithMenu = async (req, res) => {
  try {
    const { providerId } = req.params;
    const result = await userService.getProviderWithMenuFromDB(providerId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
var getAllOrSearchUser = async (req, res) => {
  try {
    const { search } = req.query;
    const query = search ? search : "";
    const result = await userService.getAllOrSearchUserFromDB(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
var updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const payload = req.body;
    const result = await userService.updateUserStatusInDB({ userId, payload });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
var updateUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const result = await userService.updateUserRoleInDB({ userId, role });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
var userController = {
  getAllProvider,
  getProviderWithMenu,
  getAllOrSearchUser,
  updateUserStatus,
  updateUserRole
};

// src/modules/user/user.route.ts
var router3 = (0, import_express3.Router)();
router3.get("/providers", userController.getAllProvider);
router3.get("/providers/:providerId", userController.getProviderWithMenu);
router3.get("/admin/users", authMiddleware_default("ADMIN" /* ADMIN */), userController.getAllOrSearchUser);
router3.patch("/admin/users/:userId", authMiddleware_default("ADMIN" /* ADMIN */), userController.updateUserStatus);
router3.post("/user/role", userController.updateUserRole);
var userRouter = router3;

// src/modules/order/order.route.ts
var import_express4 = require("express");

// src/modules/order/order.service.ts
var getAllOrdersFromDB = async () => {
  const result = await prisma.order.findMany({
    orderBy: {
      created_at: "desc"
    },
    include: {
      cart: true,
      user: true,
      orderItems: true
    }
  });
  return result;
};
var getPoriderOrdersFromDB = async (providerId) => {
  const orders = await prisma.order.findMany({
    where: {
      orderItems: {
        some: {
          meal: {
            provider_id: providerId
          }
        }
      }
    },
    include: {
      cart: true,
      orderItems: {
        include: {
          meal: true
        }
      },
      user: true
    }
  });
  return orders;
};
var getUserOrdersFromDB = async (user_id) => {
  const userData = await prisma.user.findUnique({
    where: {
      id: user_id
    },
    select: {
      id: true
    }
  });
  if (userData?.id !== user_id) {
    return { message: "this user is not valid" };
  }
  ;
  const result = await prisma.order.findMany({
    where: {
      user_id
    },
    include: {
      orderItems: {
        include: {
          meal: true
        }
      }
    }
  });
  return result;
};
var getOrderDetailsFromDB = async (order_id) => {
  const result = await prisma.order.findUnique({
    where: {
      id: order_id
    },
    include: {
      orderItems: true,
      user: true
    }
  });
  return result;
};
var createOrderInDB = async (payload) => {
  const userData = await prisma.user.findUnique({
    where: { id: payload.user_id },
    select: { id: true }
  });
  if (!userData?.id) {
    return { message: "User not found to create order" };
  }
  let meal = {};
  let total_price = 0;
  if (payload?.orderItems?.meal_id) {
    meal = await prisma.meal.findUnique({
      where: {
        id: payload.orderItems.meal_id
      }
    });
    total_price = Number(meal?.price) * Number(payload.orderItems.quantity);
  }
  let meals = [];
  if (payload?.cartItems?.length) {
    meals = await prisma.meal.findMany({
      where: {
        id: {
          in: payload.cartItems.map((item) => item.meal_id)
        }
      }
    });
    payload.cartItems.forEach((item) => {
      const meal2 = meals.find((m) => m.id === item.meal_id);
      if (meal2?.id) {
        total_price = total_price + Number(meal2.price) * Number(item.quantity);
      }
    });
  }
  const result = prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        user_id: payload.user_id,
        name: payload.name,
        phone: payload.phone,
        division: payload.division,
        district: payload.district,
        thana: payload.thana,
        area: payload.area,
        street: payload.street || "",
        postal_code: payload.postal_code || "",
        total_price
      }
    });
    if (payload?.orderItems?.meal_id) {
      const order2 = await tx.order.create({
        data: {
          user_id: payload.user_id,
          name: payload.name,
          phone: payload.phone,
          division: payload.division,
          district: payload.district,
          thana: payload.thana,
          area: payload.area,
          street: payload.street || "",
          postal_code: payload.postal_code || "",
          total_price
        }
      });
      const orderItemData = {
        order_id: order2?.id,
        meal_id: meal?.id,
        quantity: Number(payload?.orderItems.quantity)
      };
      await tx.orderItem.create({
        data: orderItemData
      });
      await tx.meal.update({
        where: {
          id: meal?.id
        },
        data: {
          stock: {
            decrement: payload?.orderItems?.quantity
          }
        }
      });
    }
    if (payload?.cartItems?.length) {
      const order2 = await tx.order.create({
        data: {
          user_id: payload.user_id,
          cart_id: payload.cart_id || null,
          name: payload.name,
          phone: payload.phone,
          division: payload.division,
          district: payload.district,
          thana: payload.thana,
          area: payload.area,
          street: payload.street || "",
          postal_code: payload.postal_code || "",
          total_price
        }
      });
      const cartItemData = payload.cartItems.map((item) => ({
        order_id: order2?.id,
        meal_id: item?.meal_id,
        quantity: Number(item?.quantity)
      }));
      await tx.orderItem.createMany({
        data: cartItemData
      });
      for (const item of payload.cartItems) {
        await tx.meal.update({
          where: {
            id: item.meal_id
          },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });
      }
    }
    return order;
  });
  return result;
};
var updateOrderStatusInDB = async ({ order_id, provider_id, order_status }) => {
  const userData = await prisma.user.findUnique({
    where: {
      id: provider_id
    }
  });
  if (userData?.role !== "PROVIDER" && !userData?.id) {
    return { message: "provider/creator is not valid to update order status" };
  }
  const result = await prisma.order.update({
    where: {
      id: order_id
    },
    data: {
      order_status
    }
  });
  return result;
};
var updateUserPendingOrderStatusInDB = async (orderId, orderStatus) => {
  const result = await prisma.order.update({
    where: {
      id: orderId
    },
    data: {
      order_status: orderStatus
    }
  });
  return result;
};
var orderService = {
  getAllOrdersFromDB,
  getUserOrdersFromDB,
  getPoriderOrdersFromDB,
  getOrderDetailsFromDB,
  createOrderInDB,
  updateOrderStatusInDB,
  updateUserPendingOrderStatusInDB
};

// src/modules/order/order.controller.ts
var getAllOrders = async (req, res) => {
  try {
    const result = await orderService.getAllOrdersFromDB();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
var getPoriderOrders = async (req, res) => {
  try {
    const { providerId } = req.params;
    const result = await orderService.getPoriderOrdersFromDB(providerId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
var getUserOrders = async (req, res) => {
  try {
    const { user_id } = req.query;
    const result = await orderService.getUserOrdersFromDB(user_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
var getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const result = await orderService.getOrderDetailsFromDB(orderId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
var createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const result = await orderService.createOrderInDB(orderData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
var updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { provider_id, order_status } = req.body;
    const result = await orderService.updateOrderStatusInDB({ order_id: orderId, provider_id, order_status });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
var updateUserPendingOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { order_status } = req.body;
    const result = await orderService.updateUserPendingOrderStatusInDB(orderId, order_status);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
var orderController = {
  getAllOrders,
  getPoriderOrders,
  getUserOrders,
  getOrderDetails,
  createOrder,
  updateOrderStatus,
  updateUserPendingOrderStatus
};

// src/modules/order/order.route.ts
var router4 = (0, import_express4.Router)();
router4.get("/orders", orderController.getAllOrders);
router4.get("/provider/orders/:providerId", orderController.getPoriderOrders);
router4.get("/orders", orderController.getUserOrders);
router4.get("/orders/:orderId", orderController.getOrderDetails);
router4.post("/orders", authMiddleware_default("CUSTOMER" /* CUSTOMER */), orderController.createOrder);
router4.patch("/provider/orders/:orderId", authMiddleware_default("PROVIDER" /* PROVIDER */), orderController.updateOrderStatus);
router4.patch("/customer/orders/:orderId", authMiddleware_default("CUSTOMER" /* CUSTOMER */), orderController.updateUserPendingOrderStatus);
var orderRouter = router4;

// src/modules/review/review.route.ts
var import_express5 = require("express");

// src/modules/review/review.service.ts
var getAllReviewByMealIdFromDB = async (mealId) => {
  const result = await prisma.meal.findUnique({
    where: {
      id: mealId
    },
    include: {
      reviews: {
        include: {
          user: true
        }
      }
    }
  });
  return result;
};
var createReviewInDB = async (payload) => {
  const userData = await prisma.user.findUnique({
    where: { id: payload.author_id }
  });
  if (!userData?.id) {
    return { message: "This User not found" };
  }
  const mealData = await prisma.meal.findUnique({
    where: { id: payload.meal_id }
  });
  if (!mealData?.id) {
    return { message: "This Meal not found" };
  }
  const result = await prisma.review.create({
    data: {
      ...payload,
      rating: Number(payload.rating)
    }
  });
  return result;
};
var reviewService = {
  getAllReviewByMealIdFromDB,
  createReviewInDB
};

// src/modules/review/review.controller.ts
var getAllReviewByMealId = async (req, res) => {
  try {
    const { mealId } = req.params;
    const result = await reviewService.getAllReviewByMealIdFromDB(mealId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
var createReview = async (req, res) => {
  try {
    const result = await reviewService.createReviewInDB(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
var reviewController = {
  getAllReviewByMealId,
  createReview
};

// src/modules/review/review.route.ts
var router5 = (0, import_express5.Router)();
router5.get("/reviews/:mealId", reviewController.getAllReviewByMealId);
router5.post("/reviews", authMiddleware_default("CUSTOMER" /* CUSTOMER */, "PROVIDER" /* PROVIDER */, "ADMIN" /* ADMIN */), reviewController.createReview);
var reviewRouter = router5;

// src/modules/profile/profile.route.ts
var import_express6 = require("express");

// src/modules/profile/profile.service.ts
var getUserProfileFromDB = async (userId) => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      profile: true
    }
  });
  if (!result) {
    throw new Error("User not found");
  } else {
    return result;
  }
};
var updateOrInsertProfileInDB = async (paylaod) => {
  const { user_id, name, image = "", email, phone, division, district, thana, area, street = "", postal_code = "" } = paylaod;
  const userData = await prisma.user.findUnique({
    where: {
      id: user_id
    }
  });
  if (!userData) {
    return { message: "User not found" };
  }
  await prisma.user.update({
    where: {
      id: user_id
    },
    data: {
      name,
      email,
      phone,
      image
    }
  });
  const result = await prisma.profile.upsert({
    where: {
      user_id
    },
    update: {
      phone,
      division,
      district,
      thana,
      area,
      street,
      postal_code
    },
    create: {
      user_id,
      phone,
      division,
      district,
      thana,
      area,
      street,
      postal_code
    }
  });
  return result;
};
var profileService = {
  getUserProfileFromDB,
  updateOrInsertProfileInDB
};

// src/modules/profile/profile.controller.ts
var getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await profileService.getUserProfileFromDB(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
var updateOrInsertProfile = async (req, res) => {
  try {
    const result = await profileService.updateOrInsertProfileInDB(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
var profileController = {
  getUserProfile,
  updateOrInsertProfile
};

// src/modules/profile/profile.route.ts
var router6 = (0, import_express6.Router)();
router6.get("/profiles/:userId", profileController.getUserProfile);
router6.patch("/profiles", profileController.updateOrInsertProfile);
var profileRouter = router6;

// src/modules/cuisine/cuisine.route.ts
var import_express7 = require("express");

// src/modules/cuisine/cuisine.service.ts
var getAllCuisineFromDB = async () => {
  const result = await prisma.cuisine.findMany({
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          role: true
        }
      }
    },
    orderBy: {
      created_at: "desc"
    }
  });
  return result;
};
var createCuisineInDB = async (cuisineData) => {
  const existingCuisine = await prisma.cuisine.findUnique({
    where: {
      name: cuisineData.name
    }
  });
  if (existingCuisine) {
    return { message: "Cuisine already exists" };
  }
  const result = await prisma.cuisine.create({
    data: cuisineData
  });
  return result;
};
var deleteCuisineFromDB = async (cuisine_id) => {
  const isExistCuisine = await prisma.cuisine.findUnique({
    where: {
      id: cuisine_id
    }
  });
  if (!isExistCuisine) {
    throw new Error("This cuisine does not exists");
    return;
  }
  const result = await prisma.cuisine.delete({
    where: {
      id: cuisine_id
    }
  });
  return result;
};
var cuisineService = {
  getAllCuisineFromDB,
  createCuisineInDB,
  deleteCuisineFromDB
};

// src/modules/cuisine/cuisine.controller.ts
var getAllCuisine = async (req, res) => {
  try {
    const result = await cuisineService.getAllCuisineFromDB();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
var createCuisine = async (req, res) => {
  try {
    const payload = req.body;
    const result = await cuisineService.createCuisineInDB(payload);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
var deleteCuisine = async (req, res) => {
  try {
    const { cuisineId } = req.params;
    const cuisine_id = cuisineId;
    const result = await cuisineService.deleteCuisineFromDB(cuisine_id);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
var cuisineController = {
  getAllCuisine,
  createCuisine,
  deleteCuisine
};

// src/modules/cuisine/cuisine.route.ts
var router7 = (0, import_express7.Router)();
router7.get("/cuisines", cuisineController.getAllCuisine);
router7.post("/cuisines", cuisineController.createCuisine);
router7.delete("/cuisines/:cuisineId", cuisineController.deleteCuisine);
var cuisineRouter = router7;

// src/modules/dietery/dietery.route.ts
var import_express8 = require("express");

// src/modules/dietery/dietery.service.ts
var getAllDietaryFromDB = async () => {
  const result = await prisma.dietery.findMany({
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          role: true
        }
      }
    },
    orderBy: {
      created_at: "desc"
    }
  });
  return result;
};
var createDietaryInDB = async (dietery) => {
  const isExisting = await prisma.dietery.findUnique({
    where: {
      name: dietery.name
    }
  });
  if (isExisting) {
    return { message: "Dietery already exists" };
  }
  const result = await prisma.dietery.create({
    data: dietery
  });
  return result;
};
var deleteDieteryFromDB = async (dietery_id) => {
  const isExistDietery = await prisma.dietery.findUnique({
    where: {
      id: dietery_id
    }
  });
  if (!isExistDietery) {
    throw new Error("This dietery does not exists");
    return;
  }
  const result = await prisma.dietery.delete({
    where: {
      id: dietery_id
    }
  });
  return result;
};
var dietaryService = {
  getAllDietaryFromDB,
  createDietaryInDB,
  deleteDieteryFromDB
};

// src/modules/dietery/dietery.controller.ts
var getAllDietary = async (req, res) => {
  try {
    const result = await dietaryService.getAllDietaryFromDB();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
var createDietary = async (req, res) => {
  try {
    const payload = req.body;
    const result = await dietaryService.createDietaryInDB(payload);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
var deleteDietary = async (req, res) => {
  try {
    const { dietaryId } = req.params;
    const dietary_id = dietaryId;
    const result = await dietaryService.deleteDieteryFromDB(dietary_id);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
var dietaryController = {
  getAllDietary,
  createDietary,
  deleteDietary
};

// src/modules/dietery/dietery.route.ts
var router8 = (0, import_express8.Router)();
router8.get("/dietaries", dietaryController.getAllDietary);
router8.post("/dietaries", dietaryController.createDietary);
router8.delete("/dietaries/:dietaryId", dietaryController.deleteDietary);
var dietaryRouter = router8;

// src/modules/cart/cart.route.ts
var import_express9 = require("express");

// src/modules/cart/cart.service.ts
var getUserCartFromDB = async (userId) => {
  const userData = prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  if (!userData) {
    throw new Error("This user not found");
    return;
  }
  const result = await prisma.cart.findMany({
    where: {
      user_id: userId
    },
    include: {
      cartItems: {
        include: {
          meal: {
            include: {
              category: {
                select: {
                  id: true,
                  name: true
                }
              },
              cuisine: {
                select: {
                  id: true,
                  name: true
                }
              },
              dietery: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      }
    }
  });
  return result;
};
var createCartInDB = async (payload) => {
  const { user_id, meal_id, quantity } = payload;
  const isExistingUser = await prisma.user.findUnique({
    where: {
      id: user_id
    }
  });
  if (!isExistingUser) {
    throw new Error("User not found");
    return;
  }
  const isExistMeal = await prisma.meal.findUnique({
    where: {
      id: meal_id
    }
  });
  if (!isExistMeal) {
    throw new Error("Meal not found");
    return;
  }
  let cart = await prisma.cart.findUnique({
    where: {
      user_id
    }
  });
  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        user_id
      }
    });
  }
  let cartItem = await prisma.cartItem.findUnique({
    where: {
      cart_id_meal_id: {
        cart_id: cart.id,
        meal_id
      }
    }
  });
  if (cartItem) {
    const result = await prisma.cartItem.update({
      where: {
        cart_id_meal_id: {
          cart_id: cart.id,
          meal_id
        }
      },
      data: {
        quantity: Number(cartItem.quantity) + Number(quantity)
      }
    });
    return result;
  } else {
    const result = await prisma.cartItem.create({
      data: {
        cart_id: cart.id,
        meal_id,
        quantity: Number(quantity)
      }
    });
    return result;
  }
};
var deleteCartItemFromDB = async ({ cartId, user_id, meal_id }) => {
  const isExistingUser = await prisma.user.findUnique({
    where: {
      id: user_id
    }
  });
  if (!isExistingUser) {
    throw new Error("User not found");
    return;
  }
  const isExistingCart = await prisma.cart.findUnique({
    where: {
      id: cartId
    }
  });
  if (!isExistingCart) {
    throw new Error("Cart not found");
    return;
  }
  const isExistMeal = await prisma.meal.findUnique({
    where: {
      id: meal_id
    }
  });
  if (!isExistMeal) {
    throw new Error("Meal not found");
    return;
  }
  const deleteCartItem2 = await prisma.cartItem.delete({
    where: {
      cart_id_meal_id: {
        cart_id: cartId,
        meal_id
      }
    }
  });
  return deleteCartItem2;
};
var cartService = {
  getUserCartFromDB,
  createCartInDB,
  deleteCartItemFromDB
};

// src/modules/cart/cart.controller.ts
var getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await cartService.getUserCartFromDB(userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
var createCart = async (req, res) => {
  try {
    const payload = req.body;
    const result = await cartService.createCartInDB(payload);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
var deleteCartItem = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { user_id, meal_id } = req.body;
    const result = await cartService.deleteCartItemFromDB({ cartId, user_id, meal_id });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
var cartController = {
  getUserCart,
  createCart,
  deleteCartItem
};

// src/modules/cart/cart.route.ts
var router9 = (0, import_express9.Router)();
router9.get("/cart/:userId", cartController.getUserCart);
router9.post("/cart", cartController.createCart);
router9.delete("/cart/:cartId", cartController.deleteCartItem);
var cartRouter = router9;

// src/modules/wishlist/wishlist.route.ts
var import_express10 = require("express");

// src/modules/wishlist/wishlist.service.ts
var getUserWishListFromDB = async (userId) => {
  const userData = prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  if (!userData) {
    throw new Error("This user not found");
    return;
  }
  const result = await prisma.wishlist.findMany({
    where: {
      user_id: userId
    },
    include: {
      wishlistItems: {
        include: {
          meal: {
            include: {
              category: {
                select: {
                  id: true,
                  name: true
                }
              },
              cuisine: {
                select: {
                  id: true,
                  name: true
                }
              },
              dietery: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        }
      }
    }
  });
  return result;
};
var createWishListInDB = async (user_id, meal_id) => {
  const isExistUser = await prisma.user.findUnique({
    where: { id: user_id }
  });
  if (!isExistUser) {
    throw new Error("User not found");
    return;
  }
  const isExistMeal = await prisma.meal.findUnique({
    where: { id: meal_id }
  });
  if (!isExistMeal) {
    throw new Error("Meal not found");
    return;
  }
  let wishList = await prisma.wishlist.findUnique({
    where: {
      user_id
    }
  });
  if (!wishList) {
    wishList = await prisma.wishlist.create({
      data: {
        user_id
      }
    });
  }
  let wishListItem = await prisma.wishlistItem.findFirst({
    where: {
      meal_id,
      wishlist_id: wishList.id
    }
  });
  if (!wishListItem) {
    wishListItem = await prisma.wishlistItem.create({
      data: {
        meal_id,
        wishlist_id: wishList.id
      }
    });
    return wishListItem;
  } else {
    throw new Error("This item already exists in wish list");
    return;
  }
};
var deleteWishListItemFromDB = async ({ wishListId, user_id, meal_id }) => {
  const isExistsWishList = await prisma.wishlist.findUnique({
    where: {
      id: wishListId
    }
  });
  if (!isExistsWishList) {
    throw new Error("Wish list not found");
    return;
  }
  const isExistMeal = await prisma.meal.findUnique({
    where: { id: meal_id }
  });
  if (!isExistMeal) {
    throw new Error("Meal not found");
    return;
  }
  const isExistUser = await prisma.user.findUnique({
    where: { id: user_id }
  });
  if (!isExistUser) {
    throw new Error("User not found");
    return;
  }
  const deleteWishListItem2 = await prisma.wishlistItem.delete({
    where: {
      wishlist_id_meal_id: {
        meal_id,
        wishlist_id: wishListId
      }
    }
  });
  return deleteWishListItem2;
};
var wishListService = {
  getUserWishListFromDB,
  createWishListInDB,
  deleteWishListItemFromDB
};

// src/modules/wishlist/wishlist.controller.ts
var getUserWishList = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await wishListService.getUserWishListFromDB(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
var createWishList = async (req, res) => {
  try {
    const { user_id, meal_id } = req.body;
    const result = await wishListService.createWishListInDB(user_id, meal_id);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
var deleteWishListItem = async (req, res) => {
  try {
    const { wishListId } = req.params;
    const { user_id, meal_id } = req.body;
    const result = await wishListService.deleteWishListItemFromDB({ wishListId, user_id, meal_id });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
var wishListController = {
  getUserWishList,
  createWishList,
  deleteWishListItem
};

// src/modules/wishlist/wishlist.route.ts
var router10 = (0, import_express10.Router)();
router10.get("/wishlist/:userId", wishListController.getUserWishList);
router10.post("/wishlist", wishListController.createWishList);
router10.delete("/wishlist/:wishListId", wishListController.deleteWishListItem);
var wishListRouter = router10;

// src/app.ts
var app = (0, import_express11.default)();
app.use((0, import_cors.default)({
  origin: process.env.APP_URL || "http://localhost:3000",
  credentials: true
}));
app.use(import_express11.default.json());
app.all("/api/auth/*splat", (0, import_node.toNodeHandler)(auth));
app.use("/api", mealRouter);
app.use("/api", userRouter);
app.use("/api", orderRouter);
app.use("/api", reviewRouter);
app.use("/api", profileRouter);
app.use("/api/admin", orderRouter);
app.use("/api/admin", categoryRouter);
app.use("/api/admin", cuisineRouter);
app.use("/api/admin", dietaryRouter);
app.use("/api", cartRouter);
app.use("/api", wishListRouter);
app.get("/", (req, res) => {
  res.send("FoodHub server is running");
});
var app_default = app;

// src/index.ts
var index_default = app_default;
