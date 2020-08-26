const SEQUELIZE = require('sequelize');
const DB = require('./db');
const CUSTOM = require('./custom');
const STAFF = require('./staff');
const MODEL = SEQUELIZE.Model;

class Image extends MODEL {
    static async findById(customId) {
        return Image.findAll({
            where: {customId: customId},
        });
    }
    static async findImageById() {
        return Image.findAll();
    }
    static  uploadFileImage(id,name, path) {
        return Image.create({
            customId:id,
            name: name,
            path: path,
        });
    }
    
    static async findByIdbystaff(id) {
        return Image.findAll({
            where: {staffId: id}
        });
    }

    static  uploadFileImagebyStaff(id,name, path) {
        return Image.create({
            staffId:id,
            name: name,
            path: path,
        });
    };
}

Image.init({    
    name: {
        type: SEQUELIZE.STRING,
    },
    path: {
        type: SEQUELIZE.STRING,
    },
}, {
    sequelize: DB,
    modelName: 'image',
});

CUSTOM.hasMany(Image);
Image.belongsTo(CUSTOM);

STAFF.hasMany(Image);
Image.belongsTo(STAFF);

module.exports = Image;