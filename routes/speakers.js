const express = require('express');

const router = express.Router();

module.exports = params => {
  const { speakerService } = params;

  router.get('/', async (request, response) => {
    const speakers = await speakerService.getList();
    const artwork = await speakerService.getAllArtwork();

    response.render('layout', { pageTitle: 'speakers', template: 'speakers', speakers, artwork });
  });

  router.get('/:shortname', async (request, response, next) => {
    try {
      const speaker = await speakerService.getSpeaker(request.params.shortname);
      const artwork = await speakerService.getArtworkForSpeaker(speaker.shortname);
      return response.render('layout', {
        pageTitle: `${speaker.name}`,
        template: 'speakers-detail',
        speaker,
        artwork,
      });
    } catch (error) {
      return next(error);
    }

    // return response.send(`Detail page of ${request.params.shortname}`);
  });

  return router;
};
