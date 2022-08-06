import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from '../CSS/GlobalStyle'
import Registration from './Registration/ Registration';
import Login from './Login/Login';
import PrivatePage from './PrivatePage';
import Today from './Today/Today';
import UserContext from '../contexts/UserContext';
import { useState } from 'react';
import Habits from './Habits/Habits';
import Historic from './Historic/Historic';

export default function App() {

    const [user, setUser] = useState({})
    const [att, setAtt] = useState(false)
    const [userHabits, setUserHabits] = useState({})
    const [formHabits, setFormHabits] = useState({
        name: '',
        days: '',
    });
    const [selectedID, setSelectedID] = useState([])
    

    return (
        <UserContext.Provider value={{user, setUser, userHabits, setUserHabits, setFormHabits, formHabits, att, setAtt, selectedID, setSelectedID}}>
            <BrowserRouter>
                <GlobalStyle/>
                <Routes>
                    <Route path='/' element={<Login/>} />
                    <Route path='/cadastro' element={<Registration />} />
                    <Route path='/hoje' element={
                        <PrivatePage>
                            <Today />
                        </PrivatePage>
                    } />
                    <Route path='/habitos' element={
                        <PrivatePage>
                            <Habits/>
                        </PrivatePage>
                    } />
                    <Route path='/historico' element={
                        <PrivatePage>
                            <Historic/>
                        </PrivatePage>
                    } />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}