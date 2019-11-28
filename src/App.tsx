import React from 'react';
import Menu from '@/components/Menu'
import './App.css'

const App: React.FC = (props) => {

  return (
    <div className="container">
      <div className="content">
      {
        props.children
      }
      </div>
      <Menu />
    </div>
  );
}

export default App
