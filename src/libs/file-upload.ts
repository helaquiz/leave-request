import * as multer from 'multer';
import * as path from 'path';

import * as dateHelper from '../libs/date-helper';

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        // callback(null, path.join(__dirname, '../..', './public/images/review_snaps'))
        callback(null, './uploads')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '_' + dateHelper.getYYYYMMDD(new Date()) + '_' + dateHelper.getNoColonTime(new Date()) + path.extname(file.originalname))
    }
})

export const upload: any = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname)
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(Error('Only images are allowed'), false)
        }
        callback(null, true)
    }
}).single('avatar')