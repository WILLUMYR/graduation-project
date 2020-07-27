const router = require('express').Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const { Cases, Patients, Psychologists } = require('../models');

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
    const currentCase = await Cases.findById(req.params.id);

    if (currentCase.patientId.toString() !== req.patient.id) return res.status(401).send('Not authorized');

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
      const currentCase = await Cases.findById(req.params.id);
      const patientJwt = req.patient;
      const psychologistJwt = req.psychologist;

      const { text } = req.body;
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
        const psychologist = await Psychologists.findById(psychologistJwt.id);
        console.log('-----------', psychologist);
        newMessage = {
          text,
          respondent: 'psychologist',
          respondentId: psychologist.id,
          respondentName: psychologist.fullName,
        };
      } else {
        return res.status(401).send('Not authorized');
      }

      currentCase.messages.push(newMessage);
      await currentCase.save();
      res.status(201).send('Message is successfully created');
    } catch (error) {
      next(error);
    }
  },
);

/** Route     PUT api/cases/:id/assign
 * Desc      Update a case with a psychologist id when assigned
 * Access    Private
 */
router.put('/:id/assign', auth, async (req, res, next) => {
  try {
    if (!req.psychologist) return res.status(401).send('Not authorized');

    const currentCase = await Cases.findById(req.params.id);

    if (!currentCase.psychologistId) {
      currentCase.psychologistId = req.psychologist.id;
      await currentCase.save();
      res.send('Case is assigned successfully');
    } else {
      res.status(409).send('Case has already been assigned');
    }
  } catch (error) {
    next(error);
  }
});

/** Route     PUT api/cases/:id/note
 * Desc      Create new note
 * Access    Private
 */
router.put(
  '/:id/note',
  [check('text', 'text should not be blank').trim().not().isEmpty()],
  auth,
  async (req, res, next) => {
    try {
      const currentCase = await Cases.findById(req.params.id);
      if (currentCase.psychologistId.toString() !== req.psychologist.id) return res.status(401).send('Not authorized');

      const { text } = req.body;

      currentCase.notes.push({ text });
      await currentCase.save();
      res.status(201).send('Note is successfully created');
    } catch (error) {
      next(error);
    }
  },
);

/**Route     GET api/cases
 * Desc      Get all cases.
 * Access    Private
 */
router.get('/', auth, async (req, res, next) => {
  try {
    if (!req.psychologist) return res.status(401).send('Not authorized');

    const cases = await Cases.find({});
    res.json(cases);
  } catch (err) {
    next(err);
  }
});

/**Route     GET api/cases/unassigned
 * Desc      Get all unassigned cases.
 * Access    Private
 */
router.get('/unassigned', auth, async (req, res, next) => {
  try {
    if (!req.psychologist) return res.status(401).send('Not authorized');

    const cases = await Cases.find({ psychologistId: undefined });
    res.json(cases);
  } catch (err) {
    next(err);
  }
});

/**Route     GET api/cases/assigned
 * Desc      Get all assigned cases.
 * Access    Private
 */
router.get('/assigned', auth, async (req, res, next) => {
  try {
    if (!req.psychologist) return res.status(401).send('Not authorized');

    const cases = await Cases.find({ psychologistId: req.psychologist.id });
    res.json(cases);
  } catch (err) {
    next(err);
  }
});

/**Route     GET api/cases/assigned/:id
 * Desc      Get specific assigned case.
 * Access    Private
 */
router.get('/assigned/:id', auth, async (req, res, next) => {
  try {
    const currentCase = await Cases.findById(req.params.id);
    if (currentCase.psychologistId.toString() !== req.psychologist.id) return res.status(401).send('Not authorized');
    res.json(currentCase);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
