export const promiseWrapper = <T>(promise: Promise<T>): (() => T | never) => {
  let status: string = 'pending';
  let result: T;

  const suspender = promise.then(
    value => {
      status = 'success';
      result = value;
    },
    error => {
      status = 'error';
      result = error;
    },
  );

  return () => {
    switch (status) {
      case 'pending':
        throw suspender;
      case 'success':
        return result;
      case 'error':
        throw result;
      default:
        throw new Error('Unknown status');
    }
  };
};
