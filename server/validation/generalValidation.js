export const validateArray = (
  arr,
  message = "Array is required and cannot be empty",
) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error(message);
  }
};
