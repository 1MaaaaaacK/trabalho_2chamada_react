import { Request, Response } from 'express';
import { getConnection, getRepository, Like } from 'typeorm';
import PacientesView from '../views/Pacientes_view';
import * as Yup from 'yup';

import Pacientes from '../models/Pacientes';

export default {
  async index(request: Request, response: Response) {
    const dependentesRepository = getRepository(Pacientes);

    const dependenteFoto = await dependentesRepository.find({
      select: ['name', 'cidade', 'foto', 'email', 'id', 'cpf', 'telefone']
    });
    return response.json(PacientesView.renderMany(dependenteFoto));
  },

  async show(request: Request, response: Response) {
    const { name } = request.params;
    const dependenteRepository = getRepository(Pacientes);
    let dependentesCatch = null
   if(name === 'null'){

       dependentesCatch = await dependenteRepository.find({
        select: ['name', 'cidade', 'email', 'foto', 'id']
      });
    }else {
       dependentesCatch = await dependenteRepository.find({where: {name: Like(`%${name}%`)}});
    }
    let dependentesJson: Array<object> = []
     for(let i in dependentesCatch){

     dependentesJson[i] = {
      name: dependentesCatch[i].name,
      cidade: dependentesCatch[i].cidade,
      email: dependentesCatch[i].email,
      foto: `http://localhost:3333/uploads/${dependentesCatch[i].foto}`
    }
  }
    return response.json(dependentesJson);  
  },
  async showCreated(request: Request, response: Response) {
    const { id } = request.params;
    const dependenteRepository = getRepository(Pacientes);
     const dependentesCatch = await dependenteRepository.findOneOrFail(id); 
    
    return response.json(PacientesView.render(dependentesCatch)); 
  },
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const pacientesRepository = getRepository(Pacientes);

    const pacientesCatch = await pacientesRepository.findOneOrFail(id);


      
        await pacientesRepository.delete(pacientesCatch)
      
      

    return response.json(PacientesView.render(pacientesCatch)); 
  },

  async create(request: Request, response: Response) {
    const {
      name,
      cidade,
      cpf,
      email,
      telefone
    } = request.body
    const pacientesRepository = getRepository(Pacientes);

    const requestImages = request.files as Express.Multer.File[];
    const fotos = requestImages.map(image => {
      return image.filename
    })
    let foto = fotos[0]
    const data = {
      name,
      cidade,
      cpf,
      email,
      telefone,
      foto
    }
    const schema = Yup.object().shape({
      name: Yup.string().required('Voce deve preencher o campo name'),
      cidade: Yup.string().required('Voce deve preencher o campo cidade'),
      cpf: Yup.string().required('Voce deve preencher o campo cpf'),
      email: Yup.string().required('Voce deve preencher o campo email'),
      telefone: Yup.string().required('Voce deve preencher o campo telefone'),
      foto: Yup.string().required('Voce deve preencher o campo foto')

    });

    await schema.validate(data, {
      abortEarly: false
    })



    const pacientes = pacientesRepository.create(data);

    await pacientesRepository.save(pacientes);


    const pacientesCatch = await pacientesRepository.find({
      select: ['id','name', 'telefone', 'cpf']
    });
    return response.status(201).json(PacientesView.renderMany(pacientesCatch) ); 
  },


};
