"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("helmet"));
const helmetGuard = helmet_1.default({
    frameguard: false,
    xssFilter: true,
    hidePoweredBy: true
});
exports.default = helmetGuard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9EQUEyQjtBQUUzQixNQUFNLFdBQVcsR0FBRyxnQkFBTSxDQUFDO0lBQ3pCLFVBQVUsRUFBRSxLQUFLO0lBQ2pCLFNBQVMsRUFBRSxJQUFJO0lBQ2YsYUFBYSxFQUFFLElBQUk7Q0FDcEIsQ0FBQyxDQUFBO0FBQ0Ysa0JBQWUsV0FBVyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlbG1ldCBmcm9tICdoZWxtZXQnXG5cbmNvbnN0IGhlbG1ldEd1YXJkID0gSGVsbWV0KHtcbiAgZnJhbWVndWFyZDogZmFsc2UsXG4gIHhzc0ZpbHRlcjogdHJ1ZSxcbiAgaGlkZVBvd2VyZWRCeTogdHJ1ZVxufSlcbmV4cG9ydCBkZWZhdWx0IGhlbG1ldEd1YXJkXG4iXX0=