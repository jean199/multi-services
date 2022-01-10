import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

const SERVICE_AVAILABLE = ['ping', 'geoip', 'reversedns', 'rdap'];

@ValidatorConstraint({ name: 'validType', async: false })
export class ValidType implements ValidatorConstraintInterface {
  validate(types: string[]) {
    if (!types || types.length === 0) {
      return false;
    }
    for (let index = 0; index < types.length; index++) {
      const element = types[index];
      if (!SERVICE_AVAILABLE.includes(element?.toLocaleLowerCase()))
        return false;
    }
    return true;
  }
}
