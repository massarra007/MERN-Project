import React, { useState } from 'react';
import Calendar from 'react-calendar';
import MySideNav from "../sidenavs/sidenavactuel";
import {  useParams } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, makeStyles } from '@material-ui/core';
import * as api from "../../service/etudiant";
const useStyles = makeStyles((theme) => ({
  modal: {
    '& .MuiDialog-paper': {
      width: '80%',
      maxWidth: '600px',
    },
  },
  formControl: {
    width: '100%',
  },
}));

function CalendarYear() {
 
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const idu = user?._id;
  const [showModal, setShowModal] = useState(false);
  const [classe, setNiveau] = useState('');
  const [EtudiantData, setEtudiantData] = useState({
 
    classe: "",
  
  });

  const classes = useStyles();

  const handleDateChange = (newDate) => {
    setDate(newDate);

    const currentMonth = newDate.getMonth();
    if (currentMonth === 8) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const handleNiveauChange = (event) => {
    setNiveau(event.target.value);
    setEtudiantData({ ...EtudiantData, classe: event.target.value });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNiveau('');
  };

  const handleSubmitModal = async (event) => {

      event.preventDefault();
  
      try {
        const updateEtudiant = await api.updateEtudiant(EtudiantData, idu);
        console.log(updateEtudiant, "upadate");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    };



  return (
    <div className="app">
      <MySideNav />
      <h1 className="header">Calendrier</h1>
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={date} />
      </div>
      <div className="text-center">Selected date: {date.toDateString()}</div>

      <Dialog
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.modal}
      >
        <DialogTitle id="alert-dialog-title">Bienvenu</DialogTitle>
        <DialogContent>
          <p>Quel est votre niveau cette annee.</p>
          <FormControl className={classes.formControl}>
            <InputLabel id="academic-progress-label">Niveau des etudes</InputLabel>
            <Select
              labelId="academic-progress-label"
              id="classe"
              value={EtudiantData.classe}
              onChange={handleNiveauChange}
            >
              <MenuItem value="1 ere ">1 ere</MenuItem>
              <MenuItem value="2 eme ">2 eme</MenuItem>
              <MenuItem value="3 eme ">3 eme</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleSubmitModal} color="primary">
           enregistrer
          </Button>
          <Button onClick={handleCloseModal} color="primary">
           annuler
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CalendarYear;
