import { AbstractControl } from '@angular/forms';
import { of, Observable } from 'rxjs';

export function ValidateUrl(control: AbstractControl): { [key: string]: boolean }|null  {
  if (control.value) {
      
    // return { validUrl: isUrlValid(control.value) };
    return isUrlValid(control.value)?null:{ invalidUrl: true}
  }
}

function isUrlValid(userInput:string) {
    var regexQuery = "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
    var url = new RegExp(regexQuery,"i");
    return url.test(userInput);
}