const router = require('express').Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const { Cases, Patients } = require('../models');

/** Route     POST api/cases
 * Desc      Create new case
 * Access    Private
 */
router.post('/', [check('issue', 'issue should not be blank').trim().not().isEmpty()], auth, async (req, res, next) => {
  try {
    const patientId = req.patient.id;
    const { issue } = req.body;
    const patientPopulated = await Patients.findById(req.patient.id).populate('cases').exec();
    const activeCase = patientPopulated.cases.find(obj => obj.closed === false);
    const patient = patientPopulated.depopulate('cases');

    if (activeCase === undefined) {
      let newCase = new Cases({
        patientId,
        issue,
      });

      newCase = await newCase.save();
      patient.cases.push(newCase.id);
      await patient.save();
      res.status(201).send('Case successfully created');
    } else {
      res.status(409).send('Active case already exists');
    }
  } catch (error) {
    next(error);
  }
});

/** Route     PUT api/cases/:id/close
 * Desc      Update status to close the case
 * Access    Private
 */
router.put('/:id/close', auth, async (req, res, next) => {
  try {
    const caseId = req.params.id;
    const currentCase = await Cases.findById(caseId);

    if (currentCase.patientId.toString() !== req.patient.id) {
      res.status(401).send('Not authorized');
      return;
    }

    if (!currentCase.closed) {
      currentCase.closed = true;
      await currentCase.save();
      res.send('Case is closed successfully');
    } else {
      res.status(409).send('Case has already been closed');
    }
  } catch (error) {
    next(error);
  }
});

/** Route     PUT api/cases/:id/message
 * Desc      Create new message
 * Access    Private
 */
router.put(
  '/:id/message',
  [check('text', 'text should not be blank').trim().not().isEmpty()],
  auth,
  async (req, res, next) => {
    try {
      const caseId = req.params.id;
      const currentCase = await Cases.findById(caseId);
      const patientJwt = req.patient;
      const psychologistJwt = req.psychologist;

      const text = req.body.text;
      let newMessage;

      if (patientJwt !== undefined) {
        const patient = await Patients.findById(patientJwt.id);

        newMessage = {
          text,
          respondent: 'patient',
          respondentId: patient.id,
          respondentName: patient.username,
        };
      } else if (psychologistJwt !== undefined) {
        const psychologist = await Patients.findById(psychologistJwt.id);
        newMessage = {
          text,
          respondent: 'psychologist',
          respondentId: psychologist.id,
          respondentName: psychologist.fullName,
        };
      } else {
        res.status(401).send('Not authorized');
        return;
      }

      currentCase.messages.push(newMessage);
      await currentCase.save();
      res.status(201).send('Message is successfully created');
    } catch (error) {
      next(error);
    }
  },
);

router.get('/:id', async (req, res, next) => {});

router.post('/:id', async (req, res, next) => {});

router.get('/', async (req, res, next) => {
  // const unassigned = req.params.unassigned;
  // const assignedToId = req.params.assignedToId;
});

module.exports = router;
