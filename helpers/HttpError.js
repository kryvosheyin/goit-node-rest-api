const messageList = {
  400: "Bad Request",
  401: "Not Authorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const HttpError = (
  status,
  message = messageList[status] || "Unknown Error"
) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export default HttpError;
