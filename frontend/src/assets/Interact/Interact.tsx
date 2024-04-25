import './Interact.css'
import Front from './front';
import React from 'react';

const Interact = () => { 
  const [json, setJson] = React.useState({});

  return (
    <Front json={json} setJson={setJson}/>
  );
}

export default Interact;