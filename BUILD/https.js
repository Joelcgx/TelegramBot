"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
function startServer() {
    const APP = (0, express_1.default)();
    const PORT = process.env.PORT || 3000;
    APP.use((0, cors_1.default)());
    // Middleware for serving static resources (CSS, JS, etc.)
    APP.use(express_1.default.static(path_1.default.join(__dirname, '../web/public/')));
    APP.get("/", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../web/index.html"));
    });
    APP.listen(PORT, () => {
        console.info("Started Server in PORT: ", PORT);
    });
}
//# sourceMappingURL=https.js.map