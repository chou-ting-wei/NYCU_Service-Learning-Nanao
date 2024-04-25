import './Interact.css'
import Front from './front';
import React from 'react';

const Interact = () => { 
  const [json, setJson] = React.useState({});

  return (
      <div>
        <Front json={json} setJson={setJson}/>
      </div>
    );
  }
  
export default Interact;