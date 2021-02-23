import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import classes from "./styles.module.sass";
import IconButton from '@material-ui/core/IconButton';
import { Delete, Edit } from "@material-ui/icons";

const ParticipantsTable = ({
    refreshParticipantsList,
    editParticipant,
    participants
}) => {
    const removeParticipantHandler = (index) => {
        const participantsList = localStorage.getItem('participants');
        let participantsListArray = JSON.parse(participantsList)
        participantsListArray.splice(index, 1);
        localStorage.setItem("participants", JSON.stringify(participantsListArray));
        refreshParticipantsList()
    }

    return (
        <div>
            <h2 className={classes.title}> Participantes </h2>
            <TableContainer component={Paper} data-test="component-participantsTable">
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Nome</TableCell>
                            <TableCell align="left">Celular</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {participants.map((row, index) => (
                            <TableRow key={index} data-test="component-tableRow">
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.phone}</TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">
                                    <div>
                                        <IconButton color="primary" component="span" data-test="component-editButton" onClick={(event) => editParticipant(index)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton className={classes.delete} color="primary" onClick={(event) => removeParticipantHandler(index)} >
                                            <Delete />
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

ParticipantsTable.propTypes = {
    participants: PropTypes.array
}
    
ParticipantsTable.defaultProps = {
    participants: []
}

export default ParticipantsTable