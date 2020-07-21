const router = require('express').Router();

router.get('/', (req, res) => res.send('Hello World!'));

router.post('/patients', (req, res) => { });

router.post('/employees', (req, res) => { });

router.post('/cases', (req, res) => { });

router.get('/cases/:id', (req, res) => res.send('test123'));

router.post('/cases/:id', (req, res) => { });

router.delete('/cases/:id', (req, res) => { });

router.delete('/patients/:id', (req, res) => { });

router.get('/api/cases', (req, res) => {
  const unassigned = req.params.unassigned;
  const assignedToId = req.params.assignedToId;
});

module.exports.router = router;
