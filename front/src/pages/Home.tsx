import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { FcAddImage } from 'react-icons/fc';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { Link, useHistory } from 'react-router-dom';
import api from '../services/api';

import '../styles/pages/home.css'

interface Func {
  id: string;
}

const Home: React.FC = () => {
  const history = useHistory();
  
  const [name, setName] = useState('');
  const [cidade, setFunctions] = useState('');
  const [cpf, setDepartament] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [foto, setFotos] = useState<File>();
  //const [funcionario, setFuncionario] = useState<Func>()

  const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImage = e.target.files[0];

      setFotos(selectedImage);
    }
  }, []);

  async function handleSubmit(event: FormEvent) {
    try{
    event.preventDefault();

    const data = new FormData();

    data.append('name', name);
    data.append('cidade', cidade);
    data.append('cpf', cpf);
    data.append('email', email);
    data.append('telefone', telefone);

    if (foto) {
    data.append('foto', foto);
    }

    const data1 = await api.post('pacientes', data).then((response) => 
      history.push(`/pacientes/`)
    )

    alert('Funcionario cadastrado com sucesso')
  } catch(error){
    alert("Você deve preencher todos os campos corretamente!!")
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

          <div id="page-home">
            <div className="content-wrapper">
  
              <main>
                <div>
                  <form onSubmit={handleSubmit}>
                      
                        <label htmlFor="name">Nome do Paciente</label>
                        <input
                          id="name"
                          value={name}
                          onChange={event => setName(event.target.value)} 
                          />

                        <label htmlFor="functions">cidade</label>
                        <input
                          id="cidade,"
                          value={cidade}
                          onChange={event => setFunctions(event.target.value)} 
                          />

                        <label htmlFor="departament">CPF</label>
                        <input
                          id="cpf,"
                          value={cpf}
                          onChange={event => setDepartament(event.target.value)} 
                          />

                        <label htmlFor="email">Email</label>
                        <input
                          id="email"
                          value={email}
                          onChange={event => setEmail(event.target.value)} 
                          />

                        <label htmlFor="telefone">Telefone</label>
                        <input
                          id="telefone"
                          value={telefone}
                          onChange={event => setTelefone(event.target.value)} 
                          />

                        <label htmlFor="fotos">
                        <FcAddImage size={80} id="foto"/>
                        <input
                          type="file"
                          id="fotos"
                          onChange={handleAvatarChange}
                        />

                      </label>
                      <label htmlFor="salvar">
                      <BsFillPersonCheckFill size={50} style={{color: "#00ff0d"}} id="salvo"/>
                      <input id='salvar' type="submit" />
                      </label>
                      
                  </form>
                </div>

                
                
              </main>
  
            </div>
          </div>
        </>   
      );
  }

export default Home;