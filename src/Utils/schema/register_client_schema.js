export const inputTypes = {
    textfield:  "textfield",
    radio:  "radio",
    datepicker:  "date",
    textArea:  "textArea",
    checkbox:  "checkbox",
}



export const registerSchema = {
    "title": "Registration form",
    "description": "A simple form example.",
    "properties": {
      "fullName": {
        "inputType": inputTypes.textfield,
        "title": "Full name",
        "default": "Chuck",
        validations : {
            "required":true
        }
      },
      "password": {
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
        "inputType": inputTypes.datepicker,
        "title": "Date of Birth",
        validations : {
            // "max": new Date(),
        }
      },
      "gender": {
        "inputType": inputTypes.radio,
        "options": [
            {label:"Male", value:"male"},
            {label:"Female", value:"female"},
        ],
        "title": "Gender"
      },
      "mobile": {
        "inputType": inputTypes.textfield,
        "title": "Mobile",
        validations : {
            "minLength": 10
        }
      },
      "email": {
        "inputType": inputTypes.textfield,
        "title": "Email",
        validations : {
            "match": "email regex"
        }
      }
    }
  }