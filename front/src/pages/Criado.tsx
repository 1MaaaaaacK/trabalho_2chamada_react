import React, { ChangeEvent, useEffect, useState, useCallback } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { textChangeRangeIsUnchanged } from 'typescript';
import api from '../services/api';

import '../styles/pages/criado.css'



interface Func {
  name: string;
  cpf: string;
  telefone: string;
}

const Criado: React.FC = () =>  {
  const history = useHistory();
  const [pacientes, setPacientes] = useState<Func[]>();

  useEffect(() => {
    api.get(`/pacientes`).then((response) => {

      setPacientes(response.data);
   
    })
  }, []);


  
    return (
        <>
        <header className="cabeca"></header>
        <div className="botoes">
               <Link to="/">
                    <button id='criar'>Criar</button>
                </Link>

                <Link to="/Detalhe">
                    <button id='detalhes'>Detalhes</button>
                </Link>



                </div>
                
          <div id="page-detalhesCriado">

          {
            pacientes!= undefined ? (
              pacientes.map((paciente, index) => {
                return (
                  <div key={index} className="content-wrapper">
              
                  <main>
                    <div>
                        <p>Nome</p>
                        <strong>{paciente.name}</strong>
    
                        <p>CPF</p>
                        <strong>{paciente.cpf}</strong>
    
                        <p>Telefone</p>
                        <strong>{paciente.telefone}</strong>
    
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

export default Criado;