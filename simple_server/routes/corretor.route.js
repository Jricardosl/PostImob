const express = require('express');
const app = express();
const corretorRoutes = express.Router();

let Corretor = require('../model/Corretor');

// api to add corretor
corretorRoutes.route('/add').post(function (req, res) {
  let corretor = new Corretor(req.body);
  corretor.save()
  .then(corretor => {
    res.status(200).json({'status': 'success','mssg': 'corretor added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get corretores
corretorRoutes.route('/').get(function (req, res) {
  Corretor.find(function (err, corretores){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','corretores': corretores});
    }
  });
});

// api to get corretor
corretorRoutes.route('/corretor/:id').get(function (req, res) {
  let id = req.params.id;
  Corretor.findById(id, function (err, corretor){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','corretor': corretor});
    }
  });
});

// api to update route
corretorRoutes.route('/update/:id').put(function (req, res) {
    Corretor.findById(req.params.id, function(err, corretor) {
    if (!corretor){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        corretor.email = req.body.email;
        corretor.creci = req.body.creci;

        corretor.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
corretorRoutes.route('/delete/:id').delete(function (req, res) {
  Corretor.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = corretorRoutes;