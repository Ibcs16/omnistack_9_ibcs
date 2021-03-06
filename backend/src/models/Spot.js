const mongoose = require('mongoose');
require('dotenv').config();


const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    thumbnail_url: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    //toda vez que o objeto for convertido em JSON, vai calcular os vituals e colocar junto do objeto
    toJSON: {
        virtuals: true,
    }
}
    
);

//criacao de campo pelo javascript e n banco

// SpotSchema.virtual('thumbnail_url').get(function() {
//     return `${process.env.GCS_BASE_URL+this.thumbnail}`
//     //return `http://localhost:3333/files/${this.thumbnail}`
// })


module.exports = mongoose.model('Spot', SpotSchema)