const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, _req, res, _next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Server Error'
  });
};

export { notFound, errorHandler };
