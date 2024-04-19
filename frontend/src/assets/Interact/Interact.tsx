import './Interact.css'
import front from './m_front_1.svg'
import { Button } from "@/components/ui/button"

const Interact = () => { 
    return (
      <div className="interact">
        <p>Interact Page Test</p>
        <Button>Test Button</Button>
        <img src={front} alt='front' />
      </div>
    );
  }
  
  export default Interact;