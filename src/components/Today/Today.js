import { useContext, useEffect, useState } from "react"
import UserContext from "../../contexts/UserContext"
import { getTodayHabits } from "../../services/trackit"

export default function Today(){
    const{setUserHabits, userHabits, att, setAtt} = useContext(UserContext)
    const [todayHabits, setTodayHabits] = useState([])
    useEffect(() =>{
        const promisse = getTodayHabits()
        promisse.catch(() => {
            alert('Erro de cominucação com o servidor')
        })
        promisse.then((r) => {
            setTodayHabits(r.data)
            setUserHabits(r.data)
        })
    }, [att])

    console.log(userHabits)
    return(<></>)
}