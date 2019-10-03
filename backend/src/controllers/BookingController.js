const Booking = require('../models/Booking');
const User = require('../models/User');

module.exports = {
    async store(req, res){
        const { user_id } = req.headers;
        const { id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: id,
            date,
        })

        await booking.populate('spot').populate('user').execPopulate();

        return res.json(booking);
    },

    async show(req, res){
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if (!user){
            return res.status(400).json({ error: "User does not exist" })
        }

        const bookings = await Booking.find({ user: user_id });

        //await bookings.populate('user').execPopulate();

        return res.json(bookings);
        
    }
}