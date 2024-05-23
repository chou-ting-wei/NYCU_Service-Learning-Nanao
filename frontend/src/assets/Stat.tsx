import './Stat.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Container, Table, Button, Navbar, Form, FormControl, Dropdown, DropdownButton } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js'; 
import 'chart.js/auto';
import moment from 'moment';
import { Userhurt, Usertime } from './ts/types';
import { bodyParts } from './ts/constants';

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
    const [userweek, setUserweek] = useState<Usertime[]>([]);
    const [useryear, setUseryear] = useState<Usertime[]>([]);

    const [selectedBodyPart, setSelectedBodyPart] = useState("default");
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDatefrom, setSearchDatefrom] = useState('');
    const [searchDateto, setSearchDateto] = useState('');

    const [chartType, setChartType] = useState('bar');
    const [filteredBodyParts, setFilteredBodyParts] = useState(bodyParts);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: '疼痛指數平均',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    });

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
                    await fetchUserhurt(fetchedId);
                    await fetchUserweek(fetchedId);
                    await fetchUseryear(fetchedId);
                }
            } else if (userId) {
                await fetchUserhurt(userId);
                await fetchUserweek(userId);
                await fetchUseryear(userId);
            }
        };
        fetchUserId();
    }, [userId, user]);

    useEffect(() => {
        const filteredParts = bodyParts.filter(part => part.label.includes(searchTerm));
        setFilteredBodyParts(filteredParts);
    }, [searchTerm]);
    

    useEffect(() => {
        if (selectedBodyPart && selectedBodyPart !== 'default') {
            setChartType('line');
        }
        else {  
            setChartType('bar');
        }
        
        const painData = calculatePainAverage(userhurt, selectedBodyPart);
        const individualPainData = calculatePainData(userhurt);
    
        const barChartData = {
            labels: painData.map(item => item.name),
            datasets: [
                {
                    label: '疼痛指數平均',
                    data: painData.map(item => item.pain),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }
            ]
        };
    
        const lineChartData = {
            labels: individualPainData.map(item => moment(item.name).format('YYYY-MM-DD HH:mm')),
            datasets: [
                {
                    label: '疼痛指數',
                    data: individualPainData.map(item => item.pain),
                    fill: false,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(75, 192, 192, 0.6)',
                    pointBorderColor: 'rgba(75, 192, 192, 1)',
                    yAxisID: 'y1',
                    order: 1
                },
                {
                    label: '一週內是否疼痛',
                    type: 'bar',
                    data: userweek.map(item => item[selectedBodyPart] ? 1 : 0),
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    yAxisID: 'y2',
                    maxBarThickness: 20,
                    barPercentage: 0.5,
                    order: 2
                },
                {
                    label: '一年內是否疼痛',
                    type: 'bar',
                    data: useryear.map(item => item[selectedBodyPart] ? 1 : 0),
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    yAxisID: 'y2',
                    maxBarThickness: 20,
                    barPercentage: 0.5,
                    order: 3
                }
            ]
        };
        
    
        setChartData(chartType === 'bar' ? barChartData : lineChartData);
    }, [userhurt, searchTerm, selectedBodyPart, chartType, userweek, useryear]);      

    const calculatePainData = (data) => {
        return data.map(item => ({
            name: item.fill_time,
            pain: item[selectedBodyPart]
        })).sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
    };
    
    const calculatePainAverage = (data, selectedPart) => {
        if (selectedPart && selectedPart !== 'default') {
            const totalPain = data.reduce((acc, curr) => acc + curr[selectedPart], 0);
            const averagePain = totalPain / data.length;
            return [{
                name: bodyParts.find(bp => bp.value === selectedPart).label,
                pain: averagePain
            }];
        } else {
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
        }
    };
 
    const fetchUserhurt = async (id: string) => {
        try {
            const params: any = {};
            if (searchDatefrom) {
                params.start = moment(searchDatefrom).toISOString();
            }
            if (searchDateto) {
                params.end = moment(searchDateto).toISOString();
            }
            
            const response = await axios.get(`${url}hurtform/${id}`, {
                params,
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            const data = response.data;
    
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

    const fetchUserweek = async (id: string) => {
        try {
            const params: any = {};
            if (searchDatefrom) {
                params.start = moment(searchDatefrom).toISOString();
            }
            if (searchDateto) {
                params.end = moment(searchDateto).toISOString();
            }
    
            const response = await axios.get(`${url}weekform/${id}`, {
                params,
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            const data = response.data;
    
            if (Array.isArray(data)) {
                setUserweek(data);
            } else if (Array.isArray(data.data)) {
                setUserweek(data.data);
            } else {
                setUserweek([]);
            }
        } catch (error) {
            console.error("Error fetching user week data:", error);
            setUserweek([]);
        }
    }
    
    const fetchUseryear = async (id: string) => {
        try {
            const params: any = {};
            if (searchDatefrom) {
                params.start = moment(searchDatefrom).toISOString();
            }
            if (searchDateto) {
                params.end = moment(searchDateto).toISOString();
            }
    
            const response = await axios.get(`${url}yearform/${id}`, {
                params,
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            const data = response.data;
    
            if (Array.isArray(data)) {
                setUseryear(data);
            } else if (Array.isArray(data.data)) {
                setUseryear(data.data);
            } else {
                setUseryear([]);
            }
        } catch (error) {
            console.error("Error fetching user year data:", error);
            setUseryear([]);
        }
    }
    

    const handleDelete = async () => {
        // TODO
        console.log("Delete userhurt");
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchUserhurt(userId);
        fetchUserweek(userId);
        fetchUseryear(userId);
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
                    {chartData && (
                        chartType === 'bar' ? (
                            <Bar data={chartData} />
                        ) : (
                            <Line 
                                data={chartData} 
                                options={{
                                    scales: {
                                        y1: {
                                            type: 'linear',
                                            position: 'left',
                                            beginAtZero: true,
                                            max: 10
                                        },
                                        y2: {
                                            type: 'linear',
                                            position: 'right',
                                            beginAtZero: true,
                                            max: 2,
                                            grid: {
                                                drawOnChartArea: false // 防止网格线绘制在图表区域上
                                            }
                                        }
                                    }
                                }} 
                            />

                        )
                    )}
                </div>

                {/* <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th className="stat-time-column">填表時間</th>
                            <th className="stat-actions-column">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userhurt.map(uh => (
                            <tr key={uh.id}>
                                <td className="stat-time-column">{uh.fill_time}</td>
                                <td className="stat-actions-column">
                                    {user === 'admin' && (
                                        <Button variant="outline-danger" onClick={() => handleDelete(uh.id)}>刪除</Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table> */}
            </Container>
        </div>
    );
};

export default Stat;
