type ServerResponse<T> = {
  message: string;
  data: T[];
  meta?: Meta;
};
