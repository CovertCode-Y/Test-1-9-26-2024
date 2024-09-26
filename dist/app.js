"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const beeperRoutes_1 = __importDefault(require("./routes/beeperRoutes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/api/', beeperRoutes_1.default);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
