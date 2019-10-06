const express = require('express');
const multer = require('multer');
const storage = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');


const routes = express.Router();
// = multer(uploadConfig);


routes.get('/', (req, res) => {
    return res.json({message:"Entrou no paradoxo code"})
});

routes.post('/sessions', SessionController.store);


routes.post('/spots', multer(storage).single('thumbnail'), SpotController.store);

routes.get('/spots', SpotController.index);


routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:id/bookings', BookingController.store);

routes.get('/users/bookings', BookingController.show);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

module.exports = routes;