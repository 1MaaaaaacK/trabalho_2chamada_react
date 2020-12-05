import React, { FormEvent, useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import { Link, useHistory } from 'react-router-dom';

import '../styles/pages/detalhe.css'

function Detalhe() {
  const history = useHistory();
  const [name, setID] = useState('');
  

  function handleSubmit(event: FormEvent) {
    if(name == ''){
      history.push(`/pacientes/find/null`)
    }else{
      history.push(`/pacientes/find/${name}`)
    }
    
  }
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
  
          <div id="page-detalhe">
            <div className="content-wrapper">
  
              <main>
                <div>
                <form onSubmit={handleSubmit}>
                <label htmlFor="id">Nome </label>
                  <input
                    id="id"
                    value={name}
                    onChange={event => setID(event.target.value)} 
                  />

                  <button id="detalheEnviar" type="submit" ><FcSearch /></button>
                </form>


                </div>

                  
              </main>
  
            </div>
          </div>
        </>   
      );
  }

export default Detalhe;