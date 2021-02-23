import React, { useEffect, useState } from "react";
import classes from "./styles.module.sass";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from "@material-ui/core/IconButton";
import NumberFormat from 'react-number-format';
import { Close } from "@material-ui/icons";

const Modal = ({
    open, 
    handleClose,
    saveParticipant,
    isEdit,
    editData
}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [errorName, setErrorName] = useState(false);
    const [errorPhone, setErrorPhone] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);

    const handleName = (e) => {
        setName(e.target.value)
    };
    
    const handlePhone = (e) => {
        setPhone(e.target.value)
    } 

    const handleEmail = (e) => {
        setEmail(e.target.value)
    } 

    const saveParticipantHandler = () => {
        const emailValidation = /^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/g
        const participant = {
            name,
            phone,
            email,
            isEdit,
            index: editData.index
        }

        setErrorName(false)
        setErrorPhone(false)
        setErrorEmail(false)

        if (name === "" && name.length === 0) {
            setErrorName(true)
            return
        } else if (phone.trim().length !== 15) {
            setErrorPhone(true)
            return
        } else if (email === "" || !emailValidation.test(email)) {
            setErrorEmail(true)
            return
        } 
        saveParticipant(participant)
        handleClose()
    }

    useEffect(() => {
        if(isEdit) {
            setName(editData.name)
            setPhone(editData.phone)
            setEmail(editData.email)
        } else {
            setName("")
            setPhone("")
            setEmail("")
        }
        setErrorName(false)
        setErrorPhone(false)
        setErrorEmail(false)
    }, [open, editData, isEdit])

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <div className={classes.modalHeader}>
                <DialogTitle id="form-dialog-title">Adicionar Participante</DialogTitle>
                <IconButton onClick={handleClose}>
                    <Close/>
                </IconButton>
            </div>
            <DialogContent>
                <TextField
                    value={name}
                    variant="outlined"
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nome"
                    type="text"
                    fullWidth
                    error={errorName}
                    onChange={handleName}
                    data-test="component-inputName"
                />
                <NumberFormat
                    value={phone}
                    customInput={TextField}
                    format="(##) #####-####"
                    variant="outlined"
                    margin="dense"
                    id="phone"
                    label="Celular"
                    type="text"
                    fullWidth
                    error={errorPhone}
                    onChange={handlePhone}
                    data-test="component-inputPhone"
                />
                <TextField
                    value={email}
                    variant="outlined"
                    margin="dense"
                    id="name"
                    label="Email"
                    type="email"
                    fullWidth
                    error={errorEmail}
                    onChange={handleEmail}
                    data-test="component-inputEmail"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Fechar
                </Button>
                <Button onClick={saveParticipantHandler} color="primary">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Modal;