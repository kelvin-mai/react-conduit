interface ErrorResponse {
  errors: {
    [key: string]: string;
  };
}

export const formatErrors = (data: string | ErrorResponse): string[] => {
  if (typeof data === 'string') {
    return [data];
  } else {
    return Object.keys(data.errors).flatMap(
      key => `${key}: ${data.errors[key]}`,
    );
  }
};
