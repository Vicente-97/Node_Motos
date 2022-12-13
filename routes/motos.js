const express = require('express')
const router = express.Router()
const { getMotos, addMoto, getMotoId, updateMoto, deleteMoto} = require('../controllers/motos')
const { isValidRol } = require('../helpers/db-validators')
const { check } = require('express-validator')
const { validateFields } = require('../helpers/validate-fields')
const { isAdminRol,hasRol, hasRolMoto } = require('../middlewares/validate-rol')



//No me ha dado tiempo a probar los middlewares, si comentas los middlewares, funciona perfectamente 
//tanto el añadir como los get, el modificar y el borrar.

//Todos los usuarios acceden a ella.
router.get('/', getMotos)
//Todos pueden acceder a ella, busca por ID
router.get('/:id',[
    check('id','No es un id correcto').isMongoId(),
    validateFields

], getMotoId)
//Solo los usuarios con ADMIN_ROLE y SELL_ROLE 
router.post('/',[
     hasRolMoto('ADMIN_ROLE','SELL_ROLE'),
     hasRol('ADMIN_ROLE','DELETE_ROLE'),
     validateFields
], addMoto)

router.put('/:id',[
    check('id','No es un id correcto').isMongoId(),
    isAdminRol,
    validateFields

],updateMoto)
router.delete('/:id',[
    check('id','No es un id correcto').isMongoId(),
    hasRolMoto('ADMIN_ROLE','DELETE_ROLE'),
    hasRol('ADMIN_ROLE','DELETE_ROLE'),
    validateFields
],deleteMoto)

module.exports = router