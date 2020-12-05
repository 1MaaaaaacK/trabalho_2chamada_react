import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Detalhe from './pages/Detalhe'
import DetalheFound from './pages/DetalhesFound'
import Criado from './pages/Criado'


function Routes() {
    return (
     <BrowserRouter>
     <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/detalhe" component={Detalhe} />
        <Route path='/excluir' component={DetalheFound} />
        <Route path='/pacientes/find/:name' component={DetalheFound} />
        <Route path='/pacientes/' component={Criado} />

    </Switch>
     </BrowserRouter>
    );
}

export default Routes;