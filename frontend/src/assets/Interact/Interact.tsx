import './Interact.css'
import React from 'react';
import Front from './front';

const Interact = () => {
  const [json, setJson] = React.useState({ "json": "json" });
  console.log(json);
  return (
    <div className="interact">
      <Front json={json} setJson={setJson} />
    </div>
  );
}

export default Interact;