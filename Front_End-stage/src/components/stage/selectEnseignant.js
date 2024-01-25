import React from 'react';

import { Autocomplete, TextField } from '@mui/material';
 
 const  SelectEneseignat = ( {onChangeDataEnseignant,enseignant})  => {
  return (
    <Autocomplete
    id="enseignant"
    onChange={onChangeDataEnseignant}
    options={enseignant}
    getOptionLabel={(option) =>  option.lastname+ " "+option.firstname }
    renderInput={(params) => <TextField   required {...params} label="Enseignat"   
    variant="outlined"   style={{ width: 360, marginTop: 12 }}
    />}
  />
  );
};
export default SelectEneseignat;