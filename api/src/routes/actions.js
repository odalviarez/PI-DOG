const { API_KEY } = process.env;
const axios = require("axios");
const { Dog, Temperament } = require("../db.js");
//const Dog = require("../models/Dog.js");
const { Op } = require("sequelize");

//creamos las funciones que llamen la API
//la funcion getDogs es asincrona por lo quese debe esperar su respuesta para continuar la ejecucion del programa.

const getDogs = async (name) => {
  var config = {
    method: "get",
    url: `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`,
    headers: {},
  };

  // let allDogs = await axios(config)
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     return error;
  //   });
  let allDogs = await Dog.findAll();
  if (name) {
    let dogsFilter = allDogs.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    return dogsFilter.length ? dogsFilter : [];
  }
  return allDogs;
};

// const getDogsByName = async (name) => {
//   // var config = {
//   //   method: "get",
//   //   url: `https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`,
//   //   headers: {},
//   // };
//   var config = {
//     method: "get",
//     url: `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`,
//     headers: {},
//   };

//   let allDogs = await axios(config)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       return error;
//     });

// return await Dog.findAll({
//   where: {
//     name: {
//       [Op.iLike]: `%${name}%`,
//     },
//   },
// });
// }

const getDogsBDDInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllDogs = async () => {
  const apiData = getDogs();
  const BDDData = getDogsBDDInfo();
  return apiData.concat(BDDData);
};

const createDog = async (data) => {
  try {
    let { name, weight, height, life_span, temperament, img, origin } = data;
    const dogCreated = await Dog.create({
      name,
      weight,
      height,
      life_span,
      temperament,
      img,
      origin,
    });
    return "dog created succefull";
  } catch (error) {
    return error;
  }
};

const getTemperaments = async () => {
  // var config = {
  //   method: "get",
  //   url: `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`,
  //   headers: {},
  // };
  // let allTemperaments = await axios(config)
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     return error;
  //   });
  // let temperaments = [];
  // let newArr = [];
  // // En temperaments guardamos todos los temperamentos de todos los perros.
  // allTemperaments?.map((e) => {
  //   temperaments = temperaments.concat(e.temperament?.split(", ")); //hacemos split ", " debido a que los strings vienen: "hola, esto, es, una, prueba"
  // });
  // //Ordenamos para que se encuentren en orden alfabetico.
  // temperaments.sort();
  // // Ahora hay que filtrar entre los arreglos para verificar que los temperamentos no se repitan.
  // temperaments.reduce((acc, item) => {
  //   if (!acc.includes(item) && item !== undefined) {
  //     acc.push(item);
  //     newArr.push({ name: item });
  //   }
  //   return acc;
  // }, []);
  // newArr.map(async (elem) => {
  //   await Temperament.findOrCreate({
  //     where: {
  //       name: elem.name,
  //     },
  //   });
  // });
  //return newArr;
  return await Temperament.findAll();
};

const getDogById = async (id) => {
  var config = {
    method: "get",
    url: `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`,
    headers: {},
  };

  let dogFilter = await axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  //retorna el objeto con los datos del perro buscado por ID
  return dogFilter.find((e) => Number(e.id) === Number(id));
};

const getDogsAndSave = async () => {
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

  let temperaments = [];
  let newArr = [];

  let allDogsToBDD = allDogs?.map((e) => {
    temperaments = temperaments.concat(e.temperament?.split(", "));
    return {
      id: e.id,
      name: e.name,
      weight: e.weight.metric,
      height: e.height.metric,
      life_span: e.life_span,
      temperament: e.temperament,
      img: e.image.url,
      origin: e.origin,
    };
  });
  temperaments.sort();
  temperaments.reduce((acc, item) => {
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
  //await Temperament.bulkCreate(newArr);
  await Dog.bulkCreate(allDogsToBDD);

  return "Creados en la BDD";
};

module.exports = {
  getDogs,
  //getDogsByName,
  getDogById,
  getDogsAndSave,
  createDog,
  getTemperaments,
  getAllDogs,
};
