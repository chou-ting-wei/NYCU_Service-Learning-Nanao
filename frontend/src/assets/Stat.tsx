import './Stat.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Container, Table, Button, Navbar, Form, FormControl, Dropdown, DropdownButton } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';

interface Userhurt {
    id: string,
    user_id: string,
    fill_time: string,
    neck: number,
    right_upper_arm: number,
    right_shoulder: number,
    right_lower_arm: number,
    right_hand: number,
    left_upper_arm: number,
    left_shoulder: number,
    left_lower_arm: number,
    left_lower_leg: number,
    left_hand: number,
    left_upper_leg: number,
    left_ankle: number,
    left_feet: number,
    left_knee: number,
    right_lower_leg: number,
    right_ankle: number,
    right_upper_leg: number,
    right_feet: number,
    right_knee: number,
    abdomen: number,
    lower_body: number,
    upper_body: number,
    right_ear: number,
    left_ear: number,
    head: number,
    right_eye: number,
    mouth: number,
    left_eye: number,
    nose: number,
    back_head: number,
    back_neck: number,
    left_elbow: number,
    right_elbow: number,
    lower_back: number,
    back: number,
    butt: number,
    right_upper_shoulder: number
}

const bodyParts = [
    { label: "選擇部位", value: "default" },
    { label: "頸部", value: "neck" },
    { label: "右上臂", value: "right_upper_arm" },
    { label: "右肩", value: "right_shoulder" },
    { label: "右下臂", value: "right_lower_arm" },
    { label: "右手", value: "right_hand" },
    { label: "左上臂", value: "left_upper_arm" },
    { label: "左肩", value: "left_shoulder" },
    { label: "左下臂", value: "left_lower_arm" },
    { label: "左小腿", value: "left_lower_leg" },
    { label: "左手", value: "left_hand" },
    { label: "左大腿", value: "left_upper_leg" },
    { label: "左腳踝", value: "left_ankle" },
    { label: "左腳", value: "left_feet" },
    { label: "左膝蓋", value: "left_knee" },
    { label: "右小腿", value: "right_lower_leg" },
    { label: "右腳踝", value: "right_ankle" },
    { label: "右大腿", value: "right_upper_leg" },
    { label: "右腳", value: "right_feet" },
    { label: "右膝蓋", value: "right_knee" },
    { label: "腹部", value: "abdomen" },
    { label: "下半身", value: "lower_body" },
    { label: "上半身", value: "upper_body" },
    { label: "右耳", value: "right_ear" },
    { label: "左耳", value: "left_ear" },
    { label: "頭部", value: "head" },
    { label: "右眼", value: "right_eye" },
    { label: "嘴巴", value: "mouth" },
    { label: "左眼", value: "left_eye" },
    { label: "鼻子", value: "nose" },
    { label: "後腦", value: "back_head" },
    { label: "後頸", value: "back_neck" },
    { label: "左肘", value: "left_elbow" },
    { label: "右肘", value: "right_elbow" },
    { label: "下背部", value: "lower_back" },
    { label: "背部", value: "back" },
    { label: "臀部", value: "butt" },
    { label: "右上肩", value: "right_upper_shoulder" }
];

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const Stat = ({ url }) => {
    const [cookies] = useCookies(["user"]);
    const user = cookies.user;

    const query = useQuery();
    const id = query.get('id');
    const [userId, setUserId] = useState<string | null>(id || null);
    const [userhurt, setUserhurt] = useState<Userhurt[]>([]);

    const [selectedBodyPart, setSelectedBodyPart] = useState("default");
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDatefrom, setSearchDatefrom] = useState('');
    const [searchDateto, setSearchDateto] = useState('');

    const getUserID = async (username: string) => {
        const response = await axios.get(url + `user/find/${username}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        return response.data;
    };

    useEffect(() => {
        const fetchUserId = async () => {
            if (!userId && user) {
                const fetchedId = await getUserID(user);
                if (fetchedId) {
                    setUserId(fetchedId);
                    fetchUserhurt(fetchedId);
                }
            } else if (userId) {
                fetchUserhurt(userId);
            }
        };
        fetchUserId();
    }, [userId, user]);

    const fetchUserhurt = async (id: string) => {
        try {
            const params: any = {};
            if (searchDatefrom) {
                params.start = searchDatefrom;
            }
            if (searchDateto) {
                params.end = searchDateto;
            }
    
            const response = await axios.get(`${url}hurtform/${id}`, {
                params,
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            const data = response.data;
    
            // console.log(data);
    
            if (Array.isArray(data)) {
                setUserhurt(data);
            } else if (Array.isArray(data.data)) {
                setUserhurt(data.data);
            } else {
                setUserhurt([]);
            }
        } catch (error) {
            console.error("Error fetching user hurt data:", error);
            setUserhurt([]);
        }
    }
    

    const handleDelete = async () => {
        console.log("Delete userhurt");
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchUserhurt(userId);
    };

    const calculatePainAverage = (data) => {
        const partKeys = bodyParts.filter(part => part.value !== 'default').map(part => part.value);
        const averages = partKeys.map(part => {
            const totalPain = data.reduce((acc, curr) => acc + curr[part], 0);
            const averagePain = totalPain / data.length;
            return {
                name: bodyParts.find(bp => bp.value === part).label,
                pain: averagePain
            };
        });
        return averages;
    };

    const filteredBodyParts = bodyParts.filter(part => part.label.includes(searchTerm));
    const painData = calculatePainAverage(userhurt);
    const chartData = {
        labels: painData.map(item => item.name),
        datasets: [
            {
                label: '疼痛指數',
                data: painData.map(item => item.pain),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    return (
        <div className="stat">
            <Container>
                <h1>疼痛統計</h1>
                <Navbar expand="lg" className="justify-content-between mt-4">
                    <Form inline="true" onSubmit={handleSearch} className="d-flex w-100 align-items-center" style={{ whiteSpace: 'nowrap' }}>
                        <FormControl
                            type="text"
                            placeholder="搜尋部位"
                            className="me-3"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <DropdownButton 
                            className="me-5" 
                            variant="outline-secondary" 
                            title={bodyParts.find(part => part.value === selectedBodyPart)?.label || "選擇部位"} 
                            id="dropdown-menu"
                        >
                            {filteredBodyParts.map(part => (
                                <Dropdown.Item 
                                    key={part.value} 
                                    onClick={() => setSelectedBodyPart(part.value)}
                                >
                                    {part.label}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>

                        <div className="text-center me-3" style={{ width: '120px' }}>搜尋時間</div>
                        <FormControl
                            type="date"
                            className="me-3"
                            value={searchDatefrom}
                            onChange={e => setSearchDatefrom(e.target.value)}
                        />
                        <div className="text-center me-3" style={{ width: '30px' }}>至</div>
                        <FormControl
                            type="date"
                            className="me-3"
                            value={searchDateto}
                            onChange={e => setSearchDateto(e.target.value)}
                        />
                        <Button variant="outline-success" type="submit">送出</Button>
                    </Form>
                </Navbar>

                <div className="chart-container mt-4">
                    <Bar data={chartData} />
                </div>


                <Table striped bordered hover className="mt-2">
                    <thead>
                        <tr>
                            <th className="stat-week-column">一週內是否疼痛</th>
                            <th className="stat-year-column">一年內是否疼痛</th>
                            <th className="stat-time-column">填表時間</th>
                            <th className="stat-actions-column">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userhurt.map(uh => (
                            <tr key={uh.id}>
                                <td className="stat-week-column">{/* Implement logic to display weekly pain */}</td>
                                <td className="stat-year-column">{/* Implement logic to display yearly pain */}</td>
                                <td className="stat-time-column">{uh.fill_time}</td>
                                <td className="stat-actions-column">
                                    {user === 'admin' && (
                                        <Button variant="outline-danger" onClick={() => handleDelete(uh.id)}>刪除</Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default Stat;