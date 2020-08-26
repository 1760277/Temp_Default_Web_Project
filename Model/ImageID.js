const SEQUELIZE = require('sequelize');
const DB = require('./db');
const CUSTOM = require('./custom');
const { where } = require('sequelize');
const VerifyAccount = require('./verifyAccount');
const MODEL = SEQUELIZE.Model;

class ImageID extends MODEL {
    static async findById(customId) {
        return ImageID.findAll({
            where: {customId: customId},
        });
    }
    static async findAllImage() {
        return ImageID.findAll();
    }

    static  uploadFileImage(id,name, path) {
        return ImageID.create({
            customId:id,
            name: name,
            path: path,
        });
    }    
    static async findImageByCustom(id){
        return ImageID.findOne();
    }    
}

ImageID.init({    
    name: {
        type: SEQUELIZE.STRING,
    },
    path: {
        type: SEQUELIZE.STRING,
    },
}, {
    sequelize: DB,
    modelName: 'imageID',
});

CUSTOM.hasMany(ImageID);
ImageID.belongsTo(CUSTOM);
module.exports = ImageID;