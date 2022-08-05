import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import Button from "./Button";
import { ThreeDots } from 'react-loader-spinner'
import { postHabit } from "../../services/trackit";
import UserContext from "../../contexts/UserContext";

function DayButton({children, id, setSelectedID, selectedID, waiting}){
    
    const [selected, setSelected] = useState(false)
    useEffect(() =>{
        const test = selectedID.filter(a => a === id)
        if(test[0] === id){
            setSelected(true)
        }else{
            setSelected(false)
        }
    }, [])

    function selectedDay(day){
        if(selected){
            let removeID = selectedID.filter(a => a !== id)
            setSelectedID([...removeID])
            setSelected(false)
            
        }
        if(!selected){
            setSelectedID([
                ...selectedID,
                id
            ])
            setSelected(true)
        }
    }

    return(
        <Button type="button" 
        active={selected} 
        onClick={()=> selectedDay(id)}
        disabled={waiting}>{children}</Button>
    )
}

export default function CreateHabit({setCreate}){
    const {formHabits, setFormHabits, att, setAtt, selectedID, setSelectedID} = useContext(UserContext)
    const [waiting, setWaiting] = useState(false)
    const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'D']

    function attLista(){
        if(att === false){
            setAtt(true)
        }else{
            setAtt(false)
        }
    }

    function handleForm(e) {
        setFormHabits({
            ...formHabits,
            name: e.target.value,
        });
        console.log(formHabits)
        console.log(selectedID)
    }

    useEffect(()=> {
        const organize = selectedID.sort((a, b) => a - b)
        setFormHabits({
            ...formHabits,
            days: organize
          })
    }, [selectedID])


    function postCreateHabit(e) {
        e.preventDefault();
        const days = formHabits.days
        if(days.length < 1){
            alert('selecione um dia')
            
            return
        }
        setWaiting(true)
        const promise = postHabit(formHabits)
        promise.catch(() => {
            alert('Falha na criação do novo habito')
            setWaiting(false)
        }
        )
        promise.then((r) => {
            console.log(r.data)
            setFormHabits({
                ...formHabits,
                name:'',
                days:[]
            })
            setSelectedID([])
            attLista()
            setWaiting(false)
            setCreate(false)
        })

    }

    return(
        <>
            <Form active={waiting} onSubmit={postCreateHabit}>
                <input type='text' name='name' placeholder="nome do hábito" onChange={handleForm} value={formHabits.name} required disabled={waiting}/>
                <Grid>
                    {days.map((item, index) => <DayButton 
                    waiting={waiting} 
                    key={index} 
                    id={index}
                    selectedID={selectedID}
                    setSelectedID={setSelectedID}   >{item}</DayButton>)}
                </Grid>
                <GridButton>
                    <Cancel onClick={() => setCreate(false)}>Cancelar</Cancel>
                    <Save disabled={waiting} active={waiting}>
                        {waiting ? <ThreeDots color="#FFFFFF" height={11} width={43} /> : 'Salvar'}
                    </Save>
                </GridButton>
            </Form> 
        </>
    )
}

const Form = styled.form`
    width: 100%;
    padding: 18px;
    margin-bottom: 29px;
    background-color: #FFFFFF;
    border-radius: 5px;

    input{
        width: 100%;
        height: 45px;
        padding: 0 11px;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #666666;
        margin-bottom: 8px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        opacity: ${(props) => typeof props.active !== 'boolean' || props.active ? '0.5' : ""};
    }
    input::placeholder{
        font-size: 20px;
        line-height: 25px;
        color: #DBDBDB;
    }
`

const Grid = styled.div`
    display: flex;
    width: 100%;
`
const Cancel = styled.span`
    border: none;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #52B6FF;
    cursor: pointer;
`
const Save = styled.button`
    width: 84px;
    height: 35px;
    border: none;
    background: #52B6FF;
    border-radius: 5px;
    margin-left: 23px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #FFFFFF;
    opacity: ${(props) => typeof props.active !== 'boolean' || props.active ? '0.7' : ""};
    cursor: pointer;
`
const GridButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 36px;
`