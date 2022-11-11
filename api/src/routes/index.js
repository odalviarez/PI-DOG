const { Router } = require("express");
const {
  getDogs,
  getDogsBDDInfo,
  createDog,
  getTemperaments,
  getDogsAndSave,
  getDogById,
  getAllDogs,
  deleteDog,
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
      res.status(404).json({ error: "Not Found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message }); 
  }
});

router.get("/dogsapi", async (req, res) => {
  try {
    let allDogs = await getDogs();
    if (allDogs.length) {
      res.json(allDogs);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    res.status(400).json({ error: error.message }); 
  }
});

router.get("/dogsbdd", async (req, res) => {
  try {
    let allDogs = await getDogsBDDInfo();
    if (allDogs.length) {
      res.json(allDogs);
    } else {
      res.json({ error: "Not Found" }); 
    }
  } catch (error) {
    res.status(400).json({ error: error.message }); 
  }
});

//Trae todos los temperamentos
router.get("/dogs/temperaments", async (req, res) => {
  try {
    let result = await getTemperaments();
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message }); 
  }
});

router.get("/home", async (req, res) => {
  try {
    let allDogs = {};
    allDogs = await getDogsAndSave();
    res.json(allDogs);
  } catch (error) {
    res.status(400).json({ error: error.message }); 
  }
});

//trae la informacion completa de un perro por id
router.get("/dogs/:id", async (req, res) => {
  //busca el id y trae la informacion, si no lo encuentra debe retornar 404 y un mensaje que indique el id no existe
  try {
    let { id } = req.params;
    let details = await getDogById(id);
    
    res.json(details);
  } catch (error) {
    res.status(400).json(error); 
  }
});

router.delete("/dogs/:id", async (req, res) => {
try {
  let {id} = req.params;
  if(id) {
    let dogDelete = await deleteDog(id);
    res.json(dogDelete);
  }else{
    res.json("ID not found")
  }
} catch (error) {
  res.status(400).json(error); 
}

})

router.post("/dogs", async (req, res) => {
  //crea un perro y lo guarda en la BDD, recibe por body el json

  try {
    let resp = await createDog(req.body);
    res.json(resp);
  } catch (error) {
    res.status(400).json({ error: error.message }); 
  }
});

module.exports = router;
