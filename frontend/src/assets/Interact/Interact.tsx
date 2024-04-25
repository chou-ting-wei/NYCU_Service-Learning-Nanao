import './Interact.css'
// import FaceComponent from './FaceImages';
import Front from './front';

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
  

import React from 'react';

const Interact = () => { 
  const [json, setJson] = React.useState({});

  return (
      <div>
        <Front json={json} setJson={setJson}/>
        {/* <FaceComponent /> */}
      </div>
    );
  }
  
export default Interact;