import {data} from './data'

export function () {

    data.map(d=> {
        var scalar;
        d.date = format.parse(d.date);
        d.label = labels[d.date.getMonth()];

        // Calculate the average annual mortality, as done by Nightingale:
        // http://understandinguncertainty.org/node/214
        scalar = 1000*12 / d.army_size;
        d.disease = d.disease * scalar;
        d.wounds  = d.wounds  * scalar;
        d.other   = d.other   * scalar;
    })

		// Get the maximum value:
        var maxVal = d3.max( data, function(d) {
            return d3.max( [d.disease, d.wounds, d.other] );
        });

        // Where the maximum value gives us the maximum radius:
        var maxRadius = Math.sqrt(maxVal*12 / Math.PI);

        // Divide the dataset in two:
        var dataset2 = data.slice(12,24),
            dataset1 = data.slice(0,12);

}