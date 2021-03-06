const Booking = require('../models/Booking');


module.exports = {
    async store(req, res){

        const { booking_id } = req.params;
        const { user_id } = req.headers;

        const booking = await Booking.findById(booking_id).populate('spot');
        

        // if(booking.spot.user!==user_id){
        //     return res.status(403).json({ error: "You do not have permission to reject this booking" })
        // }else if(booking.approved){
        //     return res.status(401).json({ error: "You cannot reject an approved booking" })
        // }

        booking.approved = false;

        await booking.save();

        const bookingUserSocket = req.connectedUsers[booking.user]

        if(bookingUserSocket){
            req.io.to(bookingUserSocket).emit('booking_response', booking);
        }


        return res.json(booking);
    }
}