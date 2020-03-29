const express = require('express');
const {celebrate, Joi, Segments} = require('celebrate');

const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();


routes.post('/sessions', sessionController.create);
routes.get('/ongs', ongController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]:Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), ongController.create);

routes.get('/incidents', celebrate({
    [Segments.QUERY]:Joi.object().keys({
        page: Joi.number(),
    })
}), incidentController.index);
routes.post('/incidents',celebrate({
    [Segments.BODY]:Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), incidentController.create);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]:Joi.object().keys({
        id: Joi.number().required(),
    })
}), incidentController.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), profileController.index);




module.exports = routes;