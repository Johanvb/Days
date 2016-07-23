/* global Module */

/* Magic Mirror
 * Module: MMM-Traffic
 *
 * By Sam Lewis https://github.com/SamLewis0602
 * MIT Licensed.
 */

Module.register('MMM-DaysSince', {

	defaults: {
		interval: 300000, //all modules use milliseconds
		loadingText: 'Calculating days since events',
		appendSinceText: ' days since ',
		appendUntilText: ' days until ',
		changeColor: false,
		limitYellow: 10,
		limitRed: 30,
		header: 'Days since events',
		showGreen: false,
		language: config.language,
		show_summary: true
	},

	start: function() {
		Log.info('Starting module: ' + this.name);
		if (this.data.classes === 'MMM-DaysSince') {
			this.data.classes = 'bright medium';
		}
		this.loaded = true;
		this.appendText = ' days since ';
		this.updateEvent(this);
	},

	updateEvent: function(self) {
		Log.info('Updating time since');

		this.dates = [
			["Haircut", "2016-07-10"],
			["Cleaning", "2016-07-15"],
			["Paycheck", "2016-07-31"],
			["Birthday", "2017-06-01"],
			["Christmas", "2017-12-24"]
		];

		this.dayComparison = 20;
		setTimeout(function() {
			updateDom(1000);
		}, 1000);
		setTimeout(self.updateEvent, self.config.interval, self);
	},


	getStyles: function() {
		return ['dayssince.css', 'font-awesome.css'];
	},

	getDom: function() {
		Log.info('getDom: ' + this.name);

		var wrapper = document.createElement("div");

		if (!this.loaded) {
			wrapper.innerHTML = this.config.loadingText;
			return wrapper;
		}

		for (var key in this.dates) {
			Log.info('In loop ' + key);
			
			var e = this.dates[key];	
			var info = document.createElement('div'); //support for config.changeColor

			var header = document.createElement('span');
			header.innerHTML = e[0];
			//info.className = 'dimmed';

			info.appendChild(header);

			var description = document.createElement('div');
			description.className = 'dimmed small';
			
			var date = new Date(e[1]);
			var today = new Date();
			var days = Math.round((today-date)/(1000*60*60*24)); 

			var dayString;
			if(days < 0){
				dayString = ""+days + this.appendUntilText + e[0].toLowerCase();
			}else if(days > 0){
				dayString = ""+days + this.appendSinceText + e[0].toLowerCase();
			}else{
				dayString = Today;
			}	

			description.innerHTML = dayString;

			//Append children
			wrapper.appendChild(header);
			wrapper.appendChild(description);

		}
		Log.info('wrapper: ' + wrapper);

		return wrapper;
	},

	getEventDates: function() {
		var dates;
		return dates;
	},
	//
	// socketNotificationReceived: function(notification, payload) {
	//     if (notification === 'TRAFFIC_COMMUTE' && payload.url === this.url) {
	//         Log.info('received TRAFFIC_COMMUTE');
	//         this.commute = payload.commute;
	//         this.summary = payload.summary;
	//         this.trafficComparison = payload.trafficComparison;
	//         this.loaded = true;
	//         this.updateDom(1000);
	//     }
	// }


});
