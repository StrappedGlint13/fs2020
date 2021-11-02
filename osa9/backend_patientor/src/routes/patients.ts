import express from 'express';
import patientService, { addEntry,  } from '../services/patientService'

import toNewPatientEntry, { toParseEntries } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
})

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
})

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    console.log(req.body)
    res.status(400).send(e.message);
  }
   
});

router.post('/:id/entries', (req, res) => {
   try {
    const patient = patientService.findById(req.params.id);
    const newEntry = toParseEntries(req.body)
    
    if (patient) {
      const entry = addEntry(patient, newEntry)
      console.log(patient)
      if (entry !== undefined) {
        res.json(entry);
      }
    }  
  } catch (e) {
    console.log(req.body)
    res.status(400).send(e.message);
  }
   
});

export default router;