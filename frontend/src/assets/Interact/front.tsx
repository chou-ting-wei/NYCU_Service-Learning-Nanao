import './front.css'
import { ReactSVG } from 'react-svg';
import Popup from 'reactjs-popup';


const Front = (props: any) => {
        const color: any = {
                0: 'gray',
                1: 'pink',
                2: 'red',
                3: 'orange',
                4: 'yellow',
                5: 'green',
                6: 'blue',
                7: 'purple',
                8: 'brown',

        }
        return (
                <div>

                        <ReactSVG
                                src="/m_front_edit.svg"
                                beforeInjection={svg => {
                                        svg.querySelectorAll('path').forEach(path => {
                                                path.setAttribute('fill', color[0]);
                                                path.setAttribute('style', 'cursor: pointer;')

                                        });
                                }}
                                afterInjection={svg => {
                                        svg.querySelectorAll('path').forEach(path => {
                                                props.json[path.id] = 0;
                                                path.addEventListener('click', () => {
                                                        if (props.json[path.id] === undefined) {
                                                                props.json[path.id] = 1;
                                                        } else {
                                                                props.json[path.id] = color[props.json[path.id] + 1] === undefined ? 0 : props.json[path.id] + 1;
                                                        }
                                                        path.setAttribute('fill', color[props.json[path.id]]);
                                                        console.log(props.json);
                                                });
                                        }
                                        );
                                }}
                                renumerateIRIElements={false}
                        />
                </div>
        );
}

export default Front;