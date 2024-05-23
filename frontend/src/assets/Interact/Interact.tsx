import './Interact.css'
import React from 'react';
import BodySelector from './BodySelector';
import DataFiller from './DataFiller';

const Interact = () => {
  const [PainLevel, setPainLevel] = React.useState({});
  const [currentPart, setCurrentPart] = React.useState('');
  const [MonthPain, setMonthPain] = React.useState({});
  const [WeekPain, setWeekPain] = React.useState({});
  return (
    <div className="interact">
      <BodySelector PainLevel={PainLevel} setCurrentPart={setCurrentPart} currentPart={currentPart} MonthPain={MonthPain} WeekPain={WeekPain} />
      <DataFiller currentPart={currentPart} setCurrentPart={setCurrentPart} PainLevel={PainLevel} setPainLevel={setPainLevel} MonthPain={MonthPain} WeekPain={WeekPain} />
    </div>
  );
}

export default Interact;