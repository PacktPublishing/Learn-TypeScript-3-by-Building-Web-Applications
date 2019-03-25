const log = (msg: string): void => { console.log(msg); };
const commitTransaction = (): void => {};
const rollbackTransaction = (): void => {};
const doInTransaction = (fn: Function): void => {};
const isAuthenticated = true;

// There are simple decorators
export function Traced(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;

  descriptor.value = function(... args: any[]) {
    log(`=> ${propertyKey} - Before: ${Date.now()}`);
    const result = original.apply(this, args);
    log(`=> ${propertyKey} - After: ${Date.now()}`);

    return result;
  }
}

export function Authenticated(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;

  descriptor.value = function(... args: any[]) {
    if(!isAuthenticated) {
      throw new Error('Access denied!');
    }

    return original.apply(this, args);
  }
}

export function Transactional(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;

  descriptor.value = function(... args: any[]) {
    try {

      doInTransaction(() => {
        // try to do something interesting
        commitTransaction();
      });
    } catch(error) {
      log(`Operation failed: ${error}`);
      rollbackTransaction();
    }

    return original.apply(this, args);
  }
}

type ValidNumberInfo = {
  min?: number,
  max?: number,
}

// this is a property decorator
export function ValidNumber(description: ValidNumberInfo) {
  return function(target: any, propertyKey: number, parameterIndex: number) {
    // ...
  }
}
