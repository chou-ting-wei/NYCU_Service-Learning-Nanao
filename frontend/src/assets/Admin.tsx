import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Navbar, Nav, Modal, Form } from 'react-bootstrap';
import './Admin.css';


interface User {
    name: string;
    username: string;
    role: string;
}

interface Userdata {
    gender: string;
    birthday: string;
    age: number;
    medical_History: string;
    address: string;
    email: string;  
    phone: string;
}

const UserManagement: React.FC = ({role, url}) => {
    const [users, setUsers] = useState<User[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newName, setNewName] = useState('');

    const [showEditModal, setShowEditModal] = useState(false);
    const [editName, setEditName] = useState('');
    const [editUsername, setEditUsername] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [editUserrole, setEditUserrole] = useState('');

    const [showEditModal2, setShowEditModal2] = useState(false);
    const [editUsername2, setEditUsername2] = useState('');
    const [editName2, setEditName2] = useState('');
    const [editGender2, setEditGender2] = useState('');
    const [editUserbirth2, setEditUserbirth2] = useState('');
    const [editUserage2, setEditUserage2] = useState(0);
    const [editUserphone2, setEditUserphone2] = useState('');
    const [editUseremail2, setEditUseremail2] = useState('');
    const [editUseraddr2, setEditUseraddr2] = useState('');
    const [editUsermhis2, setEditUsermhis2] = useState('');

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(url + 'user');
            const users = response.data;
            setUsers(users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchUserdata = async (id: number): Promise<Userdata | null> => {
        try {
            const response = await axios.get(url + `user-detail/${id}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            setErrMsg('Error fetching users.');
            return null;
        }
    };
    

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(url + `user/${id}`);
            fetchUsers(); 
        } catch (error) {
            setErrMsg('Error deleting user.');
        }
    };

    const handleEditUser = (user: User) => {
        setEditName(user.name);
        setEditUsername(user.username);
        setEditUserrole(user.role);
        setShowEditModal(true);
    };

    const handleUpdate = async (username: string, role: string) => {
        if (username === null) return;
        const editUserId = await getUserID(username);
        try {
            const updatedUser = {
                name: editName,
                username: editUsername, 
                password: editPassword, 
                role: role
            };
            await axios.patch(url + `user/${editUserId}`, updatedUser, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            fetchUsers();
            setShowEditModal(false);
            setEditUsername('');
            setEditPassword('');

        } catch (error) {
            setErrMsg('Error updating user.');
        }
    };

    const handleEditUser2 = async (user: User) => {
        setEditUsername2(user.username);
        setEditName2(user.name);
        const editUserId = await getUserID(user.username);
        const userdata = await fetchUserdata(editUserId);

        if (userdata) {
            setEditGender2(userdata.gender);
            setEditUserbirth2(userdata.birthday);
            setEditUserage2(userdata.age);
            setEditUserphone2(userdata.phone);
            setEditUseremail2(userdata.email);
            setEditUseraddr2(userdata.address);
            setEditUsermhis2(userdata.medical_History);
        } else {
            setEditGender2('');
            setEditUserbirth2('');
            setEditUserage2(0);
            setEditUserphone2('');
            setEditUseremail2('');
            setEditUseraddr2('');
            setEditUsermhis2('');
        }

        setShowEditModal2(true);
    };

    const handleUpdate2 = async (username: string) => {
        if (username === null) return;
        const editUserId = await getUserID(username);
        try {
            const updatedUser = { 
                gender: editGender2,
                birthday: editUserbirth2,
                age: editUserage2,
                medical_History: editUsermhis2,
                address: editUseraddr2,
                email: editUseremail2,
                phone: editUserphone2
            };
            await axios.patch(url + `user-detail/${editUserId}`, updatedUser, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            fetchUsers();
            setShowEditModal2(false);
            setEditUsername2('');
            setEditName2('');
            setEditGender2('');
            setEditUserbirth2('');
            setEditUserage2(0);
            setEditUserphone2('');
            setEditUseremail2('');
            setEditUseraddr2('');
            setEditUsermhis2('');

        } catch (error) {
            setErrMsg('Error updating user.');
        }
    };

    const handleAddUser = async () => {
        try {
            const newUser = { 
                name: newName,
                username: newUsername, 
                password: newPassword , 
                role:"USER",
                userDetail: {
                    create: {
                      gender: null,
                      birthday: "",
                      age: 0,
                      medical_History: "",
                      address: "",
                      email: "",
                      phone: ""
                    }
                }
            };
            await axios.post(url + 'user', newUser, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            fetchUsers(); 
            setShowModal(false);
            setNewName('');
            setNewUsername('');
            setNewPassword('');
            
        } catch (error) {
            setErrMsg('Error adding user.');
        }
    };

    const getUserID = async (username: string) => {
        const response = axios.get(url + `user/find/${username}`);
        return (await response).data;
    };

    return (
        <div className="admin">   
            <Container>
                <h1>管理介面</h1>
                <Navbar expand="lg">
                    <Container>
                        {/* <Navbar.Brand>User Management</Navbar.Brand> */}
                        <Nav className="ms-auto">
                            <Button variant="success" onClick={() => setShowModal(true)}>新增帳號</Button>
                        </Nav>
                    </Container>
                </Navbar>

                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>姓名</th>
                            <th>帳號</th>
                            <th>角色</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.username}>
                                <td className="name-column">{user.name}</td>
                                <td className="username-column">{user.username}</td>
                                <td className="role-column">{user.role === "ADMIN" ? "管理員" : "使用者"}</td>
                                <td className="actions-column">
                                    <Button variant="secondary" onClick={() => handleEditUser(user)}>編輯帳密</Button>
                                    &nbsp;
                                    <Button variant="secondary" onClick={() => handleEditUser2(user)}>編輯資料</Button>
                                    &nbsp;
                                    {
                                        user.role !== 'ADMIN' && (
                                            <Button variant="danger" onClick={async () => handleDelete(await getUserID(user.username))}>刪除</Button>
                                        )
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</div>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>新增帳號</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formName">
                                <Form.Label>姓名</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formUsername" className="mt-3">
                                <Form.Label>帳號</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPw" className="mt-3">
                                <Form.Label>密碼</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                        <div className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleAddUser}>
                            送出
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>編輯帳密</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <Form>
                        <Form.Group controlId="formEditUsername" className="mt-3">
                            <Form.Label>姓名</Form.Label>
                            <Form.Control
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditUsername">
                            <Form.Label>帳號</Form.Label>
                            <Form.Control
                                type="text"
                                value={editUsername}
                                onChange={(e) => setEditUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditName" className="mt-3">
                            <Form.Label>密碼</Form.Label>
                            <Form.Control
                                type="password"
                                value={editPassword}
                                onChange={(e) => setEditPassword(e.target.value)}
                                required
                            /> 
                        </Form.Group>

                    </Form>
                    <div className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</div>
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <Button variant="primary" onClick={() => handleUpdate(editUsername, editUserrole)}>
                        送出
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal2} onHide={() => setShowEditModal2(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>編輯資料</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <Form>
                        <Form.Group controlId="formEditName2" >
                            <Form.Label>姓名</Form.Label>
                            <Form.Control
                                type="text"
                                value={editName2}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditUsername2" className="mt-3">
                            <Form.Label>帳號</Form.Label>
                            <Form.Control
                                type="text"
                                value={editUsername2}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditGender2" className="mt-3">
                            <Form.Label>性別</Form.Label>
                            <Form.Control
                                as="select"
                                value={editGender2 || ""}
                                onChange={(e) => setEditGender2(e.target.value)}
                            >
                                <option value="">選擇</option>
                                <option value="MALE">男</option>
                                <option value="FEMALE">女</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formEditBirth2" className="mt-3">
                            <Form.Label>生日</Form.Label>
                            <Form.Control
                                as="input"
                                type="date"
                                value={editUserbirth2}
                                onChange={(e) => setEditUserbirth2(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditUserage" className="mt-3">
                            <Form.Label>年齡</Form.Label>
                            <Form.Control
                                type="text"
                                value={editUserage2}
                                onChange={(e) => setEditUserage2(Number(e.target.value))}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditUserphone" className="mt-3">
                            <Form.Label>電話</Form.Label>
                            <Form.Control
                                type="text"
                                value={editUserphone2}
                                onChange={(e) => setEditUserphone2(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditUseremail" className="mt-3">
                            <Form.Label>電子郵件</Form.Label>
                            <Form.Control
                                type="email"
                                value={editUseremail2}
                                onChange={(e) => setEditUseremail2(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditUseraddr" className="mt-3">
                            <Form.Label>地址</Form.Label>
                            <Form.Control
                                type="text"
                                value={editUseraddr2}
                                onChange={(e) => setEditUseraddr2(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditUsermhis" className="mt-3">
                            <Form.Label>過去病史 (以、分隔)</Form.Label>
                            <Form.Control
                                type="text"
                                value={editUsermhis2}
                                onChange={(e) => setEditUsermhis2(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <div className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</div>
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <Button variant="primary" onClick={() => handleUpdate2(editUsername2)}>
                        送出
                    </Button>
                </Modal.Footer>
            </Modal>

            </Container>
        </div>
    );
};

export default UserManagement;
