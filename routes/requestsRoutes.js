const express = require('express');
const authController = require('../controllers/authController');
const requestsController = require('../controllers/requestsController');

const router = express.Router();
router.use(authController.protect);

router.get('/received', requestsController.getReceivedRequests);
router.get('/sent', requestsController.getSentRequests);
router.patch('/received/:id/:status', requestsController.updateRequestStatus);
router.patch('/:status/:id', requestsController.updateRequestStatus);

router
  .route('/:id')
  .post(requestsController.getReceiver, requestsController.sendRequest)
  .patch(requestsController.updateRequest)
  .get(requestsController.getRequest)
  .delete(requestsController.deleteRequest);

module.exports = router;
