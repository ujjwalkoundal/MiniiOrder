export const successResponse = (res, message = "Success", data = null, status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (res, message = "Internal server error", status = 500, data = null) => {
  return res.status(status).json({
    success: false,
    message,
    data,
  });
};