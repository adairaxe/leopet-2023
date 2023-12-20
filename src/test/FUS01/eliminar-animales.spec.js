/* eslint-disable */

// Successfully delete an animal with valid animalId and admin user
it('should successfully delete an animal with valid animalId and admin user', async () => {
  const req = {
    User: {
      id: 'adminUserId',
      fundacionId: 'fundacionId'
    },
    params: {
      animalId: 'validAnimalId'
    }
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  };
  const validateRequest = jest.fn();
  const validateAdminFund = jest.fn().mockReturnValue(true);
  const Animal = {
    findOne: jest.fn().mockResolvedValue({ id: 'validAnimalId', visible: true }),
    update: jest.fn()
  };

  await deleteAnimal(req, res);

  expect(validateRequest).toHaveBeenCalledWith(req);
  expect(validateAdminFund).toHaveBeenCalledWith('adminUserId');
  expect(res.status).not.toHaveBeenCalled();
  expect(res.send).toHaveBeenCalledWith({
    mensaje: 'Animal eliminado exitosamente',
    result: { id: 'validAnimalId', visible: true }
  });
  expect(Animal.findOne).toHaveBeenCalledWith({
    where: { id: 'validAnimalId', visible: true }
  });
  expect(Animal.update).toHaveBeenCalledWith(
    { visible: false, updatedAt: expect.any(Date) },
    { where: { id: 'validAnimalId', fundacion_id: 'fundacionId' } }
  );
});


// Return a message "Animal eliminado exitosamente" after deleting an animal
it('should return a message "Animal eliminado exitosamente" after deleting an animal', async () => {
  const req = {
    User: {
      id: 'adminUserId',
      fundacionId: 'fundacionId'
    },
    params: {
      animalId: 'validAnimalId'
    }
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  };
  const validateRequest = jest.fn();
  const validateAdminFund = jest.fn().mockReturnValue(true);
  const Animal = {
    findOne: jest.fn().mockResolvedValue({ id: 'validAnimalId', visible: true }),
    update: jest.fn()
  };

  await deleteAnimal(req, res);

  expect(validateRequest).toHaveBeenCalledWith(req);
  expect(validateAdminFund).toHaveBeenCalledWith('adminUserId');
  expect(res.status).not.toHaveBeenCalled();
  expect(res.send).toHaveBeenCalledWith({
    mensaje: 'Animal eliminado exitosamente',
    result: { id: 'validAnimalId', visible: true }
  });
});


// Return a response object with a message and the deleted animal after deleting an animal
it('should return a response object with a message and the deleted animal after deleting an animal', async () => {
  const req = {
    User: {
      id: 'adminUserId',
      fundacionId: 'fundacionId'
    },
    params: {
      animalId: 'validAnimalId'
    }
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  };
  const validateRequest = jest.fn();
  const validateAdminFund = jest.fn().mockReturnValue(true);
  const Animal = {
    findOne: jest.fn().mockResolvedValue({ id: 'validAnimalId', visible: true }),
    update: jest.fn()
  };

  await deleteAnimal(req, res);

  expect(validateRequest).toHaveBeenCalledWith(req);
  expect(validateAdminFund).toHaveBeenCalledWith('adminUserId');
  expect(res.status).not.toHaveBeenCalled();
  expect(res.send).toHaveBeenCalledWith({
    mensaje: 'Animal eliminado exitosamente',
    result: { id: 'validAnimalId', visible: true }
  });
});


// Return a 401 error if the user is not an admin
it('should return a 401 error if the user is not an admin', async () => {
  const req = {
    User: {
      id: 'nonAdminUserId',
      fundacionId: 'fundacionId'
    },
    params: {
      animalId: 'validAnimalId'
    }
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  };
  const validateRequest = jest.fn();
  const validateAdminFund = jest.fn().mockReturnValue(false);
  const Animal = {
    findOne: jest.fn().mockResolvedValue({ id: 'validAnimalId', visible: true }),
    update: jest.fn()
  };

  await deleteAnimal(req, res);

  expect(validateRequest).toHaveBeenCalledWith(req);
  expect(validateAdminFund).toHaveBeenCalledWith('nonAdminUserId');
  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.send).toHaveBeenCalledWith({ error: 'No esta autorizado para realizar esta operacion!' });
});


// Return a 500 error if an error occurs during the deletion process
it('should return a 500 error if an error occurs during the deletion process', async () => {
  const req = {
    User: {
      id: 'adminUserId',
      fundacionId: 'fundacionId'
    },
    params: {
      animalId: 'validAnimalId'
    }
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  };
  const validateRequest = jest.fn();
  const validateAdminFund = jest.fn().mockReturnValue(true);
  const Animal = {
    findOne: jest.fn().mockResolvedValue({ id: 'validAnimalId', visible: true }),
    update: jest.fn().mockRejectedValue(new Error('Deletion error'))
  };

  await deleteAnimal(req, res);

  expect(validateRequest).toHaveBeenCalledWith(req);
  expect(validateAdminFund).toHaveBeenCalledWith('adminUserId');
  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.send).toHaveBeenCalledWith(JSON.stringify({
    message: 'Something bad happened!',
    error: 'Error: Deletion error'
  }));
});


// Return a 500 error if an error occurs during the validation process
it('should return a 500 error if an error occurs during the validation process', async () => {
  const req = {
    User: {
      id: 'adminUserId',
      fundacionId: 'fundacionId'
    },
    params: {
      animalId: 'validAnimalId'
    }
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  };
  const validateRequest = jest.fn().mockRejectedValue(new Error('Validation error'));
  const validateAdminFund = jest.fn().mockReturnValue(true);
  const Animal = {
    findOne: jest.fn().mockResolvedValue({ id: 'validAnimalId', visible: true }),
    update: jest.fn()
  };

  await deleteAnimal(req, res);

  expect(validateRequest).toHaveBeenCalledWith(req);
  expect(validateAdminFund).not.toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.send).toHaveBeenCalledWith(JSON.stringify({
    message: 'Something bad happened!',
    error: 'Error: Validation error'
  }));
});