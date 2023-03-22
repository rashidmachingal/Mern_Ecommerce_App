// function for form validation
export const formValidation = (data) => {
    const errors = {};
  
    if (!data.first_name) errors.first_name = 'First name is required';
    if (!data.second_name) errors.second_name = 'Last name is required';
    
    if (!data.email){
      errors.email = 'Email is required';
    }else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Please enter valid email';
    }

    if (!data.password){
        errors.password = 'Password is required'
    }else if(data.password.length < 6){
        errors.password = '"Password must be at least 6 characters';
    }
    
    return errors;
  };
  