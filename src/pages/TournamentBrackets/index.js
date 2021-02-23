import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Grid } from "@material-ui/core";
import NavBar from "../../components/molecules/NavBar";
import classes from "./styles.module.sass";
import { Bracket } from 'react-brackets';

const TournamentBrackets = () => {
    const history = useHistory()
    const [rounds, setRounds] = useState([])
    const [userFeedBack, setUserFeedBack] = useState(false)

    const returnToHomeHandler = () => {
        history.push("/")
    }

    const createBracketsHandler = (payload) => {
        const participantsArrayList = payload
        if (participantsArrayList.length % 2 === 0 ) {
            const seedsNumber = participantsArrayList.length / 2 
            const tournament = []
            if(seedsNumber % 2 !== 0 && participantsArrayList.length !== 2) {
                setUserFeedBack(true)
                return []
            }
            for(let counter = 0; counter < seedsNumber; counter+=seedsNumber ) {
                const seeds = []
                for(let i = 0; i < participantsArrayList.length; i+=2) {
                    const seed = {
                        id: counter,
                        date: new Date().toDateString(),
                        teams: [{ name: participantsArrayList[i].name }, { name: participantsArrayList[i+1].name}],
                    }
                    seeds.push(seed)
                }
                tournament.push({
                    title: '',
                    seeds
                })
            }
            let length = tournament[0].seeds.length
            while (length !== 1) {
                const seeds = []
                for(let i = 0; i < length/2; i++){
                    seeds.push({teams:[{name: ''},{name: ''}]})
                }
                tournament.push({title: length, seeds}) 
                length = length/2
            }   
            setUserFeedBack(false)
            return tournament
        } else {
            setUserFeedBack(true)
            return []
        }
    }

    useEffect(() => {
        const participantsList = localStorage.getItem('participants');
        if (participantsList && participantsList.length > 4) {
            const participantsArray = JSON.parse(participantsList)
            setRounds(createBracketsHandler(participantsArray))
        }
    }, [])

    return (
        <>
            <NavBar title="Meu Torneio - Chaves " /> 
            <Container maxWidth="lg">
                <Grid container className={classes.container}>
                    <Grid item xs={12}>
                        { userFeedBack ? 
                            <div className={classes.userFeedback}>
                                <div>
                                    <h2> Por favor, adicione mais participantes para que seja possível fechar o chaveamento </h2>   
                                </div>
                                <div>
                                    <Button className={classes.backBtn} onClick={returnToHomeHandler}> Voltar </Button>
                                </div>
                            </div> :
                            <Bracket rounds={rounds} />
                        }
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default TournamentBrackets
