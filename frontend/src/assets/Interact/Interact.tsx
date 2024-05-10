import './Interact.css'
import React from 'react';
import BodySelector from './BodySelector';
import DataFiller from './DataFiller';

const Interact = () => {
  const [PainLevel, setPainLevel] = React.useState({});
  const [currentPart, setCurrentPart] = React.useState('');
  return (
    <div className="interact">
      <BodySelector PainLevel={PainLevel} setCurrentPart={setCurrentPart} currentPart={currentPart} />
      <DataFiller currentPart={currentPart} setCurrentPart={setCurrentPart} PainLevel={PainLevel} setPainLevel={setPainLevel}/>
    </div>
  );
}

export default Interact;