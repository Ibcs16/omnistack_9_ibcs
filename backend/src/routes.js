const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const routes = express.Router();
const upload = multer(uploadConfig);


routes.get('/', (req, res) => {
    return res.json({message:"Entrou no paradoxo code"})
});

routes.post('/sessions', SessionController.store);


routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/spots', SpotController.index);


routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:id/bookings', BookingController.store);

routes.get('/users/bookings', BookingController.show);

module.exports = routes;