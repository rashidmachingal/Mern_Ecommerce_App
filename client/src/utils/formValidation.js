// function for form validation
export const formValidation = (data) => {
    const errors = {};
    const inputFileds = Object.keys(data)

    inputFileds.forEach((field) => {
      if (!data[field]) {
        errors[field] = `${field.replace("_", " ")} is required`;
      } else {
        if (field === "email" && !/\S+@\S+\.\S+/.test(data[field])) {
          errors[field] = "Please enter a valid email";
        }
        if (field === "password" && (data[field].length < 6)) {
          errors[field] = "Password must be at least 6 characters";
        }
      }
    });
    
    return errors;
  };
  
  