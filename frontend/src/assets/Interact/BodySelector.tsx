import { useEffect, useState } from 'react';
import './BodySelector.css';
import { ReactSVG } from 'react-svg';
import { Radio } from 'antd';




const SideSelector = (props: any) => {
        const handleChange = (e: any) => {
                props.control(e.target.value);
        }
        return (
                <div id='SideSelector'>
                        <Radio.Group defaultValue="/m_front.svg" onChange={handleChange}>
                                <Radio.Button value="/m_front.svg">Front</Radio.Button>
                                <Radio.Button value="/m_back.svg">Back</Radio.Button>
                                <Radio.Button value="/m_left.svg">Left</Radio.Button>
                                <Radio.Button value="/m_right.svg">Right</Radio.Button>
                        </Radio.Group>
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
                                                        if (props.PainLevel[path.id] === undefined && props.MonthPain[path.id] === undefined && props.WeekPain[path.id] === undefined) {
                                                                props.PainLevel[path.id] = 0;
                                                                props.MonthPain[path.id] = 0;
                                                                props.WeekPain[path.id] = 0;
                                                        }
                                                        path.setAttribute('fill', color[(~~(props.PainLevel[path.id] / 2))]);
                                                        path.addEventListener('click', () => {
                                                                path.setAttribute('fill', color[~~(props.PainLevel[path.id] / 2)]);
                                                                props.setCurrentPart(path.id);
                                                        });
                                                }
                                                );
                                        }
                                        }
                                        renumerateIRIElements={false}
                                />
                                <SideSelector control={setSvgSrc}/>
                        </div>
                </div>
        );
}

export default BodySelector;