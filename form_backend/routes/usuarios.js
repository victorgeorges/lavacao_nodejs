const router = require('express').Router();
const { check, body, validationResult } = require('express-validator');

router.post('/', [
	check('nome', 'Nome é campo obrigatório.').trim().escape().notEmpty(),
	check('sobrenome', 'Sobrenome é campo obrigatório.')trim().escape().notEmpty(),
	check('telefone').trim().escape().optional(),
	check('whatsapp').trim().escape(),
	check('marca', 'Marca do veículo é campo obrigatório.').trim().escape().notEmpty(),
	check('modelo', 'Modelo do veículo é campo obrigatório.')trim().escape().notEmpty(),
	check('ano','Ano tem quer ser válido').trim().escape().optional().isInt({ min: 1950, max: 2023}).toInt(),
	//check('data'))
	//campo data ainda é preciso implementação
], (req, res) => {
	const erros = validationResult(req);
	const usuario = req.body;
	const contexto = {
		usuario: usuario,
		erros: erros.array()
	};

	if (!erros.isEmpty()) {
		return res.status(422).json(contexto);
	} else {
		return res.json(contexto);
	}
});

module.exports = router;
