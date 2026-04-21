function errorHandler(err, _req, res, _next) {
  const isMulterError = err?.name === 'MulterError';
  const statusCode = err?.statusCode || (isMulterError ? 400 : 500);
  const message = isMulterError
    ? (err.code === 'LIMIT_FILE_SIZE' ? 'Resume PDF size must be 10MB or less' : err.message)
    : (err.message || 'Internal server error');

  console.error(err);
  res.status(statusCode).json({ message });
}

module.exports = errorHandler;
