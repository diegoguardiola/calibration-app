const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instrumentIDSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    EquipmentName: {
        type: String,
        required: true
    },
    EquipmentID: {
        type: String,
        required: true
    },
    EquipmentManufacturer: {
        type: String,
        required: true
    },
    EquipmentModelNumber: {
        type: String,
        required: true
    },
    EquipmentSerialNumber: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('InstrumentID', instrumentIDSchema);
