export const handleError = (error: Error, message?: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(error?.message, message);
  }
};
