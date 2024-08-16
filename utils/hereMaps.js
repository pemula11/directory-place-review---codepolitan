
const ExpressError = require('./ErrorHandler');
const baseurl = 'https://geocode.search.hereapi.com/v1/';
const apiKey = 'Z5k1RNG4mzBBAVsUYqyL1knF2g6_iGaNsPK94CJx1-c';



const geoCode = async (address) => {
    const url = `${baseurl}/geocode?q=${address}&limit=1&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.items[0].position;
    } catch (error) {
        console.log('Error fetching data', error);
        
    }
}

const geometry = async (address) => {
    try {
        const position = await geoCode(address);
        
        return {
            type: 'Point',
            coordinates: [position.lng, position.lat]
        }
    } catch (error) {
        throw new ExpressError('Error getting geometry: '+ error, 400);
    }
}

module.exports = {
    geoCode,
    geometry
}