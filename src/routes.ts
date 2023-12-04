import {Router} from 'express';
import CarroController from './app/controllers/carrocontroller';
import ClienteController from './app/controllers/clientecontroller';
import FuncionarioController from './app/controllers/funcionariocontroller';
import PecasController from './app/controllers/pecascontroller';
import ServicoController from './app/controllers/servicocontroller';

const router = Router();

//http://localhost:3000/carro/xxxx (pronto)
router.get('/carro/list', CarroController.list);
router.get('/carro/:placa', CarroController.find);
router.post('/insertcarro', CarroController.store);
router.delete('/carro/delete/:placa', CarroController.delete);
router.post('/updatecarro', CarroController.update);

//http://localhost:3000/cliente/xxx (pronto)
router.get('/cliente/list', ClienteController.list);
router.get('/cliente/:id', ClienteController.find);
router.post('/insertcliente', ClienteController.store);
router.delete('/cliente/delete/:id', ClienteController.delete);
router.post('/updatecliente', ClienteController.update);

//http://localhost:3000/funcionario/xxx (pronto)
router.post('/loginfuncionario', FuncionarioController.login);
router.get('/funcionario/:id', FuncionarioController.find);
router.get('/funcionario/list', FuncionarioController.list);
router.delete('/funcionario/delete/:id', FuncionarioController.delete);
router.post('/updatefuncionario/', FuncionarioController.update);
router.post('/insertfuncionario/', FuncionarioController.store);

//http://localhost:3000/pecas/xxx (pronto)
router.get('/pecas/list', PecasController.list);
router.get('/pecas/:id', PecasController.find);
router.delete('/pecas/delete/:id', PecasController.delete);
router.post('/updatepecas/', PecasController.update);
router.post('/insertpecas/', PecasController.store);

//http://localhost:3000/servico/list (pronto)
router.get('/servico/list', ServicoController.list);
router.post('/insertservico', ServicoController.store)
router.delete('/servico/delete/:id', ServicoController.delete)
router.post('/updateservico/', ServicoController.update);
router.get('/servico/:id', ServicoController.find);

export default router;