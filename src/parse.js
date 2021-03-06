'use strict';

var _ = require('underscore'),
	moment = require('moment'),
	d3 = require('d3');

module.exports = function(data, key) {

	var parsed = _.filter(data, function(d) { return d.manancial == key; });

	var formatTime = d3.time.format("%Y-%-m-%-d");

	_.each(parsed, function(d, i) {
		try {
			d.volume = parseFloat(d['volume armazenado'].replace(' %', '').replace(',', '.'));
			d.pluviometria = parseFloat(d['pluviometria do dia'].replace(' mm', '').replace(',', '.'));
			d.date = formatTime.parse(d['data']);
		} catch(err) {
			delete parsed[i];
			console.log('Error on date ' + d.date);
		}

		/*
		 * VOLUME MORTO
		 */
		// if(key == 'sistemaCantareira') {

		// 	if(d.date > new Date('2014-05-16')) {
		// 		d.originalVolume = d.volume;
		// 		d.volume = d.volume - 18.5;
		// 	}

		// 	if(d.date > new Date('2014-10-24')) {
		// 		d.originalVolume = d.volume;
		// 		d.volume = d.volume - 10.6;
		// 	}

		// }

		if(parsed[i] && isNaN(d.volume)) {
			console.log('Missing data on ' + d.date);
			delete parsed[i];
		}
	});

	console.log(parsed[parsed.length-1].date);

	parsed = _.compact(parsed);

	return parsed;

}