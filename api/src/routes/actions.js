const { API_KEY } = process.env;
const axios = require("axios");
const { Dog, Temperament } = require("../db.js");
//const Dog = require("../models/Dog.js");

//creamos las funciones que llamen la API
//la funcion getDogs es asincrona por lo quese debe esperar su respuesta para continuar la ejecucion del programa.
module.exports = {
  getDogs: async () => {
    //   var config = {
    //     method: "get",
    //     url: `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`,
    //     headers: {},
    //   };

    //   return axios(config)
    //     .then((response) => {
    //       return response.data;
    //     })
    //     .catch((error) => {
    //       return error;
    //     });
    return await Dog.findAll();
  },

  getDogsByName: async (name) => {
    // var config = {
    //   method: "get",
    //   url: `https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`,
    //   headers: {},
    // };

    // return axios(config)
    //   .then((response) => {
    //     return response.data;
    //   })
    //   .catch((error) => {
    //     return error;
    //   });
    return await Dog.findAll({
      where: {
        [Op.substring]: name,
      },
    });
  },
  createDog: async (data) => {
    try {
      return await Dog.create(data);
    } catch (error) {
      return error;
    }
  },
  getTemperaments: async () => {
    var config = {
      method: "get",
      url: `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`,
      headers: {},
    };
    let allTemperaments = await axios(config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
    let temperaments = [];
    let newArr = [];
    // En temperaments guardamos todos los temperamentos de todos los perros.

    allTemperaments?.map((e) => {
      temperaments = temperaments.concat(e.temperament?.split(", ")); //hacemos split ", " debido a que los strings vienen: "hola, esto, es, una, prueba"
    });
    //Ordenamos para que se encuentren en orden alfabetico.
    temperaments.sort();
    // Ahora hay que filtrar entre los arreglos para verificar que los temperamentos no se repitan.
    temperaments.reduce((acc, item) => {
      if (!acc.includes(item) && item !== undefined) {
        acc.push(item);
        newArr.push({ name: item });
      }
      return acc;
    }, []);

    return await Temperament.bulkCreate(newArr);
  },
  getDogById: async (id) => {
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
  },

  getDogsAndSave: async () => {
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
        temperaments: e.temperament,
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

    let tempBDD = await Temperament.bulkCreate(newArr);
    let dogsBDD = await Dog.bulkCreate(allDogsToBDD);

    //allDogs?.map((e) => {});

    return;
  },
};
