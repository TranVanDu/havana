var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const moment = require('moment');
const _ = require('lodash');
const Bill = require('../model/bill');
const xl = require('excel4node');
const Report = require('../model/report');

const todayReport = () => {
    new Promise((resolve, reject) => {
        let startDay = new Date(moment().startOf('day'));
        let endDay = new Date(moment().endOf('day'));
        let now = moment().format('DD_MM_YYYY');

        mongoose.connect('mongodb://172.18.0.2:27017/havana', {
            useMongoClient: true,
            promiseLibrary: require('bluebird')
        });

        let report = new Report({
            path: `report/${now}.xlsx`,
            title: `Báo cáo tổng hợp ngày ${now}`
        });
        report.save(error => {
            if (error) {
                console.log(error);
            } else {
                console.log("ok");
            }
        });

        Bill.aggregate(
            { $unwind: '$detais' },
            {
                $match: {
                    createdOn: {
                        $gt: startDay,
                        $lt: endDay
                    }
                }
            },
            {
                $group: {
                    _id: '$detais.product_name',
                    total: { $sum: '$detais.quantity' },
                    earned: { $sum: '$detais.price' }
                }
            },
            { $sort: { total: -1 } }
        )
            .exec((err, records) => {
                if (err) {
                    return reject(err);
                }
                
                mongoose.connection.close();
                return resolve({
                    daySum: _.sumBy(records, function (o) { return o.total; }),
                    dayEarn: _.sumBy(records, function (o) { return o.earned; }),
                    time: now
                });
            });
    })
        .then((data) => {
            let wb = new xl.Workbook();
            let ws = wb.addWorksheet('Sheet 1');


            let style = wb.createStyle({
                font: {
                    color: '#FF0800',
                    size: 12
                },
                numberFormat: '$#,##0.00; ($#,##0.00); -'
            });

            // Hàng đầu tiên trong file excel
            ws.cell(1, 1).string('Tổng doanh thu hôm nay').style(style);
            ws.cell(1, 2).string('Số sản phẩm bán ra').style(style);

            // Hàng thứ 2
            ws.cell(2, 1).number(data.daySum).style(style);
            ws.cell(2, 2).number(data.dayEarn).style(style);

            // Xuất file và lưu vào public/report
            wb.write(`../public/report/${data.time}.xlsx`);
        })
        .catch((err) => {
            throw new Error('Lỗi truy vấn');
        });
}

module.exports = todayReport;
