/* global Module */

/* Magic Mirror
 * Module: MMM-Traffic
 *
 * By Sam Lewis https://github.com/SamLewis0602
 * MIT Licensed.
 */

Module.register('MMM-Days', {

	defaults: {
		interval: 300000, //all modules use milliseconds
		loadingText: 'Calculating days since events',
		appendSinceText: ' days since ',
		appendUntilText: ' days until ',
		changeColor: false,
		limitYellow: 10,
		limitRed: 30,
		header: 'Events',
		showGreen: false,
		language: config.language,
		show_summary: true,
		sinceHeaderText : 'Since',
		untilHeaderText : 'Until',
		todayHeaderText : 'Today',
	},      
                
	start: function() {
		Log.info('Starting module: ' + this.name);
		if (this.data.classes === 'MMM-DaysSince') {
			this.data.classes = 'bright medium';
		}
		this.loaded = true;
		this.appendSinceText = ' days since ';
		this.appendUntilText = ' days until ';
		
		this.sinceHeaderText = 'Since';
		this.untilHeaderText = 'Until';
		this.todayHeaderText = 'Today';
		
		this.updateEvent(this);
	},

	updateEvent: function(self) {
		Log.info('Updating time since');

		this.dates = [
			["Haircut", "2016-07-10"],
			["Cleaning", "2016-07-15"],
			["Paycheck", "2016-07-29"],
			["Birthday", "2017-06-01"],
			["Madrid", "2016-08-18"],
			["Idas fødselsdag", "2016-11-22"],
			["Christmas", "2016-12-24"]
		];
		
		//Sort the dates
		this.dates.sort(function(a,b) { 
		    return new Date(a[1]).getTime() - new Date(b[1]).getTime() 
		});

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
		var sinceSet = false;
		var untilSet = false;
		var todaySet = false;

		for (var key in this.dates) {
			Log.info('In loop ' + key);
			
			var e = this.dates[key];	
			var info = document.createElement('div'); //support for config.changeColor

			var header = document.createElement('span');
			header.innerHTML = e[0];
			header.className = 'dimmed';

			info.appendChild(header);

			var description = document.createElement('div');
			description.className = 'dimmed small';
			
			var date = new Date(e[1]);
			var today = new Date();
			var days = Math.round((today-date)/(1000*60*60*24)); 

			var dayString;
			if(days < 0){
				
				
				if(untilSet == false){
					untilSet = true;
					var until = document.createElement('div');
					until.className = 'bright small';
					until.innerHTML = this.untilHeaderText;
					wrapper.appendChild(until);
				}
				days = -days;
				dayString = ""+days + this.appendUntilText + e[0].toLowerCase();
			}else if(days > 0){
				if(sinceSet == false){
					sinceSet = true;
					var since = document.createElement('div');
					since.className = 'bright small';
					since.innerHTML = this.sinceHeaderText;
					wrapper.appendChild(since);
				}
				
				dayString = ""+days + this.appendSinceText + e[0].toLowerCase();
			}else{
				if(todaySet == false){
					todaySet = true;
					var today = document.createElement('div');
					today.className = 'bright small';
					today.innerHTML = this.todayHeaderText;
					wrapper.appendChild(today);
				}
				
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
