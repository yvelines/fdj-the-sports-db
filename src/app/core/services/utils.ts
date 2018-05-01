import { Observable } from 'rxjs/Observable';

export const handleError = (error: any) => {
  if (error instanceof Response) {
    return Observable.throw(error.json()['error'] || 'backend server error');
  }
  return Observable.throw(error || 'backend server error');
};

