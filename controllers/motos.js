const {request, response} = require('express')
const Moto = require('../models/motos')


const getMotos= async(req,res) =>{
    const { limit=5, skip=0} = req.query;
    const motos = await Moto.find({state: true}).limit(Number(limit)).skip(Number(skip))
    res.json({ limit, skip, motos})
}

const addMoto = async(req = request, res= response) => {

    const { name, cilindrada, color, rol} = req.body;

    const moto = new Moto({name, cilindrada, color, rol})
    
    await moto.save();

    res.json(
        moto
    )

}

const getMotoId =async(req = request, res = response) =>{
    const id = req.params.id
    const moto = await Moto.find({ _id: id });
    if (moto!=null) {
        res.json(moto);
    } else {
        res.json({ message: `La moto ${id} no existe` })
    }

}


const updateMoto = async (req = request, res = response) => {
    const {id} = req.params;
    const moto = req.body;
    const motoEdit = await Moto.findByIdAndUpdate(id,moto)

    res.json(motoEdit)

}

const deleteMoto = async(req = request, res = response)=>{
    const id = req.params.id
    
    const moto = await Moto.findByIdAndDelete(id)

    res.json(moto)

}

module.exports = {getMotos, addMoto, getMotoId, updateMoto, deleteMoto}


