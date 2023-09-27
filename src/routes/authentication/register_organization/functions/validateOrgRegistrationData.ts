import {
  phoneNumberRegex,
  emailRegex,
  organizationNameRegex,
  addressRegex,
  validOrganizationTypes,
  referencePrefixRegex,
} from "../../../../validators/validators.js";

import { TOrganizationRegistrationData} from "../../../../types/authenticationRoutes.js";

const validateOrgRegistrationData = (data: TOrganizationRegistrationData) => {
  const {
    organizationName,
    email,
    phoneNumber,
    address,
    organizationType,
    referencePrefix,
  } = data;
  if (!(organizationName && email && phoneNumber && address && referencePrefix)) return false;
  //by default undefined is converted to a string and tested in regex.test()
  if (
    !(
      organizationNameRegex.test(organizationName) &&
      emailRegex.test(email) &&
      phoneNumberRegex.test(phoneNumber) &&
      addressRegex.test(address) &&
      referencePrefixRegex.test(referencePrefix) &&
      validOrganizationTypes.includes(organizationType)
    )
  )
    return false;

  return true;
};

export default validateOrgRegistrationData;
