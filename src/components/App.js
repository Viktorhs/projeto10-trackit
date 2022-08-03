import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from '../CSS/GlobalStyle'
import Registration from './ Registration/ Registration';
import Login from './Login/Login';

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/cadastro' element={<Registration/>}/>
            </Routes>
        </BrowserRouter>
    )
}