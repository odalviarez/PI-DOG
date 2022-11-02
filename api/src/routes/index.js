const { Router } = require("express");
const {
  getDogs,
 // getDogsByName,
  createDog,
  getTemperaments,
  getDogsAndSave,
  getDogById,
  getAllDogs,
} = require("./actions.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", async (req, res) => {
  try {
    let { name } = req.query;
    let allDogs = await getAllDogs(name);
    if (allDogs.length) {
      res.json(allDogs);
    } else {
      res.status(404).send("ningun dato encontrado");
    }
  } catch (error) {
    res.json(error.message);
  }
});

//Se debe traer de la API y guardarlos en la BDD
//Trae todos los temperamentos
router.get("/dogs/temperaments", async (req, res) => {
  try {
    let result = await getTemperaments();
    res.json(result);
  } catch (error) {
    res.json(error.messange);
  }
});


router.get("/home", async (req, res) => {
  try {
    let allDogs = {};
    allDogs = await getDogsAndSave();
    res.json(allDogs);
  } catch (error) {
    res.json(error.message);
  }
});

//trae la informacion completa de un perro por id
router.get("/dogs/:id", async (req, res) => {
  //busca el id y trae la informacion, si no lo encuentra debe retornar 404 y un mensaje que indique el id no existe
  try {
    let { id } = req.params;
    res.json(await getDogById(id));
  } catch (error) {
    res.json(error.messange);
  }
});

router.post("/dogs", async (req, res) => {
  //crea un perro y lo guarda en la BDD, recibe por body el json

  try {
    let resp = await createDog(req.body);
    res.json(resp);
  } catch (error) {
    res.json(error.messange);
  }
});

module.exports = router;
