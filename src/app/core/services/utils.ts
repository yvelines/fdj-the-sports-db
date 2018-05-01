import { Observable } from 'rxjs/Observable';

export const handleError = (error: any) => {
  if (error instanceof Response) {
    return Observable.throw(error.json()['error'] || 'backend server error');
  }
  return Observable.throw(error || 'backend server error');
};


const throwIfAlreadyLoaded = (parentModule: any, moduleName: string) => {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
};


