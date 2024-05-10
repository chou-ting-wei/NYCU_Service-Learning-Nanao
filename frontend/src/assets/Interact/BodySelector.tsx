import { useState } from 'react';
import './BodySelector.css';
import { ReactSVG } from 'react-svg';

const SideSelector = (props: any) => {
        return (
                <div id='SideSelector'>
                        <button onClick={props.control.bind(null, '/m_front.svg')} className='button-54'>Front</button>
                        <button onClick={props.control.bind(null, '/m_back.svg')} className='button-54'>Back</button>
                        <button onClick={props.control.bind(null, '/m_left.svg')} className='button-54'>Left</button>
                        <button onClick={props.control.bind(null, '/m_right.svg')} className='button-54'>Right</button>
                </div>
        )
}


const BodySelector = (props: any) => {
        const [SvgSrc, setSvgSrc] = useState('/m_front.svg');
        const color = ['white', 'green', 'yellow', 'orange', 'red', 'black'];
        return (
                <div className='BodySelector'>

                        <div id="bodyPart">
                                <ReactSVG
                                        id="bodySvg"
                                        src={SvgSrc}
                                        beforeInjection={svg => {
                                                svg.querySelectorAll('path').forEach(path => {
                                                        path.setAttribute('style', 'cursor: pointer;')
                                                        path.setAttribute('stroke', '#000000')
                                                        path.setAttribute('stroke-width', '1')
                                                        path.setAttribute('stroke-linecap', 'round')
                                                });
                                        }}
                                        afterInjection={svg => {
                                                svg.querySelectorAll('path').forEach(path => {
                                                        path.setAttribute("id", path.getAttribute('inkscape:label') ?? '');
                                                        if (props.PainLevel[path.id] === undefined) {
                                                                props.PainLevel[path.id] = 0;
                                                        }
                                                        path.setAttribute('fill', color[(~~(props.PainLevel[path.id]/2))]);
                                                        path.addEventListener('click', () => {
                                                                path.setAttribute('fill', color[~~(props.PainLevel[path.id]/2)]);
                                                                props.setCurrentPart(path.id);
                                                                console.log(props.currentPart);
                                                                console.log(props.PainLevel);
                                                        });
                                                }
                                                );
                                        }}
                                        renumerateIRIElements={false}
                                />
                                <SideSelector control={setSvgSrc} />
                        </div>
                </div>
        );
}

export default BodySelector;