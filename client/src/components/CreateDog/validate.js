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
      errors.name = "Must contain at least 3 characters";
    } else if (input.name.length > 20) {
      errors.name = "Must be no longer than 20 characters";
    }
  } else {
    errors.name = "Must not contain numbers or special characters";
  }
  if (!input.heightMin) {
    errors.heightMin = "heightMin is required";
  } else if (input.heightMin.match("^[0-9]+$")) {
    if (input.heightMin < 1 && input.heightMin > 200) {
      errors.heightMin = "Should be between 1 and 200cm";
    }
  } else {
    errors.heightMin = "Must contain only positive integers";
  }

  if (!input.heightMax) {
    errors.heightMax = "heightMax is required";
  } else if (input.heightMax.match("^[0-9]+$")) {
    if (Number(input.heightMax) <= Number(input.heightMin) && input.heightMax > 200) {
      errors.heightMax = "Should be bewteen than heightMin and 200cm";
    }
  } else {
    errors.heightMax = "Must contain only positive integers";
  }

  if (!input.weightMin) {
    errors.weightMin = "weightMin is required";
  } else if (input.weightMin.match("^[0-9]+$")) {
    if (input.weightMin < 1 && input.weightMin > 200) {
      errors.weightMin = "Should be between 1 and 200kg";
    }
  } else {
    errors.weightMin = "Must contain only positive integers";
  }

  if (!input.weightMax) {
    errors.weightMax = "weightMax is required";
  } else if (input.weightMax.match("^[0-9]+$")) {
    if (Number(input.weightMax) <= Number(input.weightMin) && input.weightMax > 200) {
      errors.weightMax = "Should be bewteen than weightMin and 200cm";
    }
  } else {
    errors.weightMax = "Must contain only positive integers";
  }

  if (!input.lifeMin) {
    errors.lifeMin = "lifeMin is required";
  } else if (input.lifeMin.match("^[0-9]+$")) {
    if (input.lifeMin < 1 && input.lifeMin > 20) {
      errors.lifeMin = "Should be bewteen than 1 and 20 years";
    }
  } else {
    errors.lifeMin = "Must contain only positive integers";
  }

  if (!input.lifeMax) {
    errors.lifeMax = "lifeMax is required";
  } else if (input.lifeMax.match("^[0-9]+$")) {
    if (Number(input.lifeMax) <= Number(input.lifeMin) && input.lifeMax > 20) {
      errors.lifeMax = "Should be bewteen than lifeMin and 20 years";
    }
  } else {
    errors.lifeMax = "Must contain only positive integers";
  }

  if (!input.temperaments.length) {
    errors.temperaments = "temperament is required";
  }

  return errors;
};
export default validate;
