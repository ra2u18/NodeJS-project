const fs = require('fs');
const Tour = require('../models/tourModel');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, value) => {
  if (req.params.id * 1 > tours.length) {
    // RETURN FROM MIDDLEWARE TO END THE MIDDLEWARE CALLSTACK
    return res.status(404).json({
      status: 'fail',
      requestedAt: req.requestTime,
      message: 'Invalid ID',
    });
  }

  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }

  next();
};

exports.getAllTours = (req, res) => {
  // Modified data using JSent specification
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours: tours },
  });
};

exports.getTour = (req, res) => {
  // Modified data using JSent specification
  const tour = tours.find((el) => el.id === req.params.id * 1);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: { tour: tour },
  });
};

exports.createTour = (req, res) => {
  //   console.log(req.body);
  const id = tours[tours.length - 1].id + 1;
  const newTour = { id: id, ...req.body };

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: { tour: newTour },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
