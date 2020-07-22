const router = require('express').Router();
const { Patients, Cases } = require('../models');
const { createCase } = require('./apiFunctions');

router.post('/', async (req, res, next) => {
  createCase(req, res);
});

router.get('/:id', async (req, res, next) => {});

router.post('/:id', async (req, res, next) => {});

router.get('/', async (req, res, next) => {
  const unassigned = req.params.unassigned;
  const assignedToId = req.params.assignedToId;
});

module.exports.router = router;
