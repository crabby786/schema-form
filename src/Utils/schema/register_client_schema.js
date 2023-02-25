export const inputTypes = {
    textfield:  "textfield",
    radio:  "radio",
    datepicker:  "date",
    textArea:  "textArea",
    dropdown:  "dropdown",
    checkbox:  "checkbox",
}



export const registerSchema = {
    "title": "Registration form",
    "description": "A simple form example.",
    "properties": {
      "fullName": {
        "inputType": inputTypes.textfield,
        "title": "Full name",
        "name": "fullName",
        "default": "Chuck",
        validations : {
            "required":true
        }
      },
      "password": {
          "name": "password",
          "inputType": inputTypes.textfield,
          "title": "Password",
        "inputProps" : {
          type:"password",  
        },        
        validations : {
          "minLength": 3,
          "required":true
          // match : regex
        }
      },
      "dob": {
        "name": "dob",
        "inputType": inputTypes.datepicker,
        "title": "Date of Birth",
        validations : {
            // "max": new Date(),
        }
      },
      "gender": {
        "name": "gender",
        "inputType": inputTypes.radio,
        "options": [
          {label:"Male", value:"male"},
          {label:"Female", value:"female"},
        ],
        "title": "Gender"
      },
      "mobile": {
        "name": "mobile",
        "inputType": inputTypes.textfield,
        "title": "Mobile",
        "inputProps" : {
          type:"number",  
        },      
        validations : {
          "minLength": 10,
          "maxLength": 10,
        }
      },
      "email": {
        "name": "email",
        "inputType": inputTypes.textfield,
        "title": "Email",
        validations : {
          "match": /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        }
      }
    }
  }