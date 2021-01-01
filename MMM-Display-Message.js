/* global Module */

/* Magic Mirror
 * Module: MMM-Display-Message
 *
 * By Tohmas Vennberg
 * MIT Licensed.
 */

Module.register("MMM-Display-Message", {

	// Default module config.
	defaults: {
		title: ""
	},

	getHeader: function() {
		return "<span class='bright'>" + this.config.title + "</span>";
	},

	// Define required translations.
	getTranslations: function() {
		// The translations for the defaut modules are defined in the core translation files.
		// Therefor we can just return false. Otherwise we should have returned a dictionairy.
		// If you're trying to build yiur own module including translations, check out the documentation.
		return false;
	},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);
		this.loaded = false;
		this.message = "No message!";
		// this.updateWord();
	},

	// Override dom generator.
	getDom: function() {

		var wrapper = document.createElement("div");

		if (!this.loaded) {
			wrapper.innerHTML = this.translate("LOADING");
			wrapper.className =	"dimmed light small";
			return wrapper;
		}

		// The message
		var small = document.createElement("div");
		small.className = "small light";

		var word = document.createElement("span");
		word.innerHTML = this.message;

		small.appendChild(word);
		wrapper.appendChild(small);

		return wrapper;
	},

	/* updateWord()
	 * Causes read of html from saob.se
	 */
	// updateWord: function() {		
		// Log.info(this.name + ": Getting the Word!")
		// this.sendSocketNotification("GET_WORD", this.config);
	// },

	/* socketNotificationReceived(notification, payload)
	 * From node_helper
	 *
	 * notification - the message
	 * payload - soab content
	 */
	// socketNotificationReceived: function(notification, payload) {
		// if (notification === "THE_MESSAGE") {
			// Log.info(this.name + ": Word received!");
			// this.message = "Hej"; //payload;

			// var div = document.createElement("div");
			// div.innerHTML = this.message;
		// }
		// this.loaded = true;
		// this.updateDom();
	// },
	
	/* notificationReceived(notification, payload, sender)
	 * From MMM-ModuleScheduler, initiates update of word
	 *
	 * notification - the message
	 * payload - ignored
	 * sender - ignored
	 */
	notificationReceived: function(notification, payload, sender) {
		if (notification === "THE_MESSAGE") {
			Log.info(this.name + ": Word received!");
			this.message = payload.msg;

			var div = document.createElement("div");
			div.innerHTML = this.message;
		}
		this.loaded = true;
		this.updateDom();
		// if (notification === "UPDATE_SAOB") {
			// Log.info(this.name + " Received UPDATE_SAOB. Payload: ", payload);
			// this.updateWord();
		// }
	},

	/* processSAOB(data)
	 * Uses the received data from saob.se to find todays word.
	 *
	 * argument data object - the html page from saob
	 */
	// processSAOB: function(
		// data
	// ) {
		// // Number of lines in webpage
		// var lines = data.split('\n');
		// Log.info(this.name + "Webpage has " + lines.length + " lines.");
		
		// // Find key "Dagens ord</"
		// for (var i = 0; i < lines.length; i++) {
			// if (lines[i].search("Dagens ord</") > 0) {
				// Log.info("Found key on line " + i);
				
				// // Dagens ord is two lines below the key
				// Log.info(lines[i+2]);
				
				// // Strip line from tags
				// var div = document.createElement("div");
				// div.innerHTML = lines[i+2];
				// this.word = div.textContent;
				// break;
			// }
		// }
		// this.loaded = true;
		// this.updateDom();
	// },
});
