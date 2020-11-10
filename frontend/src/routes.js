import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Consulta from './pages/Consulta';
import ConsultaPet from './pages/ConsultaPet';
import ConsultaPetAll from './pages/ConsultaPetAll';
import NewConsulta from './pages/NewConsulta';
import NewPet from './pages/NewPet';
import NewFuncionario from './pages/NewFuncionario';
import Adm from './pages/Adm';
import AdmDashboard from './pages/ConsultaFunc';
import ConsultaClientes from './pages/ConsultaClientes';
import ConsultaAll from './pages/ConsultaAll';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />
        <Route path="/consulta" exact component={Consulta} />
        <Route path="/consulta/pet" exact component={ConsultaPet}/>
        <Route path="/dashboard/pet" exact component={ConsultaPetAll}/>
        <Route path="/consulta/new" exact component={NewConsulta} />
        <Route path="/pet/new" exact component={NewPet}/>
        <Route path="/admin" exact component={Adm}/>
        <Route path="/dashboard" exact component={AdmDashboard}/>
        <Route path="/dashboard/clientes" exact component={ConsultaClientes}/>
        <Route path="/dashboard/consulta" exact component={ConsultaAll}/>
        <Route path="/funcionario/new" exact component={NewFuncionario}/>
      </Switch>
    </BrowserRouter>
  )
}