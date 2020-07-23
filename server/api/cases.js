const router = require('express').Router();
const auth = require('../middleware/auth');
const { isBlank } = require('../helperFunctions');

const { Cases, Patients } = require('../models');

/** Route     POST api/cases
 * Desc      Create new case
 * Access    Private
 */
router.post('/', auth, async (req, res, next) => {
  try {
    const patientId = req.patient.id;
    const { issue } = req.body;
    const patient = await Patients.findById(patientId);
    const patientPopulated = await Patients.findById(req.patient.id).select('-password').populate('cases').exec();
    const activeCase = patientPopulated.cases.find(obj => obj.closed === false);

    if (isBlank(issue)) {
      res.status(400).send('Wrong input, issue should not be blank');
      return;
    }

    if (activeCase === undefined) {
      let newCase = new Cases({
        patientId,
        issue,
      });

      newCase = await newCase.save();
      patient.cases.push(newCase.id);
      patient.save();
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
    if (!currentCase.closed) {
      currentCase.closed = true;
      currentCase.save();
      res.send('Case is closed successfully');
    } else {
      res.status(409).send('Case has already been closed');
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {});

router.post('/:id', async (req, res, next) => {});

router.get('/', async (req, res, next) => {
  // const unassigned = req.params.unassigned;
  // const assignedToId = req.params.assignedToId;
});

module.exports = router;
