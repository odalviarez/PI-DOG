const { API_KEY } = process.env;
const axios = require("axios");
const { Dog, Temperament } = require("../db.js");
const { Op } = require("sequelize");

//creamos las funciones que llamen la API
//la funcion getDogs es asincrona por lo quese debe esperar su respuesta para continuar la ejecucion del programa.

const getDogs = async (name) => {
  var config = {
    method: "get",
    url: `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`,
    headers: {},
  };

  let allDogs = await axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  if (name) {
    let dogsFilter = allDogs.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    return dogsFilter.length ? dogsFilter : [];
  }
  return allDogs;
};

const getDogsBDDInfo = async (name) => {
  let dogsBDD = [];
  if (name) {
    dogsBDD = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Temperament,
      },
    });
  } else {
    dogsBDD = await Dog.findAll({
      include: {
        model: Temperament,
      },
    });
  }
  return dogsBDD;
};

const getAllDogs = async (name) => {
  const apiData = await getDogs(name);
  const BDDData = await getDogsBDDInfo(name);
  let allData = apiData.concat(BDDData);
  let allDogsAPI = allData?.map((e) => {
    return {
      id: e.id,
      name: e.name,
      weight: e.weight,
      height: e.height,
      life_span: e.life_span,
      temperament: e.temperament,
      image: e.image,
      origin: e.origin,
      bdd: e.bdd ? e.bdd : false,
    };
  });

  return allDogsAPI;
};

const createDog = async (data) => {
  console.log(data);
  try {
    let {
      name,
      weight,
      height,
      life_span,
      temperament,
      temperaments,
      image,
      origin,
    } = data;
    if (name && weight && height && life_span && temperaments && temperament) {
      const dogCreated = await Dog.create({
        name,
        weight,
        height,
        life_span,
        temperament,
        image,
        origin,
      });
      dogCreated.addTemperament(temperaments);
      return "Dog Created";
    } else {
      return "Faltan datos para crear el perro";
    }
  } catch (error) {
    return error;
  }
};

const getTemperaments = async () => {
  return await Temperament.findAll();
};

const getDogById = async (id) => {
  //retorna el objeto con los datos del perro buscado por ID
  let dogFilter = await getAllDogs(); //getDogs();
  let dogFind = dogFilter.find((e) => Number(e.id) === Number(id));
  if (dogFind) {
    return dogFind;
  } else {
    //buscamos primero si el ID se encuentra en la api. Si se encuentra retorna toda la info de ese perro. de lo contrario lo busca en la base de ratos y retorna y busca el perro
    dogFilter = await Dog.findAll();

    if (dogFilter.length) {
      dogFind = dogFilter.find((e) => e.id == id);
      if (dogFind) return dogFind;
    }
  }
  return { error: `ID ${id} not found` };
};

const getDogsAndSave = async (name) => {
  let allDogs = await getDogs(name);

  let temperaments = [];
  let newArr = [];

  allDogs?.map((e) => {
    temperaments = temperaments.concat(e.temperament?.split(", "));
  });
  temperaments.sort();
  let acc = temperaments.reduce((acc, item) => {
    if (!acc.includes(item) && item !== undefined) {
      acc.push(item);
      newArr.push({ name: item });
    }
    return acc;
  }, []);
  newArr.map(async (elem) => {
    await Temperament.findOrCreate({
      where: {
        name: elem.name,
      },
    });
  });

  return allDogs;
};

const deleteDog = async (id) => {
  let dogDelete = await Dog.destroy({
    where: {
      id,
    },
  });

  return dogDelete;
};

module.exports = {
  getDogs,
  getDogById,
  getDogsAndSave,
  createDog,
  getTemperaments,
  getAllDogs,
  getDogsBDDInfo,
  deleteDog,
};
