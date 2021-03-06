$(function () {
	$('#supported').text('Supported/allowed: ' + !!screenfull.enabled);

	if (!screenfull.enabled) {
		return false;
	}
	$('#toggle').click(function () {
		screenfull.toggle($('#container')[0]);
	});
});

$('.btn-admore').click(function () {
	$(this).toggleClass('active');
});

Notification.requestPermission();
var category_add = new Vue({
	el: '#category_add',
	data: {
		categoryType: 1,
		categoryName: null,
		categoryDesc: null,
		alertTypeNull: null,
		alertDescNull: null,
		alertNameNull: null
	},
	methods: {
		resetForm: function () {
			this.categoryType = null;
			this.categoryName = null;
			this.categoryDesc = null;
			this.alertTypeNull = null;
			this.alertDescNull = null;
			this.alertNameNull = null;
		},
		submited: function () {
			if (this.categoryDesc == null) {
				return this.alertDescNull = 'This field is required';
			}
			else if (this.categoryName == null) {
				return this.alertNameNull = 'This field is required';
			}
			else if (this.categoryType == null) {
				return this.alertTypeNull = 'This field is required';
			} else {
				axios.post('/admin/category/add', {
					type: this.categoryType,
					name: this.categoryName,
					desc: this.categoryDesc,
				})
					.then(function (response) {
						if (response.data.status === 'inserted') {
							category_add.resetForm();
							toastr.options.closeButton = true;
							toastr.success('New category inserted!');
						}
					})
					.catch(function (error) {
						toastr.options.closeButton = true;
						toastr.warning('Opps!, something went wrong');
					});
			}
		}
	}
});


if (document.getElementById('admin_index')) {
	var admin_index = new Vue({
		el: '#admin_index',
		data: {

		},
		methods: {

		},
		mounted: function () {
			axios.get('/admin/line-chart')
				.then(function (response) {
					let data = response.data;
					new Chart(document.getElementById('line-chart'), {
						type: 'line',
						data: {
							labels: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
							datasets: [{
								data: [data.sunday, data.monday, data.tueDay, data.weDay, data.thuDay, data.friDay, data.satuDay],
								label: 'Biên độ doanh thu',
								borderColor: '#52D0C4',
								fill: false
							}
							]
						},
						options: {
							title: {
								display: true,
								text: 'Đồ thị doanh thu tuần này '
							}
						}
					});
				})
				.catch(function (error) {
					throw new error;
				});
		}
	});
}

const bills = new Vue({
	el: '#bills',
	data: {
		bills: null,
		startDay: null,
		endDay: null,
		byStage: null,
		byStatus: null,
		showStage: false
	},
	methods: {
		fill: function () {
			this.startDay = $('#fill-start-day').val();
			this.endDay = $('#fill-end-day').val();
			if (this.byStage !== null && this.byStatus === null
				&& this.startDay === '' && this.endDay === '') {
				if (this.byStage === 'week') {
					axios.get('/admin/bills/week-data')
						.then((response) => {
							this.bills = response.data;
							this.byStage = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else {
					axios.get('/admin/bills/month-data')
						.then((response) => {
							this.bills = response.data;
							this.byStage = null;
						})
						.catch((error) => {
							throw new error;
						});
				}
			} else if (this.byStatus !== null && this.byStage === null
				&& this.startDay === '' && this.endDay === '') {

				if (this.byStatus == 'done') {
					axios.get('/admin/bills/status-data?status=4')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else if (this.byStatus == 'pendding') {
					axios.get('/admin/bills/status-data?status=1')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else if (this.byStatus == 'shipping') {
					axios.get('/admin/bills/status-data?status=3')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else {
					axios.get('/admin/bills/status-data?status=2')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
						})
						.catch(function (error) {
							throw new error;
						});
				}
			} else if (this.byStage !== null && this.byStatus !== 0
				&& this.startDay === '' && this.endDay === '') {
				if (this.byStage == 'week' && this.byStatus == 'done') {
					axios.get('/admin/bills/week-done-data')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
							this.byStage = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else if (this.byStage == 'week' && this.byStatus == 'pendding') {
					axios.get('/admin/bills/week-pendding-data')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
							this.byStage = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else if (this.byStage == 'week' && this.byStatus == 'shipping') {
					axios.get('/admin/bills/week-shipping-data')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
							this.byStage = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else if (this.byStage == 'week' && this.byStatus == 'confirmed') {
					axios.get('/admin/bills/week-confirm-data')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
							this.byStage = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else if (this.byStage == 'month' && this.byStatus == 'done') {
					axios.get('/admin/bills/month-done-data')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
							this.byStage = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else if (this.byStage == 'month' && this.byStatus == 'pendding') {
					axios.get('/admin/bills/month-pendding-data')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
							this.byStage = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else if (this.byStage == 'month' && this.byStatus == 'shipping') {
					axios.get('/admin/bills/month-shipping-data')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
							this.byStage = null;
						})
						.catch(function (error) {
							throw new error;
						});
				} else {
					axios.get('/admin/bills/month-confirm-data')
						.then((response) => {
							this.bills = response.data;
							this.byStatus = null;
							this.byStage = null;
						})
						.catch(function (error) {
							throw new error;
						});
				}
			}
			else if (this.startDay !== '' && this.endDay !== ''
				&& this.byStage == null && this.byStatus == null) {
				axios.post('/admin/bills/start-end-data', {
					startDay: this.startDay,
					endDay: this.endDay
				})
					.then((response) => {
						this.bills = response.data;
						this.startDay = null;
						this.endDay = null;
						$('#fill-start-day').val('');
						$('#fill-end-day').val('');
					})
					.catch(function (error) {
						throw new error;
					});
			}
			else if (this.startDay !== '' && this.endDay !== ''
				&& this.byStage == null && this.byStatus !== null) {
				if (this.byStatus == 'pendding') {
					axios.post('/admin/bills/start-end-pedding', {
						startDay: this.startDay,
						endDay: this.endDay
					}).then((response) => {
						this.bills = response.data;
						this.startDay = null;
						this.endDay = null;
					});
				} else if (this.byStatus == 'confirmed') {
					axios.post('/admin/bills/start-end-confirmed', {
						startDay: this.startDay,
						endDay: this.endDay
					}).then((response) => {
						this.bills = response.data;
						this.startDay = null;
						this.endDay = null;
					});
				} else if (this.byStatus == 'shipping') {
					axios.post('/admin/bills/start-end-shipping', {
						startDay: this.startDay,
						endDay: this.endDay
					}).then((response) => {
						this.bills = response.data;
						this.startDay = null;
						this.endDay = null;
					});
				} else if (this.byStatus == 'done') {
					axios.post('/admin/bills/start-end-done', {
						startDay: this.startDay,
						endDay: this.endDay
					}).then((response) => {
						this.bills = response.data;
						this.startDay = null;
						this.endDay = null;
					});
				}
			}
		}


	},
	mounted: function () {
		$('#fill-start-day').datepicker({ dateFormat: 'yy-mm-dd' });
		$('#fill-end-day').datepicker({ dateFormat: 'yy-mm-dd' });
		axios.get('/admin/bills/today-data')
			.then((response) => {
				this.bills = response.data;
			})
			.catch(function (error) {
				throw new error;
			});
	}
});


const addProduct = new Vue({
	el: '#add_product',
	data: {
		product_name: null,
		unit_price: null,
		promo_price: null,
		description: null,
		quantity: null,
		product_type: null,
		imgDetailsNum: 1,
		colors: [
			{
				code: '#F25C27',
				quantity: 1
			}
		],
		sizes: [
			{
				code: 'XL',
				quantity: 1
			}
		],
		promoPriceAlert: null,
		unitPriceAlert: null,
		quantityAlert: null,
		equalColorAlert: null,
		equalSizeAlert: null
	},
	methods: {
		checkValidate: function () {
			if (this.validatePromoPrice() && this.validateUnitPrice() && this.validateQuantity()) {
				let cqty = 0, sqty = 0;
				this.sizes.forEach((item) => {
					sqty += parseInt(item.quantity);
				});
				this.colors.forEach((item) => {
					cqty += parseInt(item.quantity);
				});
				if (cqty !== parseInt(this.quantity)) {
					this.equalColorAlert = 'Tổng số lượng các màu sản phẩm không phù hợp !';
					this.equalSizeAlert = null;
				} else if (sqty !== parseInt(this.quantity)) {
					this.equalColorAlert = null;
					this.equalSizeAlert = 'Tổng số lượng các sizes không phù hợp !';
				} else {
					this.equalColorAlert = null;
					this.equalSizeAlert = null;
					this.$refs.form.submit();
				}
			}
		},
		validatePromoPrice: function () {
			if (isNaN(this.promo_price)) {
				this.promoPriceAlert = 'Price must be an integer value';
				return false;
			} else if (!isNaN(this.promo_price) && this.promo_price < 0) {
				this.promoPriceAlert = 'Price must be greater than 0';
				return false;
			} else if (Number(this.promo_price) >= Number(this.unit_price)) {
				this.promoPriceAlert = 'Promotion price must less than unit price';
				return false;
			}
			else {
				this.promoPriceAlert = null;
				return true;
			}

		},

		validateUnitPrice: function () {
			if (isNaN(this.unit_price)) {
				this.unitPriceAlert = 'Unit price must be an integer value';
				return false;
			} else if (!isNaN(this.unit_price) && this.unit_price < 0) {
				this.unitPriceAlert = 'Unit price must be greater than 0';
				return false;
			} else {
				this.unitPriceAlert = null;
			}
			return true;
		},

		validateQuantity: function () {
			if (isNaN(this.quantity)) {
				this.quantityAlert = 'Quantity must be an integer value';
				return false;
			}
			else if (!isNaN(this.quantity) && this.quantity < 0) {
				this.quantityAlert = 'Quantity must be greater than 0';
				return false;
			} else {
				this.quantityAlert = null;
				return true;
			}
		},
		removeColor: function (index) {
			this.colors.splice(index, 1);
		},
		adMoreColor: function () {
			this.colors.push({ code: '#F25C27', quantity: 1 });
		},
		removeSize: function (index) {
			this.sizes.splice(index, 1);
		},
		adMoreSize: function () {
			this.sizes.push({ code: 'XL', quantity: 1 });
		}
	}
});


let analytic = new Vue({
	el: '#analytic',
	data: {
		daySummary: 0,
		weekSummary: 0,
		monthSummary: 0,
		startEndSummary: 0,
		topDay: 0,
		topWeek: 0,
		topMonth: 0,
		earnedDay: 0,
		earnedWeek: 0,
		earnedMonth: 0,
		startDay: null,
		endDay: null,
		label: [],
		summary: [],
		bg_color: [],
		showDefault: true,
		startEndSale: 0,
		startEndProducts: [],
		pieChart : null
	},
	methods: {
		getRandomColor() {
			var letters = '0123456789ABCDEF';
			var color = '#';
			for (var i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			return color;
		},
		startEndData: function () {
			this.startDay = $('#start-day').val();
			this.endDay = $('#end-day').val();
			axios.post('/admin//analytic/start-end', {
				startDay: this.startDay,
				endDay: this.endDay
			})
				.then((response) => {
					this.label = [];
					this.summary = [];
					this.bg_color = [];
					this.startEndSummary = response.data.summary;
					this.showDefault = false;
					this.startEndSale = response.data.earn;
					this.startEndProducts = response.data.topProducts

					response.data.chart.forEach(item => {
						this.label.push(item._id);
						this.summary.push(item.total);
						this.bg_color.push(this.getRandomColor());
					});

					this.pieChart.config.data = {
						labels: this.label,
						datasets: [{
							label: 'Population (millions)',
							backgroundColor: this.bg_color,
							data: this.summary
						}]
					};
					this.pieChart.update();
				});
		}
	},
	mounted: function () {
		$('#start-day').datepicker({ dateFormat: 'yy-mm-dd' });
		$('#end-day').datepicker({ dateFormat: 'yy-mm-dd' });

		axios.get('/admin/analytic-data')
			.then((response) => {

				this.earnedDay = response.data.dayEarn;
				this.earnedWeek = response.data.weekEarn;
				this.earnedMonth = response.data.monthEarn;
				this.daySummary = response.data.daySum;
				this.weekSummary = response.data.weekSum;
				this.monthSummary = response.data.monthSum;
				this.topDay = response.data.days;
				this.topWeek = response.data.week;
				this.topMonth = response.data.month;



				response.data.chart.forEach(item => {
					this.label.push(item._id);
					this.summary.push(item.total);
					this.bg_color.push(this.getRandomColor());
				});

				 this.pieChart = new Chart(document.getElementById('pie-chart-men'), {
					type: 'pie',
					data: {
						labels: this.label,
						datasets: [{
							label: 'Population (millions)',
							backgroundColor: this.bg_color,
							data: this.summary
						}]
					},
					options: {
						title: {
							display: true,
							text: 'Tỷ lệ loại sản phẩm bán ra'
						}
					}
				});
			});
	}
});


let list_product = new Vue({
	el: '#list_product',
	data: {
		list: [],
		curretnPage: 1,
		totalPages: 5
	},

	methods: {
		paginate: function (page) {
			axios.get(`/admin/product/list-data?pages=${page}`)
				.then((response) => {
					this.list = response.data.products;
					this.totalPages = response.data.pages;
					this.curretnPage = response.data.currentPages;
				});
		},

		removeProduct: function (id) {
			swal({
				title: 'Bạn có chắc chắn muốn xóa ?',
				text: 'Loại sản phẩm này sẽ bị xóa bỏ khỏi hệ thống!',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			})
				.then((willDelete) => {
					if (willDelete) {
						axios.get(`/admin/product/remove/${id}`)
							.then((response) => {
								toastr.options.closeButton = true;
								toastr.success('Xóa thành công !');
								this.list = response.data.products;
								this.totalPages = response.data.pages;
								this.curretnPage = response.data.currentPages;
							});
					} else {
						swal('Hủy xóa thành công!');
					}
				});
		}
	},

	mounted: function () {
		axios.get('/admin/product/list-data')
			.then((response) => {
				this.list = response.data.products;
				this.totalPages = response.data.pages;
				this.curretnPage = response.data.currentPages;
			});
	}
});


let list_category = new Vue({
	el: '#list_category',
	data: {
		list: [],
		curretnPage: 1,
		totalPages: 5
	},

	methods: {
		paginate: function (page) {
			axios.get(`/admin/category/list-data?pages=${page}`)
				.then((response) => {
					this.list = response.data.category;
					this.totalPages = response.data.pages;
					this.curretnPage = response.data.currentPages;
				});
		},
		removeCategory: function (id) {

			swal({
				title: 'Bạn có chắc chắn muốn xóa ?',
				text: 'Loại sản phẩm này sẽ bị xóa bỏ khỏi hệ thống!',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			})
				.then((willDelete) => {
					if (willDelete) {
						axios.get(`/admin/category/remove/${id}`)
							.then((response) => {
								this.list = response.data.category;
								this.totalPages = response.data.pages;
								this.curretnPage = response.data.currentPages;
								swal('Xóa thành công!', {
									icon: 'success',
								});
							});
					} else {
						swal('Hủy xóa thành công!');
					}
				});
		}
	},

	mounted: function () {
		axios.get('/admin/category/list-data')
			.then((response) => {
				this.list = response.data.category;
				this.totalPages = response.data.pages;
				this.curretnPage = response.data.currentPages;
			});
	}
});



let list_users = new Vue({
	el: '#list_users',
	data: {
		list: [],
		curretnPage: 1,
		totalPages: 5
	},

	methods: {
		paginate: function (page) {
			axios.get(`/admin/user/list/data?pages=${page}`)
				.then((response) => {
					this.list = response.data.users;
					this.totalPages = response.data.pages;
					this.curretnPage = response.data.currentPages;
				});
		},
		removeCategory: function (id) {

			swal({
				title: 'Bạn có chắc chắn muốn xóa ?',
				text: 'Tài khoản này sẽ bị xóa bỏ khỏi hệ thống!',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			})
				.then((willDelete) => {
					if (willDelete) {
						axios.get(`/admin/user/remove/${id}`)
							.then((response) => {
								this.list = response.data.users;
								this.totalPages = response.data.pages;
								this.curretnPage = response.data.currentPages;
								swal('Xóa thành công!', {
									icon: 'success',
								});
							});
					} else {
						swal('Hủy xóa thành công!');
					}
				});
		}
	},

	mounted: function () {
		axios.get('/admin/user/list/data')
			.then((response) => {
				this.list = response.data.users;
				this.totalPages = response.data.pages;
				this.curretnPage = response.data.currentPages;
			});
	}
});


let notifications = new Vue({
	el: '#notifications',
	data: {
		notis: [],
	},
	methods: {
		fetchNoti: function () {
			axios.get('/admin/notifications')
				.then((response) => {
					this.notis = response.data.notis;
				});
		},
		watched: function (id) {
			axios.get(`/admin/notifications/watched/${id}`)
				.then((response) => {
					this.notis = response.data.notis;
				});
		}
	},
	mounted: function () {
		axios.get('/admin/notifications')
			.then((response) => {
				this.notis = response.data.notis;
			});
	}
});

const socket = io('/');
socket.on('notifiNewBills', (data) => {
	notify = new Notification(
		'Havana Admin',
		{
			body: 'Có đơn đặt hàng mới chưa được xử lý!',
			icon: 'https://freeiconshop.com/wp-content/uploads/edd/notification-flat.png',
			tag: '/admin/bills/index'
		}
	);
	notify.onclick = function () {
		window.location.href = this.tag;
	};

	axios.post('/admin/notifications/add', {
		content: 'Có đơn đặt hàng mới chưa được xử lý!'
	})
		.then((response) => {
			notifications.fetchNoti();
		});

});


socket.on('notifiNewUser', (data) => {
	notify = new Notification(
		'Havana Admin',
		{
			body: 'Có người dùng đăng ký mới !',
			icon: 'https://freeiconshop.com/wp-content/uploads/edd/notification-flat.png',
			tag: '/admin'
		}
	);
	notify.onclick = function () {
		window.location.href = this.tag;
	};

	axios.post('/admin/notifications/add', {
		content: 'Có đơn đặt hàng mới chưa được xử lý!'
	})
		.then((response) => {
			notifications.fetchNoti();
		});

});


let edit_product = new Vue({
	el: '#edit_product',
	data: {
		product: {},
		sizes: ["XXL", "XL", "L", "M", "S"],
		imgDetailsNum: 1,
	},
	methods: {
		removeColor: function (index) {
			this.product.colors.splice(index, 1);
		},
		adMoreColor: function () {
			this.product.colors.push({ code: '#F25C27', quantity: 1 });
		},
		removeSize: function (index) {
			this.product.size.splice(index, 1);
		},
		adMoreSize: function () {
			this.product.size.push({ code: 'XL', quantity: 1 });
		}
	},
	mounted: function () {
		let id = $('#curentId').val();
		axios.get(`/admin/product/edit-data/${id}`)
			.then((response) => {
				this.product = response.data.productInfor;
			});
	}
});

let user_add = new Vue({
	el: '#user_add',
	data: {
		alertRepass: '',
		userName: '',
		phone: '',
		email: '',
		password: '',
		address: '',
		repass: '',
		userRight: 4
	},
	methods: {
		addUser: function () {
			axios.post('/admin/user/add', {
				username: this.userName,
				useraddress: this.address,
				useremail: this.email,
				password: this.password,
				userphone: this.userphone,
				userRight: this.userRight
			})
				.then((response) => {
					if (response.status === 200) {
						toastr.options.closeButton = true;
						toastr.success('New user inserted!');
						this.alertRepass = '';
						this.userName = '';
						this.phone = '';
						this.email = '';
						this.password = '';
						this.address = '';
						this.repass = '';
					} else {
						toastr.options.closeButton = true;
						toastr.error('Opps, Something went wrong!');
					}
				});
		}
	}
});

let bill_details = new Vue({
	el: '#bill_details',
	data: {
		details: [],
		id: '',
		status: 1,
		list: [],
		validate: false
	},
	mounted: function () {
		let id = $('#current_bill_id').val();
		axios.get(`/admin/bills/single/detail-data/${id}`)
			.then((response) => {
				this.id = id;
				this.status = response.data.bill.status;

				let restruct = [];

				response.data.bill.detais.forEach((item) => {
					restruct.push({
						colors: item.colors,
						image: item.product_id.image,
						product_name: item.product_name,
						size: item.size,
						product_id: item.product_id,
						price: item.price,
						quantity: item.quantity,
						qty: item.quantity
					});
				});

				this.details = restruct;

				let tmp = [];
				for (i = this.status; i <= 4; i++) {
					tmp.push(i);
				}
				this.list = tmp;
			});
	},
	methods: {
		validateQty: function (qty, color, size, productId) {
			if (qty < 1) {
				toastr.error('Số lượng không hợp lệ!');
				this.validate = true;
			} else {
				axios.patch(`/admin/bills/validate/quantity`, {
					productId: productId,
					color: color,
					size: size,
					newQuantity: qty
				})
					.then((response) => {
						if (response.data.status === 502) {
							toastr.error(`${response.data.messages}`);
							this.validate = true;
						} else if (response.data.status === 200) {
							toastr.success(`${response.data.messages}`);
							this.validate = false;
						}
					});
			}
		},
		updateColor: function (colorCode, productId, index, size, newQty) {
			axios.patch(`/admin/bills/validate/quantity`, {
				productId: productId,
				color: colorCode,
				size: size,
				newQuantity: newQty
			})
				.then((response) => {
					if (response.data.status === 502) {
						toastr.error(`${response.data.messages}`);
					} else {
						swal({
							title: 'Cập nhật sản phẩm này ?',
							text: 'Đơn hàng của khách hàng bị thay đổi !',
							icon: 'warning',
							buttons: true,
							dangerMode: true,
						})
							.then((willDelete) => {
								if (willDelete) {
									axios.patch('/admin/bills/update/color', {
										color: colorCode,
										productId: productId,
										billId: this.id,
										index: index
									})
										.then((response) => {
											if (response.data.status === 200) {
												toastr.options.closeButton = true;
												toastr.success(`${response.data.messages}`);
											} else {
												toastr.options.closeButton = true;
												toastr.error(`${response.data.messages}`);
											}
										});
								} else {
									swal('Hủy thay đổi thành cônng !');
								}
							});
					}
				});
		},
		updateSize: function (size, color, productId, index, newQty) {
			axios.patch(`/admin/bills/validate/quantity`, {
				productId: productId,
				color: color,
				size: size,
				newQuantity: newQty
			})
				.then((response) => {
					if (response.data.status === 502) {
						toastr.error(`${response.data.messages}`);
					} else {
						swal({
							title: 'Cập nhật sản phẩm này ?',
							text: 'Đơn hàng của khách hàng bị thay đổi !',
							icon: 'warning',
							buttons: true,
							dangerMode: true,
						})
							.then((willDelete) => {
								if (willDelete) {
									axios.patch('/admin/bills/update/size', {
										size: size,
										productId: productId,
										billId: this.id,
										index: index
									})
										.then((response) => {
											if (response.data.status === 200) {
												toastr.options.closeButton = true;
												toastr.success(`${response.data.messages}`);
											} else {
												toastr.options.closeButton = true;
												toastr.error(`${response.data.messages}`);
											}
										});
								} else {
									swal('Hủy thay đổi thành cônng !');
								}
							});
					}
				});
		},
		removeItem: function (itemId, color, size, productId, qty) {
			if (this.details.length <= 1) {
				swal({
					title: 'Không thể xóa, đơn hàng sẽ bị rỗng',
					text: 'Mẹo ! Nếu muốn, hãy hủy bỏ đơn hàng !',
					icon: 'warning',
					dangerMode: true,
				})
			}
			else {
				swal({
					title: 'Xóa sản phẩm này ?',
					text: 'Đơn hàng của khách hàng bị thay đổi !',
					icon: 'warning',
					buttons: true,
					dangerMode: true,
				})
					.then((willDelete) => {
						if (willDelete) {
							axios.patch(`/admin/bills/single/remove/item/${this.id}`,
								{
									itemId: itemId,
									color: color,
									size: size,
									productId: productId,
									qty: qty
								})
								.then((response) => {
									if (response.data.status !== 200) {
										toastr.options.closeButton = true;
										toastr.error('Opps! something went wrong!');
									}
									else {
										toastr.options.closeButton = true;
										toastr.success('Success !');


										let restruct = [];

										response.data.bill.detais.forEach((item) => {
											restruct.push({
												colors: item.colors,
												image: item.product_id.image,
												product_name: item.product_name,
												size: item.size,
												product_id: item.product_id,
												price: item.price,
												quantity: item.quantity,
												qty: item.quantity
											});
										});

										this.details = restruct;
									}
								});
						} else {
							swal('Hủy xóa thành cônng !');
						}
					});
			}
		},
		updateItem: function (index, productId, newQty, changedQty, color, size) {
			if (newQty < 1) {
				toastr.error('Số lượng không hợp lệ!');
				this.validate = true;
			} else {
				axios.patch(`/admin/bills/validate/quantity`, {
					productId: productId,
					color: color,
					size: size,
					newQuantity: newQty
				})
					.then((response) => {
						if (response.data.status === 502) {
							toastr.error(`${response.data.messages}`);

						} else if (response.data.status === 200) {
							swal({
								title: 'Cập nhật sản phẩm này ?',
								text: 'Đơn hàng của khách hàng bị thay đổi !',
								icon: 'warning',
								buttons: true,
								dangerMode: true,
							})
								.then((willDelete) => {
									if (willDelete) {
										axios.patch(`/admin/bills/single/update/item/${this.id}`, {
											index: index,
											productId: productId,
											newQty: newQty,
											changedQty: changedQty,
											color: color,
											size, size
										})
											.then((resp) => {
												toastr.success(`Cập nhật thành công`);
											});
									} else {
										swal('Hủy thành cônng !');
									}
								});
						}
					});
			}
		},
		removeBill: function (id) {
			swal({
				title: 'Xóa bỏ đơn hàng này ?',
				text: 'Đơn hàng của khách hàng sẽ xóa bỏ !',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			})
				.then((willDelete) => {
					if (willDelete) {
						axios.delete(`/admin/bills/${id}`)
							.then((response) => {
								if (response.data.status !== 200) {
									toastr.options.closeButton = true;
									toastr.error('Opps! something went wrong!');
								} else {
									toastr.options.closeButton = true;
									toastr.success('Success !');
									setTimeout(() => {
										location.href = '/admin/bills/index';
									}, 2000);
								}
							});
					} else {
						swal('Hủy xóa thành cônng !');
					}
				});
		},
		updateStatus: function (status) {
			swal({
				title: 'Cập nhật trạng thái đơn hàng này ?',
				text: 'Đơn hàng của khách hàng thay đổi trạng thái !',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			})
				.then((willDelete) => {
					if (willDelete) {
						axios.patch(`/admin/bills/single/update/status/${this.id}`, { status: status })
							.then((response) => {
								if (response.data.status !== 200) {
									toastr.options.closeButton = true;
									toastr.error('Opps! something went wrong!');
								}
								else {
									this.status = response.data.bill.status;
									let tmp = [];
									for (i = this.status; i <= 4; i++) {
										tmp.push(i);
									}
									this.list = tmp;
									toastr.options.closeButton = true;
									toastr.success('Cập nhật trạng thái thành công !');
								}
							});
					} else {
						swal('Hủy cập nhật thành cônng !');
					}
				});
		}
	}
});

let product_statistic = new Vue({
	el: '#product_statistic',
	data: {
		products: [],
		keywords: null
	},
	mounted: function () {
		axios.get('/admin/product/report/data')
			.then((response) => {
				this.products = response.data.products;
			});
	},
	methods: {
		outOf: function () {
			axios.get('/admin/product/report/out-of-data')
				.then((response) => {
					this.products = response.data.products;
				});
		},
		inventory: function () {
			axios.get('/admin/product/report/inventory-data')
				.then((response) => {
					this.products = response.data.products;
				});
		},
		currentHas: function () {
			axios.get('/admin/product/report/data')
				.then((response) => {
					this.products = response.data.products;
				});
		},
		search: function () {
			if (this.keywords) {
				axios.get(`/admin/product/find/${this.keywords}`)
					.then((response) => {
						this.products = response.data.result;
					});
			}
		}
	}

});


socket.on('newMessage', (data) => {
	frame.messages = data.messages.messages;
	var objDiv = document.getElementById("coversation");
	objDiv.scrollTop = objDiv.scrollHeight;
});

socket.on('newUserOnline', (data) => {
	frame.onlines = data.onlineUsers;
});


let frame = new Vue({
	el: '#frame',
	data: {
		messages: [],
		onlines: [],
		currentUser: {},
		targetUser: null,
		text: '',
		show: 0
	},
	mounted: function () {
		axios.get(`/admin/chatbox/online`)
			.then((response) => {
				this.onlines = response.data.onlineUsers;
				this.currentUser = response.data.user;
			});
	},
	methods: {
		fetchMessages: function (id) {
			this.targetUser = id;
			axios.post('/admin/chatbox/message/fetch', { userId: id })
				.then((response) => {
					this.messages = response.data.conversation[0].messages;
					this.show = 1;
				});
		},
		sendMessage: function () {
			axios.post('/admin/chatbox/add/message', {
				curentId: this.currentUser._id,
				targetId: this.targetUser,
				username: this.currentUser.username,
				message: this.text
			})
				.then((response) => {
					var objDiv = document.getElementById("coversation");
					objDiv.scrollTop = objDiv.scrollHeight;
					this.text = '';
					//this.messages = response.data.messages.messages;
				});
		}
	}
});

let post_create = new Vue({
	el: '#post_create',
	data: {
		alertTitleNull: '',
		alertContentNull: '',
		title: '',
		content: ''
	},
	mounted: function () {
		CKEDITOR.replace('post_content', { height: 700 });
	},
	methods: {
		submit: function () {
			this.content = CKEDITOR.instances.post_content.getData();
			if (this.title === '') {
				this.alertTitleNull = 'Không để trống tiêu đề !'
			} else if (this.content === '') {
				this.alertContentNull = 'Không để trống nội dung!'
			} else {
				this.$refs.form.submit();
			}
		}
	}
});

let list_post = new Vue({
	el: '#list_post',
	data: {
		list: [],
		curretnPage: 1,
		totalPages: 5
	},
	mounted: function () {
		axios.get('/admin/post/list/data')
			.then((response) => {
				this.list = response.data.blogs;
				this.currentPages = response.data.currentPages;
				this.totalPages = response.data.pages;
			});
	},
	methods: {
		paginate: function (page) {
			axios.get(`/admin/post/list/data?pages=${page}`)
				.then((response) => {
					this.list = response.data.blogs;
					this.totalPages = response.data.pages;
					this.curretnPage = response.data.currentPages;
				});
		},
		removeCategory: function (id) {
			swal({
				title: 'Bạn có chắc chắn muốn xóa ?',
				text: 'Bài viết này sẽ bị xóa bỏ khỏi hệ thống!',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			})
				.then((willDelete) => {
					if (willDelete) {
						axios.delete(`/admin/post/remove/${id}`)
							.then((response) => {
								this.list = response.data.blogs;
								this.totalPages = response.data.pages;
								this.curretnPage = response.data.currentPages;
								swal('Xóa thành công!', {
									icon: 'success',
								});
							});
					} else {
						swal('Hủy xóa thành công!');
					}
				});
		}
	}
});

let post_edit = new Vue({
	el: '#post_edit',
	data: {
		alertTitleNull: '',
		alertContentNull: '',
		title: '',
		content: '',
		avata: 'product1a.jpg'
	},
	mounted: function () {
		let id = $('#current_post_id').val();
		CKEDITOR.replace('post_edit_content', { height: 700 });
		axios.get(`/admin/post/edit/data/${id}`)
			.then((response) => {
				const editor = CKEDITOR.instances['post_edit_content'];
				editor.setData(response.data.post.content);
				this.title = response.data.post.title;
				this.avata = response.data.post.avata;
			});
	}
});

let edit_user = new Vue({
	el: '#edit_user',
	data: {
		currentId: null,
		alertRepass: '',
		userName: '',
		phone: '',
		email: '',
		password: '',
		address: '',
		repass: '',
		userRight: 4,
		newpassword: ''
	},
	mounted: function () {
		userId = $('#currentUser').val();
		axios.get(`/admin/user/info/${userId}`)
			.then((response) => {
				this.currentId = response.data.user._id;
				this.userName = response.data.user.username;
				this.phone = response.data.user.phone;
				this.email = response.data.user.email;
				this.address = response.data.user.address;
				this.userRight = response.data.user.role;
			});
	},
	methods: {
		onSubmit: function () {

		},
		editUser: function () {
			axios.post('/admin/user/update', {
				id: this.currentId,
				username: this.userName,
				address: this.address,
				email: this.email,
				phone: this.phone,
				role: this.userRight,
			}).then((response) => {
				if (response.data.status !== 200) {
					toastr.options.closeButton = true;
					toastr.error('Có lỗi xảy ra !');
				} else {
					toastr.options.closeButton = true;
					toastr.success('Cập nhật thành công !');
					this.currentId = response.data.user._id;
					this.userName = response.data.user.username;
					this.phone = response.data.user.phone;
					this.email = response.data.user.email;
					this.address = response.data.user.address;
					this.userRight = response.data.user.role;
				}
			});
		}
	}
});