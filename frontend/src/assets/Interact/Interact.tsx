import './Interact.css'

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"

// import {useRef} from 'react';
import FrontSvg from './body/m_front_1.svg';

import FaceComponent from './FaceImages';

const Interact = () => { 


    return (
      <div className="interact">
        <p>Interact Page Test</p>
        <img src={FrontSvg} alt="Front" className="front-svg"/>
        <FaceComponent />
      </div>
    );
  }
  
  export default Interact;