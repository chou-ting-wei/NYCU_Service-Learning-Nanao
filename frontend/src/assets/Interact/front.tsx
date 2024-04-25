import './front.css'
import { ReactSVG } from 'react-svg';
import FrontSvg from './body/m_front_1.svg';


interface FrontProps {
	json: any;
	setJson: React.Dispatch<React.SetStateAction<any>>;
}

const Front = ({ json }: FrontProps) => {
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
		<div className='interact'>
			<ReactSVG
				src={FrontSvg}
				beforeInjection={svg => {
					svg.querySelectorAll('path').forEach(path => {
						path.setAttribute('fill', color[0]);
						path.setAttribute('style', 'cursor: pointer;');
						}
					);
				}}
				afterInjection={svg => {
					svg.querySelectorAll('path').forEach(path => {
						json[path.id] = 0;
						path.addEventListener('click', () => {
							if (json[path.id] === undefined) {
								json[path.id] = 1;
							} else {
								json[path.id] = color[json[path.id] + 1] === undefined ? 0 : json[path.id] + 1;
							}
							path.setAttribute('fill', color[json[path.id]]);
							console.log(json);
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