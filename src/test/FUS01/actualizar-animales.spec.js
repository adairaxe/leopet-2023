/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
// updates animal information when all required fields are provided
it('should update animal information when all required fields are provided', async () => {
  const req = {
    User: {
      id: 'adminId',
      fundacionId: 'fundacionId',
    },
    params: {
      animalId: 'animalId',
    },
    body: {
      nombre: 'newName',
      especie: 'newSpecies',
      raza: 'newBreed',
      descripcion: 'newDescription',
      galeria: 'newGallery',
      sexo: 'newSex',
      edad: 'newAge',
      peso: 'newWeight',
      enfermedades: 'newDiseases',
      esterilizacion: 'newSterilization',
      vacunacion: 'newVaccination',
      desparasitacion: 'newDeworming',
    }
  };
  const res = {
    send: jest.fn(),
  };
  await updateAnimal(req, res);
  expect(res.send).toHaveBeenCalledWith({
    mensaje: 'Informacion del animal actualizada.',
    result: expect.any(Object)
  });
});


// updates animal information when only some optional fields are provided
it('should update animal information when only some optional fields are provided', async () => {
  const req = {
    User: {
      id: 'adminId',
      fundacionId: 'fundacionId'
    },
    params: {
      animalId: 'animalId'
    },
    body: {
      nombre: '',
      especie: '',
      raza: '',
      descripcion: '',
      galeria: '',
      sexo: 'newSex',
      edad: 'newAge',
      peso: 'newWeight',
      enfermedades: 'newDiseases',
      esterilizacion: 'newSterilization',
      vacunacion: 'newVaccination',
      desparasitacion: 'newDeworming'
    }
  };
  const res = {
    send: jest.fn()
  };
  await updateAnimal(req, res);
  expect(res.send).toHaveBeenCalledWith({
    mensaje: 'Informacion del animal actualizada.',
    result: expect.any(Object)
  });
});


// returns success message when animal information is updated successfully
it('should return success message when animal information is updated successfully', async () => {
  const req = {
    User: {
      id: 'adminId',
      fundacionId: 'fundacionId'
    },
    params: {
      animalId: 'animalId'
    },
    body: {
      nombre: 'newName',
      especie: 'newSpecies',
      raza: 'newBreed',
      descripcion: 'newDescription',
      galeria: 'newGallery',
      sexo: 'newSex',
      edad: 'newAge',
      peso: 'newWeight',
      enfermedades: 'newDiseases',
      esterilizacion: 'newSterilization',
      vacunacion: 'newVaccination',
      desparasitacion: 'newDeworming'
    }
  };
  const res = {
    send: jest.fn()
  };
  await updateAnimal(req, res);
  expect(res.send).toHaveBeenCalledWith({
    mensaje: 'Informacion del animal actualizada.',
    result: expect.any(Object)
  });
});


// does not update animal information when user is not an admin of the animal's fundacion
it('should not update animal information when user is not an admin of the animals fundacion', async () => {
  const req = {
    User: {
      id: 'nonAdminId',
      fundacionId: 'fundacionId'
    },
    params: {
      animalId: 'animalId'
    },
    body: {
      nombre: 'newName',
      especie: 'newSpecies',
      raza: 'newBreed',
      descripcion: 'newDescription',
      galeria: 'newGallery',
      sexo: 'newSex',
      edad: 'newAge',
      peso: 'newWeight',
      enfermedades: 'newDiseases',
      esterilizacion: 'newSterilization',
      vacunacion: 'newVaccination',
      desparasitacion: 'newDeworming'
    }
  };
  const res = {
    send: jest.fn()
  };
  await updateAnimal(req, res);
  expect(res.send).toHaveBeenCalledWith({
    result: [],
  });
});


// does not update animal information when animal does not belong to user's fundacion
it('should not update animal information when animal does not belong to users fundacion', async () => {
  const req = {
    User: {
      id: 'adminId',
      fundacionId: 'nonMatchingFundacionId'
    },
    params: {
      animalId: 'animalId'
    },
    body: {
      nombre: 'newName',
      especie: 'newSpecies',
      raza: 'newBreed',
      descripcion: 'newDescription',
      galeria: 'newGallery',
      sexo: 'newSex',
      edad: 'newAge',
      peso: 'newWeight',
      enfermedades: 'newDiseases',
      esterilizacion: 'newSterilization',
      vacunacion: 'newVaccination',
      desparasitacion: 'newDeworming'
    }
  };
  const res = {
    send: jest.fn()
  };
  await updateAnimal(req, res);
  expect(res.send).toHaveBeenCalledWith({
    result: []
  });
});


// returns an empty result array when animal information is not updated due to user permissions
it('should return an empty result array when animal information is not updated due to user permissions', async () => {
  const req = {
    User: {
      id: 'adminId',
      fundacionId: 'fundacionId'
    },
    params: {
      animalId: 'animalId'
    },
    body: {
      nombre: 'newName',
      especie: 'newSpecies',
      raza: 'newBreed',
      descripcion: 'newDescription',
      galeria: 'newGallery',
      sexo: 'newSex',
      edad: 'newAge',
      peso: 'newWeight',
      enfermedades: 'newDiseases',
      esterilizacion: 'newSterilization',
      vacunacion: 'newVaccination',
      desparasitacion: 'newDeworming'
    }
  };
  const res = {
    send: jest.fn()
  };
  await updateAnimal(req, res);
  expect(res.send).toHaveBeenCalledWith({
    result: [],
  });
});
