var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
/*------------------------------------
* Author : Dang Minh Truong
* Email : mr.dangminhtruong@gmail.com
*-----------------------------------*/

var ProductSchema = new mongoose.Schema(
	{
		name : { type : String, unique : false},
		unit_price : { type : Number, default : 0 },
		promo_price : { type : Number, default : 0 },
		slug_name : String,
		descript: String,
		image : { type : String, default : 'product1a.jpg' },
		status : { type : Number, default : 0 },
		quantity : { type : Number, default : 0 },
		saled : { type : Number, default : 0 },
		category_id : { type: ObjectId, ref : 'Category'},
		colors : [
			{ code : String, quantity : { type : Number, 'default' : 0 }}
		],
		size : [
			{ code : String,quantity : { type : Number, 'default' : 0 }}
		],
		image_details : [String],
		rate : { star : Number,  summary : Number },
		comment : [
			{
				user_name : String,
				avata : String,
				content : String,
				reply : [
					{
						user_name : String,
						avata : String,
						content : String,
						createdOn: { type: Date, 'default': Date.now }
					}
				],
				createdOn: { type: Date, 'default': Date.now }
			}
		],
		createdOn: { type: Date, 'default': Date.now }
	}

);

module.exports = mongoose.model('Product', ProductSchema);