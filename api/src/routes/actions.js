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

  let allDogs = await axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  //let allDogs = await Dog.findAll();
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
  let dogTemperament = [];
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
  // dogsBDD.map((e) => {
  //   if (e.temperaments.length) {
  //     e.temperaments.map((elem) => dogTemperament.push(elem.name));
  //   }
  // });
  // dogTemperament = dogTemperament.join(", ");
  // console.log(dogTemperament);
  // dogsBDD["temperament"] = dogTemperament //adaptamos para retornar string al front
  // console.log(dogTemperament);

  return dogsBDD;
};

const getAllDogs = async (name) => {
  const apiData = await getDogs(name);
  const BDDData = await getDogsBDDInfo(name);
  //console.log(BDDData);
  let allData = apiData.concat(BDDData);
  //console.log(allData)
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
    };
  });

  return allDogsAPI;
};

const createDog = async (data) => {
  console.log(data)
  try {
    let { name, weight, height, life_span, temperament, temperaments, image, origin } = data;
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
      return dogCreated;
    } else {
      return "Faltan datos para crear el perro";
    }
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
  // var config = {
  //   method: "get",
  //   url: `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`,
  //   headers: {},
  // };

  // let dogFilter = await axios(config)
  //   .then((response) => {
  //     return response.data;
  //   })
  //   .catch((error) => {
  //     return error;
  //   });

  //retorna el objeto con los datos del perro buscado por ID
  let dogFilter = await getAllDogs(); //getDogs();
  let dogFind = dogFilter.find((e) => Number(e.id) === Number(id));
  if (dogFind) {
    return dogFind;
  } else {
    //buscamos primero si el ID se encuentra en la base de datos. Si se encuentra retorna toda la info de ese perro. de lo contrario llama la api y busca el perro
    dogFilter = await Dog.findAll();
    if (dogFilter.length) return dogFilter.find((e) => e.id == id);
  }
  return `ID ${id} not found`;
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
  //await Temperament.bulkCreate(newArr);
  //await Dog.bulkCreate(allDogsToBDD);

  return allDogs;
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
