const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    name: {
        in: ["body"],
        notEmpty: {
            options: {
                ignore_whitespace: true
            },
            errorMessage: "Campo nome obbligatorio"
        }
    },
    lastname: {
        in: ["body"],
        notEmpty: {
            options: {
                ignore_whitespace: true
            },
            errorMessage: "Campo nome obbligatorio"
        }
    },
    email: {
        in: ["body"],
        notEmpty: {
            options: {
                ignore_whitespace: true
            },
            errorMessage: "Campo email obbligatorio"
        },
        isEmail: {
            errorMessage: "Email non valida"
        },
        custom: {
            options: async (value) => {
                const isUniqueEmail = await prisma.user.findUnique({
                    
                    where: {
                        email: value
                    }
                })

                if (isUniqueEmail) {
                    next (new Error("Account gia esistente procedi al recupero"));
                }
                
                return true
            }
        }
    },
    password: {
        in: ["body"],
        isStrongPassword: {
          options: {
            minLength: 8,
          },
        },
        errorMessage:
          "La password deve essere lunga almeno 8 caratteri",
      },
}