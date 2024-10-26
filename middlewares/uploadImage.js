
import path from 'path';
import multer from 'multer'; // Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
import { generateId } from '../helpers/tokens.js';

// Multer configuration                                          </leomarqz>
const storage = multer.diskStorage({
    // Save the file in the public/uploads/images folder
    destination: function(req, file, callback){
        callback( null, path.join('./public/uploads/images/') ); 
    },
    // Save the file with a unique name
    filename: function(req, file, callback){
        callback( null, generateId() + path.extname(file.originalname) );
    }
});

const uploadImageMiddleware = multer({ storage });

export default uploadImageMiddleware;


