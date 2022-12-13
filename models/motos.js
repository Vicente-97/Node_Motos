const { Schema, model} = require('mongoose');

const motosSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory']
    },
    cilindrada: {
        type: String,
        required: [true, 'cilindrada is mandatory'],
        
    },
    color: {
        type: String,
        required: [true, 'color is require'],
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'SELL_ROLE']
    }

    
})

motosSchema.methods.toJSON = function() {
    const { __v, _id, ...moto} = this.toObject();
    moto.uid = _id;
    return moto;
}

module.exports = model( 'Motos', motosSchema )
