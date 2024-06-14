import React from 'react'
import { useNavigation } from 'react-router-dom'

const SubmitBtn = ({text, disabled}) => {
    // const navigation = useNavigation();
    // const index = useNavigationState((state) => state.index);
    // const isSubmitting = navigation.state === 'submitting';
  return (
    <button type='submit' disabled={disabled} className='btn btn-primary w-full'>
        {text}
    </button>
  )
}

export default SubmitBtn