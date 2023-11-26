"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileClientDetails = exports.createClient = void 0;
const path_1 = __importDefault(require("path"));
const http_status_codes_1 = require("http-status-codes");
const clientQueries_1 = require("../../utils/clientQueries");
const fs_1 = require("fs");
const helper_1 = require("../../utils/helper");
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const pictures = (_a = req.files) === null || _a === void 0 ? void 0 : _a.picture;
        if (!pictures) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, message: 'No picture file uploaded' });
        }
        const pictureArray = Array.isArray(pictures) ? pictures : [pictures];
        let uploadPath = '';
        for (const picture of pictureArray) {
            if (!picture.mimetype.startsWith('image')) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ success: false, message: 'Please upload an image' });
            }
            uploadPath = path_1.default.join(__dirname, '/../../Profile/pictures/', picture.name);
            yield fs_1.promises.mkdir(path_1.default.dirname(uploadPath), { recursive: true }),
                yield picture.mv(uploadPath);
        }
        const file = yield (0, helper_1.uploadtoCloud)(uploadPath);
        res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: file });
    }
    catch (error) {
        console.error('Error uploading picture:', error);
        res.status(error.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error.message });
    }
});
exports.createClient = createClient;
const fileClientDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fName, lName, Email, Address, Phone, file, owner } = req.body;
    if (![fName, lName, Email, Address, Phone, file, owner].every((value) => !!value)) {
        return res.status(400).json({
            success: false,
            message: 'Incomplete data. Please fill in all fields and try again.'
        });
    }
    const id = '#' + (0, helper_1.generateOTP)();
    const date = new Date().toISOString().split('T')[0].replace(/-/g, '/');
    try {
        yield (0, clientQueries_1.uploadClientDetails)(fName, lName, Email, Address, Phone, file, date, id, owner);
        res.status(200).json({ success: true, message: 'Client details and file uploaded successfully' });
    }
    catch (error) {
        console.error('Error uploading client details:', error);
        res.status(error.statusCode || 500).json({ success: false, error: error.message });
    }
});
exports.fileClientDetails = fileClientDetails;
