const errorHandler = (handler) => {
  const func = async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

export default errorHandler;
