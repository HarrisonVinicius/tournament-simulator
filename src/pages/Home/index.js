import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "./styles.module.sass";
import NavBar from "../../components/molecules/NavBar";
import Modal from "../../components/molecules/Modal";
import ParticipantsTable from "../../components/molecules/ParticipantsTable";
import { Button, Container, Grid } from "@material-ui/core";

const Home = () => {
    const history = useHistory()
    const [openModal, setOpenModal] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [participants, setParticipants] = useState([])
    const [editModalData, setEditModalData] = useState({
        isEdit: false, 
        name: '', 
        phone: '', 
        email: '',
        index: ''
    })

    const goToTournamentBrackets = () => {
        history.push("/tournamentBrackets")
    }

    const handleModal = (index) => {
        if (participants[index]) {
            const editParticipant = participants[index]
            setEditModalData({...editParticipant, index, isEdit: true})
        } else {
            setEditModalData({
                isEdit: false, 
                name: '', 
                phone: '', 
                email: '',
                index: ''
            })
        }
        setOpenModal(!openModal)
    }

    const saveParticipantHandler = (payload) => {        
        const newList = participants
        // if(newList.length > 6){
        //     setDisableButton(true)
        //     return 
        // }
        const {index, isEdit, name, phone, email} = payload
        if (isEdit) {
            newList[index] = {name, phone, email}
        } else {
            newList.push({name, phone, email})
        }
        localStorage.setItem("participants", JSON.stringify(newList));
        setParticipants(newList) 
        setDisableButton(false)
    }

    const refreshParticipantsListHandler = () => {
        const participantsList = localStorage.getItem('participants');
        setParticipants(JSON.parse(participantsList))
    }

    useEffect(() => {
        const participantsList = localStorage.getItem('participants');
        if (participantsList && participantsList.length > 4) {
            setParticipants(JSON.parse(participantsList))
        }
    }, [])

    useEffect(() => {
        console.log(participants.length)
    }, [participants.length])

    return (
        <>
            <NavBar title="Meu Torneio"/>
            <Container maxWidth="lg">
                <Grid container className={classes.container}>
                    <Grid item xs={12} className={classes.addBtnRow}>
                        <h1 className={classes.titleDecoration}> Meu Torneio </h1>
                        <Button 
                            variant="contained" 
                            className={classes.addBtn} 
                            onClick={handleModal}
                            disabled={disableButton}
                        > 
                            Adicionar Participante
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <ParticipantsTable 
                            participants={participants} 
                            refreshParticipantsList={refreshParticipantsListHandler} 
                            editParticipant={handleModal}
                        />
                    </Grid>
                    <Grid className={classes.footer} item xs={12}>
                        <Button variant="contained" onClick={goToTournamentBrackets}> Ver chaves </Button>
                    </Grid>
                </Grid>
            </Container>
            <Modal 
                open={openModal} 
                handleClose={handleModal} 
                saveParticipant={saveParticipantHandler}
                isEdit={editModalData.isEdit}
                editData={editModalData}    
            />
        </>
    )
}

export default Home;