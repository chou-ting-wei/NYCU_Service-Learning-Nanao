// import './front.css'
import { ReactSVG } from 'react-svg';
import FrontSvg from './body/m_front_1.svg';


interface FrontProps {
  json: any;
  setJson: React.Dispatch<React.SetStateAction<any>>;
}

const Front = ({json, setJson}: FrontProps) => {
	return (
		<div>
			<ReactSVG
				src={FrontSvg}
				beforeInjection={svg => {
					svg.querySelectorAll('path').forEach(path => {
						path.setAttribute('fill', 'purple');
						path.onclick = (event) => {
							// 檢查是否有點擊到
							console.log(event.target);
							console.log(path.id);
							console.log("\n");
							path.setAttribute('fill', 'red');
							setJson({ ...json, [path.id]: path.getAttribute('fill') });
						}
					});
				}}
			/>
		</div>
	);

}

export default Front;