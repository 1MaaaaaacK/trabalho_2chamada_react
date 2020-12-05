import React, { ChangeEvent, useEffect, useState, useCallback } from 'react';
import { AiFillDelete } from 'react-icons/ai'
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { textChangeRangeIsUnchanged } from 'typescript';
import api from '../services/api';

import '../styles/pages/detalhesFound.css'

interface Params {
  name: string;
}

interface Func {
  name: string;
  cidade: string;
  email: string;
  foto: string;
  id: number
}


const DetalhesFound: React.FC = () =>  {
  const history = useHistory();
  const { params } = useRouteMatch<Params>();
  const [pacientes, setPacientes] = useState<Func[]>();

  useEffect(() => {
    api.get(`/pacientes/find/${params.name}`).then((response) => {
      setPacientes(response.data);
    })
  }, [params.name, pacientes]);


  
    return (
        <>
        <header className="cabeca"></header>
        <div className="botoes">
               <Link to="/">
                    <button id='criar'>Criar</button>
                </Link>
                <Link to="/detalhe">
                    <button id='detalhes'>Detalhes</button>
                </Link> 

                
                </div>
          <div id="page-detalhesFound">

          {
            pacientes!= undefined ? (
              pacientes.map((paciente, index) => {
                return (
                  <div key={index} className="content-wrapper">
              
                  <main>
                    <div>
                        <p>Nome</p>
                        <strong>{paciente.name}</strong>
    
                        <p>Cidade</p>
                        <strong>{paciente.cidade}</strong>
    
                        <p>Email</p>
                        <strong>{paciente.email}</strong>

                        <img src={paciente.foto}></img> 

                        <button id="excluirEnviar" type="button" onClick={()=> {api.delete(`/pacientes/${paciente.id}`)}}><AiFillDelete style={{color: "#df1717"}}/></button>
    
                    </div>
                  
                  </main>
                  </div>
                )
              })
            ): ('Carregando')
          }
          </div>
        </>   
      );
  }

export default DetalhesFound;