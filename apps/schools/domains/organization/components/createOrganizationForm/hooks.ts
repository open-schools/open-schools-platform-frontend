import { useMemo } from 'react'
import { ValidatorsMap } from '@domains/common/redux/interfaces'
import {
  PleaseInputCorrectOrganizationINNMsg,
  PleaseInputOrganizationNameMsg
} from "@domains/organization/components/constnants/messege";

export const useCreateOrganizationFormValidators = () => {
  return useMemo<ValidatorsMap>(() => {
    return {
      name: [
        {
          required: true,
          message: PleaseInputOrganizationNameMsg,
          whitespace: true,
          type: 'string',
        }
      ],
      INN: [
        {
          required: true,
          message: PleaseInputCorrectOrganizationINNMsg,
          validator: (_, value) =>
            /^\d+$/.test(value && value.trim()) ? Promise.resolve() : Promise.reject(),
        },
      ],
    }
  }, [this])
}
