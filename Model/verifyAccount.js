const SEQUELIZE = require('sequelize');
const DB = require('./db');
const { verifyPassWord } = require('./custom');
const CUSTOM = require('./custom');
const MODEL = SEQUELIZE.Model;

class VerifyAccount extends MODEL {

    static async createDefault(customId, fullName ) {

        return VerifyAccount.create(
            {
                fullName: fullName,
                customId: customId,
            }
        )
    };
    static async findByCustomId(customId){
        return VerifyAccount.findOne({
            where:{
                customId
            }
        })
    }
    static async updateAccount(id, fullName, birthDate, address, frontNationID, behindNationID,numberNationID, dateRange, addressRange) {
        return VerifyAccount.update(
            {
                fullName: fullName,
                birthDate: birthDate,
                address: address,
                frontNationID: frontNationID,
                behindNationID: behindNationID,
                numberNationID: numberNationID,
                dateRange: dateRange,
                addressRange: addressRange,
                status: false,
            }, {

            where: { customId: id }
        });
    };

    static async updateStatus(id) {
        verifyPassWord.update({
            status: true
        },
            {
                where: { customId: id }
            });
    };

    static async findInfoByUserId(customId) {
        return VerifyAccount.findOne({
            where: customId,
        })
    };

    static async findAllVerifyAccount() {
        return VerifyAccount.findAll();
    };

    static async updateRequest_False(id) {
        VerifyAccount.update({
            requestVerify: false
        },
            {
                where: { customId: id }
            });
    };

    static async updateRequest_True(id) {
        VerifyAccount.update({
            requestVerify: true
        },
            {
                where: { customId: id }
            });
    };

    async getRequestDone() {
        this.requestVerify = fasle;
        return this.save();
    };
    
    static async findAllRequestNotCheck() {
        return VerifyAccount.findAll({
            where: {
                requestVerify: true,
            }
        });
    };

}
VerifyAccount.init({
    fullName: {
        type: SEQUELIZE.STRING,
        allowNull: false,
    },
    birthDate: {
        type: SEQUELIZE.DATEONLY,
        allowNull: true,
    },
    address: {
        type: SEQUELIZE.STRING,
        allowNull: true,
    },
    frontNationID: {
        type: SEQUELIZE.BLOB,
        allowNull: true,
    },
    behindNationID: {
        type: SEQUELIZE.BLOB,
        allowNull: true,
    },
    numberNationID: {
        type: SEQUELIZE.STRING,
        allowNull: true,
    },
    dateRange: {
        type: SEQUELIZE.DATEONLY,
        allowNull: true,
    },
    addressRange: {
        type: SEQUELIZE.STRING,
        allowNull: true,
    },
    status: {
        type: SEQUELIZE.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    requestVerify: {
        type: SEQUELIZE.BOOLEAN,
        defaultValue: false,
        allowNull: true,
    }
}, {
    sequelize: DB,
    modelName: 'verifyAccount',
});
CUSTOM.hasMany(VerifyAccount);
VerifyAccount.belongsTo(CUSTOM)
module.exports = VerifyAccount;