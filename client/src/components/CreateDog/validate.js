const validate = (input) => {
  let errors = {};
  /**
   *     heightMin: 0,
    heightMax: 0,
    weightMin: 0,
    weightMax: 0,
    lifeMin: 0,
    lifeMax: 0,
   */

  if (!input.name) {
    errors.name = "Name is required";
  } else if (input.name.match("^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$")) {
    if (input.name.length < 3) {
      errors.name = "Debe contener al menos 3 caracteres";
    } else if (input.name.length > 255) {
      errors.name = "No debe ser mayor a 254 caracteres";
    }
  } else {
    errors.name = "No debe contener numeros ni caracteres especiales";
  }
  if (!input.heightMin) {
    errors.heightMin = "heightMin is required";
  } else if (input.heightMin.match("^[0-9]+$")) {
    if (input.heightMin < 1) {
      errors.heightMin = "Should be taller than 1cm";
    }
  } else {
    errors.heightMin = "Debe contener solo numeros enteros positivos";
  }

  if (!input.heightMax) {
    errors.heightMax = "heightMax is required";
  } else if (input.heightMax.match("^[0-9]+$")) {
    if (Number(input.heightMax) <= Number(input.heightMin)) {
      errors.heightMax = "Should be taller than heightMin";
    }
  } else {
    errors.heightMax = "Debe contener solo numeros enteros positivos";
  }

  if (!input.weightMin) {
    errors.weightMin = "weightMin is required";
  } else if (input.weightMin.match("^[0-9]+$")) {
    if (input.weightMin < 1) {
      errors.weightMin = "Should be taller than 1cm";
    }
  } else {
    errors.weightMin = "Debe contener solo numeros enteros positivos";
  }

  if (!input.weightMax) {
    errors.weightMax = "weightMax is required";
  } else if (input.weightMax.match("^[0-9]+$")) {
    if (Number(input.weightMax) <= Number(input.weightMin)) {
      errors.weightMax = "Should be taller than heightMin";
    }
  } else {
    errors.weightMax = "Debe contener solo numeros enteros positivos";
  }

  if (!input.lifeMin) {
    errors.lifeMin = "lifeMin is required";
  } else if (input.lifeMin.match("^[0-9]+$")) {
    if (input.lifeMin < 1) {
      errors.lifeMin = "Should be taller than 1cm";
    }
  } else {
    errors.lifeMin = "Debe contener solo numeros enteros positivos";
  }

  if (!input.lifeMax) {
    errors.lifeMax = "lifeMax is required";
  } else if (input.lifeMax.match("^[0-9]+$")) {
    if (Number(input.lifeMax) <= Number(input.lifeMin)) {
      errors.lifeMax = "Should be taller than heightMin";
    }
  } else {
    errors.lifeMax = "Debe contener solo numeros enteros positivos";
  }

  if (!input.temperaments.length) {
    errors.temperaments = "temperament is required";
  }

  return errors;
};
export default validate;
