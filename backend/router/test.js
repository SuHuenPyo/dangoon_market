import express from "express";
import _config from "../config/_config.js";
import  * as randomHelper from '../helper/RandomHelper.js';
import { pagenation } from "../helper/PagenationHelper.js";
import mysql from "mysql2/promise";
import multer from "multer";
import multerS3 from "multer-s3";
import AWS from 'aws-sdk';
import ImportManager from "../common/IM.js";
import { uploadSignUp } from "../helper/awsHelper.js";

//validation
import { validator } from "../middleware/validator.js";
import { body, param, query, validationResult } from "express-validator";
import { DG_DB } from "../helper/dbHelper.js";

const test = express.Router();

test.get('/pki-validation/A28F39294A6FC1F2E83EF2CB7AC8B799.txt', async(req, res, next)=> {

    res.send('C50DB2841B2E204078E02A1D84BC956B22A9AF80FF508FAF9D1B89355BB387D1</br>comodoca.com');

});


export default test;
