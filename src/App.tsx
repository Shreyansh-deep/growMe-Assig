
import React from 'react';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Form from './components/Form';
import SecondPage from './components/SecondPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  Component={Form} />
        <Route path="/second-page" Component={SecondPage} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;