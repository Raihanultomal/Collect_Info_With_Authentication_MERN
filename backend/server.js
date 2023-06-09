// require('dotenv').config();
const fs = require('fs');
const path = require('path');

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Crud = require('./models/crudModel');
const RegisterSchema = require('./models/registerModel');
const LoginSchema = require('./models/loginModel');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const { Schema } = mongoose;
// const { isEmail } = require('validator');

const app = express();
// request data collect korar jonne midleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Configure multer storage
// image store korar jonne
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the directory to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set the file name
  },
});

const upload = multer({ storage: storage });

//Async await function use kore mongoDB connect

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/CRUD');
    console.log('DB connet');
  } catch (error) {
    console.log('DB not connet');
    console.log(error);
  }
};

// routers

app.use('/uploads', express.static('./uploads'));

// register router

app.post('/register', async (req, res) => {
  try {
    //For testing purpous

    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;
    // const newUsers = new Users({
    //   name,
    //   email,
    //   password,
    // });

    //data comeing from frontend

    const newUsers = new RegisterSchema({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    // console.log(newUsers);
    const { email } = newUsers;
    // database e email already ache kina seta chenck kora hocce
    const findData = await RegisterSchema.findOne({
      email: email,
    });
    // email already databse e na thakle new ID create kora hobe
    if (!findData) {
      const usersData = await newUsers.save();
      console.log(findData);

      res.status(200).send('Successfull');
    } else {
      res.json('fail');
      res.status(200).send('Already exist');
    }
  } catch (error) {
    // res.json('noOk');
    res.status(500).send({ message: error.message });
  }
});

// login router
app.post('/login', async (req, res) => {
  try {
    const newUsers = new LoginSchema({
      email: req.body.email,
      password: req.body.password,
    });
    const { email, password } = newUsers;
    // database e email already ache kina seta chenck kora hocce
    const findData = await RegisterSchema.findOne({
      email: email,
      password: password,
    });
    // email already databse e na thakle new ID create kora hobe
    if (findData) {
      // const usersData = await newUsers.save();
      console.log(findData);
      res.json(findData);

      res.status(200).send('Successfull');
    } else {
      res.json('fail');
      res.status(200).send('Register first to login');
    }
  } catch (error) {
    res.json({ message: error.message });
    res.status(500).send({ message: error.message });
  }
});

// Read all data for CRUD operation

app.get('/:id', async (req, res) => {
  //   res.send('Ok');
  // login jei Id diye kora hoyeche sei Id collect kora hoyeche
  // const loginUserId = new RegisterSchema({
  //   id: req.body._id,
  // });
  // const { id } = loginUserId;
  const { id } = req.params;
  console.log(id);
  try {
    const data = await Crud.find({ userId: id });
    // res.json(data);
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// create api

app.post('/crud/create', upload.single('image'), async (req, res) => {
  const imagePath = req.file.path;
  const { userId, name, email, number } = req.body;
  const image = req.file ? req.file.filename : null;
  // console.log(req.body, 11);
  // console.log(userId);
  const newCruds = new Crud({
    userId,
    name,
    email,
    number,
    image,
  });
  console.log(newCruds, 2);

  const findData = await Crud.findOne({
    email: email,
    userId: userId,
  });
  console.log(findData, 23);
  const dataAfterAddNewCrud = await RegisterSchema.findById({
    _id: userId,
  });
  // console.log(dataAfterAddNewCrud, 13);

  try {
    if (findData == null) {
      const newInfo = await newCruds.save();
      console.log(newInfo, 12);
      console.log('saveeeeeeeeee...');

      res.send(dataAfterAddNewCrud);
    } else {
      console.log(findData, 1111);
    }
  } catch (error) {
    res.json('fail');

    res.status(500).json({ error: error.message });
  }
});

// get data for update

app.get('/update/data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateIndividualData = await Crud.findById({ _id: id });
    res.status(201).json(updateIndividualData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update api

app.put('/crud/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, number, userId } = req.body;
    const existingData = await Crud.findByIdAndUpdate(
      id,
      {
        // name: req.body.name,
        // email: req.body.email,
        // number: req.body.number,
        name,
        email,
        number,
      },
      { new: true }
    );
    const updatedData = await RegisterSchema.findById({ _id: userId });

    if (!existingData) {
      return res.status(404).json({ error: 'Data not found' });
    }
    // res.json(existingData);
    // res.send((message = 'Update Successfully'));
    res.send(updatedData);
  } catch (error) {
    res.json('fail');
    res.status(500).json({ error: error.message });
  }
});

// delete api
app.delete('/crud/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await Crud.findByIdAndDelete({ _id: id });
    if (!deleteData) {
      res.status(404).json({ error: 'Data not found' });
    } else {
      const { image } = deleteData;
      // image delete korar jonne
      const imagePath = path.join(__dirname, 'uploads', image);

      // Check if the file exists
      if (fs.existsSync(imagePath)) {
        // Delete the file
        fs.unlinkSync(imagePath);
      }
      res.send('Successfully deleted');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// listening port
app.listen(5000, async () => {
  console.log('Server connected');
  await connectDB();
});
