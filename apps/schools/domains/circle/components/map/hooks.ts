import { useMemo } from 'react'
import { ValidatorsMap } from '@domains/common/redux/interfaces'
import { PleaseSelectOneOfOptionsMsg } from "@domains/user/components/auth/constants/message";

export const useAddressFormValidators = () => {
  return useMemo<ValidatorsMap>(() => {
    return {
      city: [
        {
          required: true,
          message: PleaseSelectOneOfOptionsMsg,
        }
      ],
    }
  }, [this])
}

