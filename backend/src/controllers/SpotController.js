const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {

    async index(req, res){
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech});
        
        return res.json(spots);
    
    },

    async store(req, res){
        const { filename, key, location: url = '' } = req.file;
        const { company, techs, price } = req.body;

        const { user_id } = req.headers;


        const user = await User.findById(user_id);

        let numberOfSpotsbyUser = await Spot.countDocuments({ user: user_id });

        if(numberOfSpotsbyUser<3){
            return res.status(429).json({ error: "Já registrou spots demais" })
        }

        if (!user){
            return res.status(400).json({ error: "User does not exist" })
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: key,
            thumbnail_url: url,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price
        })




        return res.json(spot)
    }
}