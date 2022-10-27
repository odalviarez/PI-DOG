const { Router } = require("express");
const {
  getDogs,
 // getDogsByName,
  createDog,
  getTemperaments,
  getDogsAndSave,
  getDogById,
} = require("./actions.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", async (req, res) => {
  try {
    let { name } = req.query;
    let allDogs = await getDogs(name);
    if (allDogs.length) {
      res.json(allDogs);
    } else {
      res.send("ningun dato encontrado");
    }
  } catch (error) {
    res.send(error.message);
  }
});

//Se debe traer de la API y guardarlos en la BDD
//Trae todos los temperamentos
router.get("/dogs/temperaments", async (req, res) => {
  try {
    let result = await getTemperaments();
    res.json(result);
  } catch (error) {
    res.send(error.messange);
  }
});

// Para pruebas

router.get("/home", async (req, res) => {
  try {
    let allDogs = {};
    allDogs = await getDogsAndSave();
    res.json(allDogs);
  } catch (error) {
    res.send(error.message);
  }
});

//trae la informacion completa de un perro por id
router.get("/dogs/:id", async (req, res) => {
  //busca el id y trae la informacion, si no lo encuentra debe retornar 404 y un mensaje que indique el id no existe
  try {
    let { id } = req.params;
    res.send(await getDogById(id));
  } catch (error) {
    res.send(error.messange);
  }
});

router.post("/dogs", async (req, res) => {
  //crea un perro y lo guarda en la BDD, recibe por body el json

  try {
    let resp = await createDog(req.body);
    console.log(resp);
    res.json(resp);
  } catch (error) {
    res.json(error.messange);
  }
});

module.exports = router;
