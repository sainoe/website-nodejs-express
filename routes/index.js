const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feeback');

const router = express.Router();

module.exports = params => {
  const { speakerService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const topSpeakers = await speakerService.getList();
      return response.render('layout', { pageTitle: 'Welcome', template: 'index', topSpeakers });
    } catch (error) {
      return next(error);
    }
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
};
