import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainMenu from './Components/MainMenu';
import HomeEntry from './Components/HomeEntry';
import HomeEdit from './Components/HomeEdit';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/mainMenu" exact component={MainMenu} />
      <Route path="/homeEntry" exact component={HomeEntry} />
      <Route path="/homeEdit/:homeId" exact component={HomeEdit} />
    </Switch>
  </BrowserRouter>
);