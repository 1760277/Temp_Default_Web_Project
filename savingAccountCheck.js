const DB = require('./Model/db');
const BLUEBIRD = require('bluebird');
const SAVING_ACCOUNT = require('./Model/savingAccount');

const SYNC_INTERVAL = Number(process.env.SYNC_INTERVAL || 86400000);

DB.sync().then(async function () {
    for (;;) {
        const today = new Date();
        const savingAccountList = await SAVING_ACCOUNT.findAllSavingAccount();
        await BLUEBIRD.each(savingAccountList, async function (item) {
            //console.log(item.closeDate);
            if (item.closeDate == today){
                item.status = false;
                item.save();
            }
        });
        await BLUEBIRD.delay(SYNC_INTERVAL);
    }
}).catch(console.error);