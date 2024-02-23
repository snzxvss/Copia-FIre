import { OAS3Definition } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
    openapi: "3.0.0",
    info: {
        title: 'DOCUMENTATION API',
        version: "1.0.0"
    },
    servers: [
        {
            url: 'http://3.80.189.150:9000'
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            },
        },
        schemas: {
            authUser: {
                type: 'object',
                // required: ['username', 'password'],
                properties: {
                    username: {
                        type: 'string',
                        example: 'Admin'
                    },
                    password: {
                        type: 'string',
                        example: "Admin=0035131"
                    },
                }
            },
            Task: {
                type: "object",
                properties: {
                    taskId: {
                        type: "string",
                        example: "1",
                        description: "ID de la tarea"
                    },
                    taskDescription: {
                        type: "string",
                        example: "Realizar mantenimiento preventivo en extintores",
                        description: "Descripción de la tarea"
                    },
                    taskStartNewExtinguisherCount: {
                        type: "integer",
                        example: 10,
                        description: "Cantidad inicial de extintores nuevos en la tarea"
                    },
                    taskStartRechargedExtinguisherCount: {
                        type: "integer",
                        example: 5,
                        description: "Cantidad inicial de extintores recargados en la tarea"
                    },
                    taskExpectedEndDate: {
                        type: "string",
                        format: "date",
                        example: "2024-02-22",
                        description: "Fecha esperada de finalización de la tarea"
                    },
                    clientId: {
                        type: "string",
                        example: "12345",
                        description: "ID del cliente asociado a la tarea"
                    },
                    buildingId: {
                        type: "string",
                        example: "67890",
                        description: "ID del edificio asociado a la tarea"
                    },
                    taskStateId: {
                        type: "string",
                        example: "2",
                        description: "ID del estado de la tarea"
                    },
                    assignedUser: {
                        type: "string",
                        example: "user123",
                        description: "Usuario asignado a la tarea"
                    },
                    taskCreator: {
                        type: "string",
                        example: "admin",
                        description: "Usuario que creó la tarea"
                    }
                }
            },
            NewTask: {
                type: "object",
                properties: {
                    taskDescription: {
                        type: "string",
                        example: "Realizar mantenimiento preventivo en extintores",
                        description: "Descripción de la tarea"
                    },
                    taskStartNewExtinguisherCount: {
                        type: "integer",
                        example: 10,
                        description: "Cantidad inicial de extintores nuevos en la tarea"
                    },
                    taskStartRechargedExtinguisherCount: {
                        type: "integer",
                        example: 5,
                        description: "Cantidad inicial de extintores recargados en la tarea"
                    },
                    taskExpectedEndDate: {
                        type: "string",
                        format: "date",
                        example: "2024-02-22",
                        description: "Fecha esperada de finalización de la tarea"
                    },
                    clientId: {
                        type: "string",
                        example: "12345",
                        description: "ID del cliente asociado a la tarea"
                    },
                    buildingId: {
                        type: "string",
                        example: "67890",
                        description: "ID del edificio asociado a la tarea"
                    },
                    taskExtinguishers: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                extinguisherTypeId: {
                                    type: "string",
                                    example: "abc123",
                                    description: "ID del tipo de extintor"
                                },
                                extinguisherSizeId: {
                                    type: "string",
                                    example: "def456",
                                    description: "ID del tamaño de extintor"
                                }
                            }
                        },
                        description: "Lista de extintores asociados a la tarea"
                    }
                },
                required: ["taskDescription", "taskStartNewExtinguisherCount", "taskStartRechargedExtinguisherCount", "taskExpectedEndDate", "clientId", "buildingId"]
            },
            UpdateTask: {
                type: "object",
                properties: {
                    taskId: {
                        type: "string",
                        example: "1",
                        description: "ID de la tarea a actualizar"
                    },
                    taskDescription: {
                        type: "string",
                        example: "Realizar mantenimiento correctivo en extintores",
                        description: "Nueva descripción de la tarea"
                    },
                    clientId: {
                        type: "string",
                        example: "54321",
                        description: "Nuevo ID del cliente asociado a la tarea"
                    },
                    buildingId: {
                        type: "string",
                        example: "09876",
                        description: "Nuevo ID del edificio asociado a la tarea"
                    },
                    taskEndDate: {
                        type: "string",
                        format: "date",
                        example: "2024-02-25",
                        description: "Nueva fecha de finalización de la tarea"
                    }
                }
            },
            AssignTask: {
                type: "object",
                properties: {
                    taskId: {
                        type: "string",
                        example: "1",
                        description: "ID de la tarea a asignar"
                    },
                    assignedUser: {
                        type: "string",
                        example: "user123",
                        description: "Usuario al que se asignará la tarea"
                    }
                },
                required: ["taskId", "assignedUser"]
            },
            ManageTask: {
                type: "object",
                properties: {
                    // Define los campos necesarios para el esquema "ManageTask"
                }
            },
            CancelTask: {
                type: "object",
                properties: {
                    taskId: {
                        type: "string",
                        example: "1",
                        description: "ID de la tarea a cancelar"
                    }
                },
                required: ["taskId"]
            },
            CompleteTask: {
                type: "object",
                properties: {
                    taskId: {
                        type: "string",
                        example: "1",
                        description: "ID de la tarea a marcar como completada"
                    }
                },
                required: ["taskId"]
            },
            ReportTask: {
                type: "object",
                properties: {
                    taskId: {
                        type: "string",
                        example: "1",
                        description: "ID de la tarea a reportar"
                    }
                },
                required: ["taskId"]
            },
            ExportTaskXLSX: {
                type: "object",
                properties: {
                    startDate: {
                        type: "string",
                        format: "date",
                        example: "2024-02-01",
                        description: "Fecha de inicio del rango para exportar tareas"
                    },
                    finalDate: {
                        type: "string",
                        format: "date",
                        example: "2024-02-15",
                        description: "Fecha final del rango para exportar tareas"
                    }
                },
                required: ["startDate", "finalDate"]
            },
            ExportTaskPDF: {
                type: "object",
                properties: {
                    startDate: {
                        type: "string",
                        format: "date",
                        example: "2024-02-01",
                        description: "Fecha de inicio del rango para exportar tareas"
                    },
                    finalDate: {
                        type: "string",
                        format: "date",
                        example: "2024-02-15",
                        description: "Fecha final del rango para exportar tareas"
                    }
                },
                required: ["startDate", "finalDate"]
            }

        }
    },
    paths: {
        /**
         ** AUTH
         */
        "/api/auth/authUser": {
            post: {
                tags: ["Authenticación - Auth"],
                summary: "Auth User",
                description: "En este endpoint se validan las credenciales del usuario y dedvuelve la información del usuario ingresado y un token de acceso a la aplicación",
                operationId: "authUser",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                // $ref: '#/components/schemas/authUser',
                                required: ['username', 'password'],
                                properties: {
                                    username: {
                                        type: "string",
                                        example: 'admin',
                                        description: 'Nombre de usuario almacenado en el sistema'
                                    },
                                    password: {
                                        type: "string",
                                        example: "Admin123!",
                                        description: 'Contraseña del usuario'
                                    }
                                }
                            },
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Autenticación exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true,
                                            description: "Indica si la autenticación fue exitosa"
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Loggin correcto",
                                            description: "Mensaje de éxito"
                                        },
                                        accessToken: {
                                            type: "string",
                                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6MTAzMCwiaWF0IjoxNjk0MzgxMjMzfQ.ifrMnWKZTb47ch3Qvqr7ExB8W42KhIr8PyRemx1RFnI",
                                            description: "Token de acceso para autenticación futura"
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                userId: {
                                                    type: "integer",
                                                    example: 1030,
                                                    description: "ID del usuario autenticado"
                                                },
                                                userEmail: {
                                                    type: "string",
                                                    example: "admin@admin.com",
                                                    description: "Dirección de correo electrónico del usuario"
                                                },
                                                userImage: {
                                                    type: "string",
                                                    example: "No-Url-user",
                                                    description: "URL de la imagen del usuario"
                                                },
                                                userState: {
                                                    type: "boolean",
                                                    example: true,
                                                    description: "Estado del usuario"
                                                },
                                                userAddress: {
                                                    type: "object",
                                                    properties: {
                                                        zipCode: {
                                                            type: "string",
                                                            example: "12345",
                                                            description: "Código postal de la dirección del usuario"
                                                        },
                                                        cityName: {
                                                            type: "string",
                                                            example: "Autauga",
                                                            description: "Nombre de la ciudad de la dirección del usuario"
                                                        },
                                                        stateName: {
                                                            type: "string",
                                                            example: "Alabama",
                                                            description: "Nombre del estado de la dirección del usuario"
                                                        },
                                                        streetName: {
                                                            type: "string",
                                                            example: "Dary street",
                                                            description: "Nombre de la calle de la dirección del usuario"
                                                        },
                                                        addressBorough: {
                                                            type: "string",
                                                            example: "Ciudad Ejemplo",
                                                            description: "Barrio de la dirección del usuario"
                                                        },
                                                        accommodationType: {
                                                            type: "string",
                                                            example: "Casa",
                                                            description: "Tipo de alojamiento del usuario"
                                                        }
                                                    }
                                                },
                                                userLastName: {
                                                    type: "string",
                                                    example: "Apellido",
                                                    description: "Apellido del usuario"
                                                },
                                                userUsername: {
                                                    type: "string",
                                                    example: "admin",
                                                    description: "Nombre de usuario del usuario"
                                                },
                                                agentCofNumber: {
                                                    type: "string",
                                                    example: null,
                                                    description: "Número de agente (puede ser nulo)"
                                                },
                                                userPermissions: {
                                                    type: "object",
                                                    properties: {
                                                        taskPermission: {
                                                            type: "boolean",
                                                            example: true,
                                                            description: "Permiso de tareas"
                                                        },
                                                        userPermission: {
                                                            type: "boolean",
                                                            example: true,
                                                            description: "Permiso de usuario"
                                                        },
                                                        clientPermission: {
                                                            type: "boolean",
                                                            example: true,
                                                            description: "Permiso de cliente"
                                                        },
                                                        auditLogPermission: {
                                                            type: "boolean",
                                                            example: true,
                                                            description: "Permiso de registro de auditoría"
                                                        },
                                                        reportTaskPermission: {
                                                            type: "boolean",
                                                            example: true,
                                                            description: "Permiso de informe de tareas"
                                                        },
                                                        organizationPermission: {
                                                            type: "boolean",
                                                            example: true,
                                                            description: "Permiso de organización"
                                                        }
                                                    }
                                                },
                                                userPhoneNumber: {
                                                    type: "string",
                                                    example: "3044283568",
                                                    description: "Número de teléfono del usuario"
                                                },
                                                userCreationDate: {
                                                    type: "string",
                                                    example: "2023-07-24",
                                                    description: "Fecha de creación de la cuenta del usuario"
                                                },
                                                userRequirePasswordChange: {
                                                    type: "boolean",
                                                    example: false,
                                                    description: "Indica si el usuario necesita cambiar su contraseña"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    401: {
                        description: "Autenticación fallida",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false,
                                            description: "Indica si la autenticación falló"
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string",
                                                        example: "La contraseña es incorrecta",
                                                        description: "Mensaje de error"
                                                    },
                                                    path: {
                                                        type: "string",
                                                        example: "password",
                                                        description: "Camino del error"
                                                    }
                                                }
                                            },
                                            description: "Lista de errores de autenticación"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false,
                                            description: "Indica si la solicitud fue incorrecta"
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string",
                                                        example: "El usuario con username 'admin1' no existe.",
                                                        description: "Mensaje de error"
                                                    },
                                                    path: {
                                                        type: "string",
                                                        example: "usuario",
                                                        description: "Camino del error"
                                                    }
                                                }
                                            },
                                            description: "Lista de errores de la solicitud"
                                        }
                                    }
                                }
                            }
                        }
                    }


                }
            }
        },
        "/api/auth/userInfo": {
            post: {
                tags: ["Authenticación - Auth"],
                summary: "User Info",
                description: "En este endpoint se validan las credenciales del usuario y dedvuelve la información del usuario ingresado",
                operationId: "userInfo",
                parameters: [
                    {
                        name: 'accessToken',
                        in: 'header',
                        schema: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6MTAzMCwiaWF0IjoxNjk0MzcyMjMxfQ.3G-pLAYaX4PFFOIp7grDd6jaIIpwv9FE7UzeANUj1Kw'
                        },
                        description: 'Token de acceso del susuario'
                    },
                ],
                responses: {
                    200: {
                        description: "Token verificado",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true,
                                            description: "Indica si el token se verificó correctamente"
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Token verificado",
                                            description: "Mensaje de verificación exitosa"
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                userId: {
                                                    type: "integer",
                                                    example: 1030,
                                                    description: "ID del usuario autenticado"
                                                },
                                                userEmail: {
                                                    type: "string",
                                                    example: "admin@admin.com",
                                                    description: "Dirección de correo electrónico del usuario"
                                                },
                                                userImage: {
                                                    type: "string",
                                                    example: "No-Url-user",
                                                    description: "URL de la imagen del usuario"
                                                },
                                                userState: {
                                                    type: "boolean",
                                                    example: true,
                                                    description: "Estado del usuario"
                                                },
                                                userAddress: {
                                                    type: "object",
                                                    properties: {
                                                        zipCode: {
                                                            type: "string",
                                                            example: "12345",
                                                            description: "Código postal de la dirección del usuario"
                                                        },
                                                        cityName: {
                                                            type: "string",
                                                            example: "Autauga",
                                                            description: "Nombre de la ciudad de la dirección del usuario"
                                                        },
                                                        stateName: {
                                                            type: "string",
                                                            example: "Alabama",
                                                            description: "Nombre del estado de la dirección del usuario"
                                                        },
                                                        streetName: {
                                                            type: "string",
                                                            example: "Dary street",
                                                            description: "Nombre de la calle de la dirección del usuario"
                                                        },
                                                        addressBorough: {
                                                            type: "string",
                                                            example: "Ciudad Ejemplo",
                                                            description: "Barrio de la dirección del usuario"
                                                        },
                                                        accommodationType: {
                                                            type: "string",
                                                            example: "Casa",
                                                            description: "Tipo de alojamiento del usuario"
                                                        }
                                                    }
                                                },
                                                userLastName: {
                                                    type: "string",
                                                    example: "Apellido",
                                                    description: "Apellido del usuario"
                                                },
                                                userUsername: {
                                                    type: "string",
                                                    example: "admin",
                                                    description: "Nombre de usuario del usuario"
                                                },
                                                agentCofNumber: {
                                                    type: "string",
                                                    example: null,
                                                    description: "Número de agente (puede ser nulo)"
                                                },
                                                userPermissions: {
                                                    type: "object",
                                                    properties: {
                                                        taskPermission: {
                                                            type: "boolean",
                                                            example: true,
                                                            description: "Permiso de tareas"
                                                        },
                                                        userPermission: {
                                                            type: "boolean",
                                                            example: true,
                                                            description: "Permiso de usuario"
                                                        },
                                                        clientPermission: {
                                                            type: "boolean",
                                                            example: true,
                                                            description: "Permiso de cliente"
                                                        },
                                                        auditLogPermission: {
                                                            type: "boolean",
                                                            example: true,
                                                            description: "Permiso de registro de auditoría"
                                                        },
                                                        reportTaskPermission: {
                                                            type: "boolean",
                                                            example: true,
                                                            description: "Permiso de informe de tareas"
                                                        },
                                                        organizationPermission: {
                                                            type: "boolean",
                                                            example: true,
                                                            description: "Permiso de organización"
                                                        }
                                                    }
                                                },
                                                userPhoneNumber: {
                                                    type: "string",
                                                    example: "3044283568",
                                                    description: "Número de teléfono del usuario"
                                                },
                                                userCreationDate: {
                                                    type: "string",
                                                    example: "2023-07-24",
                                                    description: "Fecha de creación de la cuenta del usuario"
                                                },
                                                userRequirePasswordChange: {
                                                    type: "boolean",
                                                    example: false,
                                                    description: "Indica si el usuario necesita cambiar su contraseña"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false,
                                            description: "Indica si la solicitud fue incorrecta"
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string",
                                                        example: "Error, Access Token es obligatorio",
                                                        description: "Mensaje de error"
                                                    },
                                                    path: {
                                                        type: "string",
                                                        example: "Access Token",
                                                        description: "Camino del error"
                                                    }
                                                }
                                            },
                                            description: "Lista de errores de la solicitud"
                                        }
                                    }
                                }
                            }
                        }
                    }

                    ,
                    401: {
                        description: "Acceso no autorizado",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false,
                                            description: "Indica si el acceso no está autorizado"
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string",
                                                        example: "Error, Access Token inválido",
                                                        description: "Mensaje de error"
                                                    },
                                                    path: {
                                                        type: "string",
                                                        example: "Access Token",
                                                        description: "Camino del error"
                                                    }
                                                }
                                            },
                                            description: "Lista de errores de acceso no autorizado"
                                        }
                                    }
                                }
                            }
                        }
                    }

                }
            }
        },
        "/api/auth/forgotPassword": {
            post: {
                tags: ["Authenticación - Auth"],
                summary: "Forgot Password",
                description: "En este endpoint se valida el correo electronico del usuario y se envia un enlace de recuperacion de contraseña. ('Solo sirve para usuarios activos').",
                operationId: "forgotPassword",
                // parameters: [{
                //     name: 'accessToken',
                //     in: 'header',
                //     schema: {
                //         type: 'string',
                //     },
                //     description: 'Token de acceso del susuario'
                // }],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ['email'],
                                // $ref: '#/components/schemas/user',
                                properties: {
                                    email: {
                                        type: "string",
                                        example: '202331ed@gmail.com',
                                        description: 'correo del usuario al que se desea recuperar la contraseña.'
                                    }
                                }
                            },
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Correo de recuperación enviado correctamente",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true,
                                            description: "Indica si el correo de recuperación se envió correctamente"
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Correo de recuperación enviado correctamente a 202331ed@gmail.com",
                                            description: "Mensaje de éxito"
                                        },
                                        recoveryToken: {
                                            type: "string",
                                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6IjIwMjMzMWVkQGdtYWlsLmNvbSIsImlhdCI6MTY5NDM4MjAwN30.1SEiYmQsG3zB6cinu2FcGVe4YU8lW5OzbjVV2XRE5gw",
                                            description: "Token de recuperación"
                                        }
                                    }
                                }
                            }
                        }
                    }
                    ,
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false,
                                            description: "Indica si la solicitud fue incorrecta"
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string",
                                                        example: "No existe un usuario registrado con el correo 20233s1ed@gmail.com",
                                                        description: "Mensaje de error"
                                                    },
                                                    path: {
                                                        type: "string",
                                                        example: "email",
                                                        description: "Camino del error"
                                                    }
                                                }
                                            },
                                            description: "Lista de errores de la solicitud"
                                        }
                                    }
                                }
                            }
                        }
                    },

                }
            }
        },
        "/api/auth/updatePassword": {
            post: {
                tags: ["Authenticación - Auth"],
                summary: "Update Password",
                description: "En este endpoint se actualiza la contraseña del usuario medieante el recoveryToken enviado al correo del usuario que solicitó el cmabio de contraseña.",
                operationId: "updatePassword",
                parameters: [
                    // {
                    //     name: 'accessToken',
                    //     in: 'header',
                    //     schema: {
                    //         type: 'string',
                    //     },
                    //     description: 'Token de acceso del usuario'
                    // },
                    {
                        name: 'recoveryToken',
                        in: 'query',
                        schema: {
                            type: 'string',
                        },
                        description: 'Token de recuperación del usuario'
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ['newPassword'],
                                // $ref: '#/components/schemas/user',
                                properties: {
                                    newPassword: {
                                        type: "string",
                                        example: 'Admin=00351314',
                                        description: 'Criterios de seguridad: Mínimo 8 caracteres, mínimo 1 mayúscula, mínimo 1 minúscula, mínimo un número y mínimo un carácter especial (=;:+.-_/%*#@!).'
                                    },
                                    // oldPassword: {
                                    //     type: "string",
                                    //     example: '<Contraseña antigüa del usuario>',
                                    //     description: 'Se solicita la contraseña antigüa en caso de que el usuario decida cambiar la contraseña mediante el accessToken y se valida la concordancia de esta (Actualmente no se está previsto usar esta funcionalidad).'
                                    // },
                                }
                            },
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Contraseña actualizada correctamente"
                    },
                    400: {
                        description: "La contraseña no cumple con los requisitos de seguridad"
                    },
                    401: {
                        description: "La contraseña actual no coincide con la almacenada"
                    },
                }
            }
        },
        "/api/auth/updateOrganization": {
            put: {
                tags: ["Authenticación - Auth"],
                summary: "Actualizar datos de la organización",
                description: "Permite actualizar los datos de la organización.",
                operationId: "updateOrganization",
                parameters: [
                    {
                        name: 'accessToken',
                        in: 'header',
                        schema: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6MTAzMCwiaWF0IjoxNjk0MzcyMjMxfQ.3G-pLAYaX4PFFOIp7grDd6jaIIpwv9FE7UzeANUj1Kw'
                        },
                        description: 'Token de acceso del susuario'
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    organization_name: {
                                        type: "string",
                                        example: "Nombre de la organización",
                                        description: "Nombre de la organización"
                                    },
                                    organization_license: {
                                        type: "string",
                                        example: "Licencia de la organización",
                                        description: "Licencia de la organización"
                                    },
                                    organization_license_aproval_date: {
                                        type: "string",
                                        example: "2023-12-12",
                                        description: "Fecha de aprobación de la licencia de la organización (opcional)"
                                    },
                                    organization_license_expiration_date: {
                                        type: "string",
                                        example: "2023-12-31",
                                        description: "Fecha de vencimiento de la licencia de la organización (opcional)"
                                    },
                                    organization_email: {
                                        type: "string",
                                        example: "correo@ejemplo.com",
                                        description: "Correo electrónico de la organización"
                                    },
                                    organization_address: {
                                        type: "string",
                                        example: "Dirección de la organización",
                                        description: "Dirección de la organización"
                                    },
                                    organization_street_name: {
                                        type: "string",
                                        example: "Nombre de la calle",
                                        description: "Nombre de la calle de la organización"
                                    },
                                    organization_city: {
                                        type: "string",
                                        example: "Ciudad de la organización",
                                        description: "Ciudad de la organización"
                                    },
                                    organization_zip_code: {
                                        type: "string",
                                        example: "12345",
                                        description: "Código postal de la organización (con formato xxxxx o xxxxx-xxxx)"
                                    }
                                },
                                required: [],
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Datos de la organización actualizados",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true,
                                            description: "Indica si los datos de la organización se actualizaron con éxito"
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Organization Data Updated",
                                            description: "Mensaje de éxito"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false,
                                            description: "Indica si la solicitud fue incorrecta"
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string",
                                                        description: "Mensaje de error"
                                                    },
                                                    path: {
                                                        type: "string",
                                                        description: "Camino del error"
                                                    }
                                                }
                                            },
                                            description: "Lista de errores de la solicitud"
                                        }
                                    }
                                },
                                example: {
                                    success: false,
                                    errors: [
                                        {
                                            msg: "El organization_city es obligatorio",
                                            path: "organization_city"
                                        },
                                        {
                                            msg: "El organization_name es obligatorio",
                                            path: "organization_name"
                                        },
                                        {
                                            msg: "El organization_email no es un email válido",
                                            path: "organization_email"
                                        },
                                        {
                                            msg: "El organization_address es obligatorio",
                                            path: "organization_address"
                                        },
                                        {
                                            msg: "El organization_license es obligatorio",
                                            path: "organization_license"
                                        },
                                        {
                                            msg: "Ingrese un zip code válido",
                                            path: "organization_zip_code"
                                        },
                                        {
                                            msg: "El organization_street_name es obligatorio",
                                            path: "organization_street_name"
                                        },
                                        {
                                            msg: "La fecha no cumple el formato correcto 'AAAA-MM-DD'",
                                            path: "organization_license_aproval_date"
                                        },
                                        {
                                            msg: "La fecha no cumple el formato correcto 'AAAA-MM-DD'",
                                            path: "organization_license_expiration_date"
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        },
        /**
         ** CLiente
         */
        "/api/client/createClient": {
            post: {
                tags: ["Clients - Client"],
                summary: "Crear un cliente",
                description: "Permite crear un nuevo cliente.",
                operationId: "createClient",
                parameters: [
                    {
                        name: 'accessToken',
                        in: 'header',
                        schema: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6MTAzMCwiaWF0IjoxNjk0MzcyMjMxfQ.3G-pLAYaX4PFFOIp7grDd6jaIIpwv9FE7UzeANUj1Kw'
                        },
                        description: 'Token de acceso del susuario'
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    streetName: {
                                        type: "string",
                                        example: "Nombre de la Calle",
                                        description: "Nombre de la calle (obligatorio)"
                                    },
                                    accommodationType: {
                                        type: "string",
                                        example: "Tipo de Alojamiento",
                                        description: "Tipo de alojamiento (obligatorio)"
                                    },
                                    addressCity: {
                                        type: "string",
                                        example: "Ciudad",
                                        description: "Ciudad (obligatorio)"
                                    },
                                    zipCode: {
                                        type: "integer",
                                        example: 12345,
                                        description: "Código postal (obligatorio)"
                                    },
                                    clientName: {
                                        type: "string",
                                        example: "Ludycom - sass",
                                        description: "Nombre del cliente (obligatorio)"
                                    },
                                    stateId: {
                                        type: "integer",
                                        example: 1000,
                                        description: "ID del estado (obligatorio)"
                                    },
                                    clientTagId: {
                                        type: "string",
                                        example: "",
                                        description: "ID de etiqueta del cliente (opcional)"
                                    },
                                    boroughId: {
                                        type: "integer",
                                        example: 1066,
                                        description: "ID del municipio (obligatorio)"
                                    }
                                },
                                required: [
                                    "streetName",
                                    "accommodationType",
                                    "addressCity",
                                    "zipCode",
                                    "clientName",
                                    "stateId",
                                    "boroughId"
                                ]
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Cliente creado",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true,
                                            description: "Indica si el cliente se creó con éxito"
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Client created",
                                            description: "Mensaje de éxito"
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                clientId: {
                                                    type: "integer",
                                                    example: 1017,
                                                    description: "ID del cliente"
                                                },
                                                clientName: {
                                                    type: "string",
                                                    example: "New Client 09/10",
                                                    description: "Nombre del cliente"
                                                },
                                                clientState: {
                                                    type: "integer",
                                                    example: 1,
                                                    description: "Estado del cliente"
                                                },
                                                clientTagId: {
                                                    type: "string",
                                                    example: "tag-id",
                                                    description: "ID de etiqueta del cliente"
                                                },
                                                clientAddress: {
                                                    type: "object",
                                                    properties: {
                                                        zipCode: {
                                                            type: "string",
                                                            example: "12345",
                                                            description: "Código postal"
                                                        },
                                                        cityName: {
                                                            type: "string",
                                                            example: "Winston",
                                                            description: "Nombre de la ciudad"
                                                        },
                                                        stateName: {
                                                            type: "string",
                                                            example: "Alabama",
                                                            description: "Nombre del estado"
                                                        },
                                                        streetName: {
                                                            type: "string",
                                                            example: "Nombre de la Calle",
                                                            description: "Nombre de la calle"
                                                        },
                                                        addressBorough: {
                                                            type: "string",
                                                            example: "Ciudad",
                                                            description: "Nombre del municipio"
                                                        },
                                                        accommodationType: {
                                                            type: "string",
                                                            example: "Tipo de Alojamiento",
                                                            description: "Tipo de alojamiento"
                                                        }
                                                    }
                                                },
                                                clientContacts: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {
                                                            contactId: {
                                                                type: "integer",
                                                                description: "ID del contacto"
                                                            },
                                                            contactName: {
                                                                type: "object",
                                                                properties: {
                                                                    contactLastName: {
                                                                        type: "string",
                                                                        description: "Apellido del contacto"
                                                                    },
                                                                    contactFirstName: {
                                                                        type: "string",
                                                                        description: "Nombre del contacto"
                                                                    }
                                                                }
                                                            },
                                                            contactEmails: {
                                                                type: "array",
                                                                items: {
                                                                    type: "string",
                                                                    description: "Lista de correos electrónicos del contacto"
                                                                }
                                                            },
                                                            contactPhoneNumbers: {
                                                                type: "array",
                                                                items: {
                                                                    type: "string",
                                                                    description: "Lista de números de teléfono del contacto"
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                clientCreationDate: {
                                                    type: "string",
                                                    example: "2023-09-11",
                                                    description: "Fecha de creación del cliente"
                                                },
                                                clientBuildingCount: {
                                                    type: "integer",
                                                    example: 0,
                                                    description: "Cantidad de edificios del cliente"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false,
                                            description: "Indica si la solicitud fue incorrecta"
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string",
                                                        description: "Mensaje de error"
                                                    },
                                                    path: {
                                                        type: "string",
                                                        description: "Camino del error"
                                                    }
                                                }
                                            },
                                            description: "Lista de errores de la solicitud"
                                        }
                                    }
                                },
                                example: {
                                    success: false,
                                    errors: [
                                        {
                                            msg: "El clientTagId no puede estar vacío",
                                            path: "clientTagId"
                                        },
                                        {
                                            msg: "El streetName es obligatorio",
                                            path: "streetName"
                                        },
                                        {
                                            msg: "El accommodationType es obligatorio",
                                            path: "accommodationType"
                                        },
                                        {
                                            msg: "El addressCity es obligatorio",
                                            path: "addressCity"
                                        },
                                        {
                                            msg: "Ingrese un zip code válido",
                                            path: "zipCode"
                                        },
                                        {
                                            msg: "El clientName es obligatorio",
                                            path: "clientName"
                                        },
                                        {
                                            msg: "El stateId es obligatorio",
                                            path: "stateId"
                                        },
                                        {
                                            msg: "El boroughId es obligatorio",
                                            path: "boroughId"
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/client/createClientContact": {
            post: {
                tags: ["Clients - Client"],
                summary: "Crear un contacto de cliente",
                description: "Permite crear un nuevo contacto para un cliente existente.",
                operationId: "createClientContact",
                parameters: [
                    {
                        name: 'accessToken',
                        in: 'header',
                        schema: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6MTAzMCwiaWF0IjoxNjk0MzcyMjMxfQ.3G-pLAYaX4PFFOIp7grDd6jaIIpwv9FE7UzeANUj1Kw'
                        },
                        description: 'Token de acceso del susuario'
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    clientId: {
                                        type: "integer",
                                        example: 1017,
                                        description: "ID del cliente (obligatorio)"
                                    },
                                    contactFirstName: {
                                        type: "string",
                                        example: "Nombre De Contacto",
                                        description: "Nombre del contacto (obligatorio)"
                                    },
                                    contactLastName: {
                                        type: "string",
                                        example: "Apellido De Contacto",
                                        description: "Apellido del contacto (obligatorio)"
                                    }
                                },
                                required: ["clientId", "contactFirstName", "contactLastName"]
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Contacto de cliente creado",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true,
                                            description: "Indica si el contacto se creó con éxito"
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Respuesta del enpoint de creación del contacto del cliente",
                                            description: "Mensaje de éxito"
                                        },
                                        response: {
                                            type: "string",
                                            example: "Client Contact created",
                                            description: "Mensaje de respuesta"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false,
                                            description: "Indica si la solicitud fue incorrecta"
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string",
                                                        description: "Mensaje de error"
                                                    },
                                                    path: {
                                                        type: "string",
                                                        description: "Camino del error"
                                                    }
                                                }
                                            },
                                            description: "Lista de errores de la solicitud"
                                        }
                                    },
                                    example: {
                                        success: false,
                                        errors: [
                                            {
                                                msg: "El clientId es obligatorio",
                                                path: "clientId"
                                            },
                                            {
                                                msg: "El contactFirstName es obligatorio",
                                                path: "contactFirstName"
                                            },
                                            {
                                                msg: "Ingrese un valor tipo string",
                                                path: "contactFirstName"
                                            },
                                            {
                                                msg: "El contactLastName es obligatorio",
                                                path: "contactLastName"
                                            },
                                            {
                                                msg: "Ingrese un valor tipo string",
                                                path: "contactLastName"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/client/createClientBuilding": {
            post: {
                tags: ["Clients - Client"],
                summary: "Crear un edificio de cliente",
                description: "Permite crear un nuevo edificio para un cliente existente.",
                operationId: "createClientBuilding",
                parameters: [
                    {
                        name: 'accessToken',
                        in: 'header',
                        schema: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6MTAzMCwiaWF0IjoxNjk0MzcyMjMxfQ.3G-pLAYaX4PFFOIp7grDd6jaIIpwv9FE7UzeANUj1Kw'
                        },
                        description: 'Token de acceso del susuario'
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    clientId: {
                                        type: "integer",
                                        example: 1017,
                                        description: "ID del cliente (obligatorio)"
                                    },
                                    buildingName: {
                                        type: "string",
                                        example: "Ejemplo Building",
                                        description: "Nombre del edificio (obligatorio)"
                                    },
                                    buildingFloors: {
                                        type: "string",
                                        example: "1000",
                                        description: "Número de pisos (obligatorio)"
                                    },
                                    buildingSurfaceSquareMeters: {
                                        type: "number",
                                        example: 1000.45,
                                        description: "Superficie en metros cuadrados (obligatorio)"
                                    },
                                    buildingTypeId: {
                                        type: "integer",
                                        example: 1003,
                                        description: "ID del tipo de edificio (obligatorio)"
                                    },
                                    streetName: {
                                        type: "string",
                                        example: "123 Main St",
                                        description: "Nombre de la calle (obligatorio)"
                                    },
                                    accommodationType: {
                                        type: "string",
                                        example: "Apartment",
                                        description: "Tipo de alojamiento (obligatorio)"
                                    },
                                    addressBorough: {
                                        type: "string",
                                        example: "Example City",
                                        description: "Distrito (obligatorio)"
                                    },
                                    zipCode: {
                                        type: "string",
                                        example: "12345-1233",
                                        description: "Código postal (obligatorio, debe ser válido)"
                                    },
                                    stateId: {
                                        type: "integer",
                                        example: 1000,
                                        description: "ID del estado (obligatorio)"
                                    },
                                    boroughId: {
                                        type: "integer",
                                        example: 1002,
                                        description: "ID del distrito (obligatorio)"
                                    }
                                },
                                required: ["clientId", "buildingName", "buildingFloors", "buildingSurfaceSquareMeters", "buildingTypeId", "streetName", "accommodationType", "addressBorough", "zipCode", "stateId", "boroughId"]
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Edificio de cliente creado",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true,
                                            description: "Indica si el edificio se creó con éxito"
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Client Building Contact Created",
                                            description: "Mensaje de éxito"
                                        },
                                        response: {
                                            type: "string",
                                            example: "Client Building created",
                                            description: "Mensaje de respuesta"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false,
                                            description: "Indica si la solicitud fue incorrecta"
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string",
                                                        description: "Mensaje de error"
                                                    },
                                                    path: {
                                                        type: "string",
                                                        description: "Camino del error"
                                                    }
                                                }
                                            },
                                            description: "Lista de errores de la solicitud"
                                        }
                                    },
                                    example: {
                                        success: false,
                                        errors: [
                                            {
                                                msg: "El clientId es obligatorio",
                                                path: "clientId"
                                            },
                                            {
                                                msg: "El building_name debe ser una cadena de texto",
                                                path: "buildingName"
                                            },
                                            {
                                                msg: "El building_name debe tener al menos 8 caracteres",
                                                path: "buildingName"
                                            },
                                            {
                                                msg: "El buildingFloors debe ser un número (1-167)",
                                                path: "buildingFloors"
                                            },
                                            {
                                                msg: "El buildingSurfaceSquareMeters debe ser un valor numérico",
                                                path: "buildingSurfaceSquareMeters"
                                            },
                                            {
                                                msg: "El buildingSurfaceSquareMeters es obligatorio",
                                                path: "buildingSurfaceSquareMeters"
                                            },
                                            {
                                                msg: "Solo se permiten valores numéricos",
                                                path: "buildingTypeId"
                                            },
                                            {
                                                msg: "El fecdb_buildingTypeId es obligatorio",
                                                path: "buildingTypeId"
                                            },
                                            {
                                                msg: "El streetName debe ser una cadena de texto",
                                                path: "streetName"
                                            },
                                            {
                                                msg: "El streetName debe tener al menos 8 caracteres",
                                                path: "streetName"
                                            },
                                            {
                                                msg: "El accommodationType debe ser una cadena de texto",
                                                path: "accommodationType"
                                            },
                                            {
                                                msg: "El accommodationType debe tener al menos 8 caracteres",
                                                path: "accommodationType"
                                            },
                                            {
                                                msg: "El addressBorough debe ser una cadena de texto",
                                                path: "addressBorough"
                                            },
                                            {
                                                msg: "El addressBorough debe tener al menos 8 caracteres",
                                                path: "addressBorough"
                                            },
                                            {
                                                msg: "El zipCode no es válido",
                                                path: "zipCode"
                                            },
                                            {
                                                msg: "El stateId es obligatorio",
                                                path: "stateId"
                                            },
                                            {
                                                msg: "El cityId es obligatorio",
                                                path: "cityId"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/client/updateClient": {
            put: {
                tags: ["Clients - Client"],
                summary: "Actualizar información de cliente",
                description: "Permite actualizar la información de un cliente existente.",
                operationId: "updateClient",
                parameters: [
                    {
                        name: 'accessToken',
                        in: 'header',
                        schema: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6MTAzMCwiaWF0IjoxNjk0MzcyMjMxfQ.3G-pLAYaX4PFFOIp7grDd6jaIIpwv9FE7UzeANUj1Kw'
                        },
                        description: 'Token de acceso del susuario'
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    clientId: {
                                        type: "integer",
                                        example: 1017,
                                        description: "ID del cliente (obligatorio)"
                                    },
                                    clientName: {
                                        type: "string",
                                        example: "New name",
                                        description: "Nombre del cliente"
                                    },
                                    clientTagId: {
                                        type: "string",
                                        example: null,
                                        description: "ID de la etiqueta del cliente"
                                    },
                                    streetName: {
                                        type: "string",
                                        example: "street name",
                                        description: "Nombre de la calle"
                                    },
                                    accommodationType: {
                                        type: "string",
                                        example: "Acomodation type",
                                        description: "Tipo de alojamiento"
                                    },
                                    addressBorough: {
                                        type: "string",
                                        example: "",
                                        description: "Distrito"
                                    },
                                    zipCode: {
                                        type: "string",
                                        example: "12345",
                                        description: "Código postal"
                                    },
                                    stateId: {
                                        type: "integer",
                                        example: 1000,
                                        description: "ID del estado"
                                    },
                                    cityId: {
                                        type: "integer",
                                        example: 1001,
                                        description: "ID de la ciudad"
                                    }
                                },
                                required: ["clientId"]
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Cliente actualizado",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true,
                                            description: "Indica si el cliente se actualizó con éxito"
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Client Updated",
                                            description: "Mensaje de éxito"
                                        },
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false,
                                            description: "Indica si la solicitud fue incorrecta"
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string",
                                                        description: "Mensaje de error"
                                                    },
                                                    path: {
                                                        type: "string",
                                                        description: "Camino del error"
                                                    }
                                                }
                                            },
                                            description: "Lista de errores de la solicitud"
                                        }
                                    },
                                    example: {
                                        success: false,
                                        errors: [
                                            {
                                                msg: "El clientId es obligatorio",
                                                path: "clientId"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/client/updateClientContact": {
            put: {
                tags: ["Clients - Client"],
                summary: "Actualizar información de contacto de cliente",
                description: "Permite actualizar la información de contacto de un cliente existente.",
                operationId: "updateClientContact",
                parameters: [
                    {
                        name: 'accessToken',
                        in: 'header',
                        schema: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6MTAzMCwiaWF0IjoxNjk0MzcyMjMxfQ.3G-pLAYaX4PFFOIp7grDd6jaIIpwv9FE7UzeANUj1Kw'
                        },
                        description: 'Token de acceso del susuario'
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    clientId: {
                                        type: "integer",
                                        example: "1000",
                                        description: "ID del cliente"
                                    },
                                    contactId: {
                                        type: "integer",
                                        example: 1002,
                                        description: "ID del contacto"
                                    },
                                    contactFirstName: {
                                        type: "string",
                                        example: "Busqueda",
                                        description: "Nombre del contacto"
                                    },
                                    contactLastName: {
                                        type: "string",
                                        example: "Diaz",
                                        description: "Apellido del contacto"
                                    },
                                    addEmails: {
                                        type: "array",
                                        items: {
                                            type: "string",
                                            example: "test@test.test",
                                            description: "Nuevos correos electrónicos para agregar al contacto"
                                        },
                                        description: "Correos electrónicos para agregar"
                                    },
                                    addNumbers: {
                                        type: "array",
                                        items: {
                                            type: "string",
                                            example: "3244286233",
                                            description: "Nuevos números de teléfono para agregar al contacto"
                                        },
                                        description: "Números de teléfono para agregar"
                                    },
                                    deleteEmails: {
                                        type: "array",
                                        items: {
                                            type: "string",
                                            example: "test@test.test",
                                            description: "Correos electrónicos para eliminar del contacto"
                                        },
                                        description: "Correos electrónicos para eliminar"
                                    },
                                    deleteNumbers: {
                                        type: "array",
                                        items: {
                                            type: "string",
                                            example: "3244283223",
                                            description: "Números de teléfono para eliminar del contacto"
                                        },
                                        description: "Números de teléfono para eliminar"
                                    },
                                    updateEmails: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                oldEmail: {
                                                    type: "string",
                                                    example: "11111@111.111111",
                                                    description: "Correo electrónico antiguo"
                                                },
                                                newEmail: {
                                                    type: "string",
                                                    example: "test@test.com",
                                                    description: "Nuevo correo electrónico"
                                                }
                                            },
                                            description: "Correos electrónicos para actualizar"
                                        },
                                        description: "Correos electrónicos para actualizar"
                                    },
                                    updateNumbers: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                oldNumber: {
                                                    type: "string",
                                                    example: "3244286233",
                                                    description: "Número de teléfono antiguo"
                                                },
                                                newNumber: {
                                                    type: "string",
                                                    example: "1111111111",
                                                    description: "Nuevo número de teléfono"
                                                }
                                            },
                                            description: "Números de teléfono para actualizar"
                                        },
                                        description: "Números de teléfono para actualizar"
                                    }
                                },
                                required: ["clientId", "contactId",]
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Contacto de cliente actualizado",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true,
                                            description: "Indica si el contacto del cliente se actualizó con éxito"
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Respuesta del enpoint de creación del contacto del cliente",
                                            description: "Mensaje de éxito"
                                        },
                                        response: {
                                            type: "string",
                                            example: "Respuesta de la Api",
                                            description: "Respuesta de la API"
                                        },
                                        client: {
                                            type: "object",
                                            properties: {
                                                clientId: {
                                                    type: "integer",
                                                    example: 1000,
                                                    description: "ID del cliente"
                                                },
                                                clientName: {
                                                    type: "string",
                                                    example: "Esteban",
                                                    description: "Nombre del cliente"
                                                },
                                                clientState: {
                                                    type: "integer",
                                                    example: 1,
                                                    description: "Estado del cliente"
                                                },
                                                clientTagId: {
                                                    type: "string",
                                                    example: null,
                                                    description: "ID de la etiqueta del cliente"
                                                },
                                                clientAddress: {
                                                    type: "object",
                                                    properties: {
                                                        zipCode: {
                                                            type: "string",
                                                            example: "12345",
                                                            description: "Código postal"
                                                        },
                                                        cityName: {
                                                            type: "string",
                                                            example: "Autauga",
                                                            description: "Nombre de la ciudad"
                                                        },
                                                        stateName: {
                                                            type: "string",
                                                            example: "Alabama",
                                                            description: "Nombre del estado"
                                                        },
                                                        streetName: {
                                                            type: "string",
                                                            example: "nombre de mi calle",
                                                            description: "Nombre de la calle"
                                                        },
                                                        addressBorough: {
                                                            type: "string",
                                                            example: "Ciudad",
                                                            description: "Distrito"
                                                        },
                                                        accommodationType: {
                                                            type: "string",
                                                            example: "Tipo de Alojamiento",
                                                            description: "Tipo de alojamiento"
                                                        }
                                                    },
                                                    description: "Dirección del cliente"
                                                },
                                                clientContacts: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {
                                                            contactId: {
                                                                type: "integer",
                                                                example: 1002,
                                                                description: "ID del contacto"
                                                            },
                                                            contactName: {
                                                                type: "object",
                                                                properties: {
                                                                    contactLastName: {
                                                                        type: "string",
                                                                        example: "Diaz",
                                                                        description: "Apellido del contacto"
                                                                    },
                                                                    contactFirstName: {
                                                                        type: "string",
                                                                        example: "Efrain",
                                                                        description: "Nombre del contacto"
                                                                    }
                                                                },
                                                                description: "Nombre del contacto"
                                                            },
                                                            contactEmails: {
                                                                type: "array",
                                                                items: {
                                                                    type: "string",
                                                                    example: "test@test.com",
                                                                    description: "Correos electrónicos del contacto"
                                                                },
                                                                description: "Correos electrónicos del contacto"
                                                            },
                                                            contactPhoneNumbers: {
                                                                type: "array",
                                                                items: {
                                                                    type: "string",
                                                                    example: "2223222222",
                                                                    description: "Números de teléfono del contacto"
                                                                },
                                                                description: "Números de teléfono del contacto"
                                                            }
                                                        },
                                                        description: "Información del contacto"
                                                    },
                                                    description: "Lista de contactos del cliente"
                                                },
                                                clientCreationDate: {
                                                    type: "string",
                                                    example: "2023-07-24",
                                                    description: "Fecha de creación del cliente"
                                                },
                                                clientBuildingCount: {
                                                    type: "integer",
                                                    example: 4,
                                                    description: "Número de edificios del cliente"
                                                }
                                            },
                                            description: "Información del cliente"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false,
                                            description: "Indica si la solicitud fue incorrecta"
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string",
                                                        description: "Mensaje de error"
                                                    },
                                                    path: {
                                                        type: "string",
                                                        description: "Camino del error"
                                                    }
                                                }
                                            },
                                            description: "Lista de errores de la solicitud"
                                        }
                                    },
                                    example: {
                                        success: false,
                                        errors: [
                                            {
                                                msg: "No es un id de contacto valido",
                                                path: "contactId"
                                            },
                                            {
                                                msg: "El correo 'test@test.test' no existen en el contacto seleccionado",
                                                path: "deleteEmails"
                                            },
                                            {
                                                msg: "Los numeros '3244283223', '3244283222', '3244283528' no existen en el contacto seleccionado",
                                                path: "deleteNumbers"
                                            },
                                            {
                                                msg: "El email a actualizar '22222222@222.222222' ya existe",
                                                path: "updateEmails"
                                            },
                                            {
                                                msg: "El numero a actualizar '1111111111' ya existe",
                                                path: "updateNumbers"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/client/updateClientBuilding": {
            put: {
                tags: ["Clients - Client"],
                summary: "Actualizar información del edificio de cliente",
                description: "Permite actualizar la información de un edificio de cliente existente.",
                operationId: "updateClientBuilding",
                parameters: [
                    {
                        name: 'accessToken',
                        in: 'header',
                        schema: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6MTAzMCwiaWF0IjoxNjk0MzcyMjMxfQ.3G-pLAYaX4PFFOIp7grDd6jaIIpwv9FE7UzeANUj1Kw'
                        },
                        description: 'Token de acceso del usuario'
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    clientId: {
                                        type: "integer",
                                        example: 1000,
                                        description: "ID del cliente"
                                    },
                                    buildingId: {
                                        type: "integer",
                                        example: 1000,
                                        description: "ID del edificio"
                                    },
                                    buildingName: {
                                        type: "string",
                                        example: "Arreglar - updated2",
                                        description: "Nombre del edificio"
                                    },
                                    buildingFloors: {
                                        type: "string",
                                        example: "100",
                                        description: "Número de pisos del edificio"
                                    },
                                    buildingTypeId: {
                                        type: "integer",
                                        example: 1000,
                                        description: "ID del tipo de edificio"
                                    },
                                    buildingSurfaceSquareMeters: {
                                        type: "string",
                                        example: "150",
                                        description: "Área en metros cuadrados del edificio"
                                    }
                                    // Resto de las propiedades del requestBody...
                                },
                                required: ["clientId", "buildingId"]
                            }
                        }
                    }
                },
                responses: {
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false,
                                            description: "Indica si la solicitud fue incorrecta"
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string",
                                                        description: "Mensaje de error"
                                                    },
                                                    path: {
                                                        type: "string",
                                                        description: "Camino del error"
                                                    }
                                                }
                                            },
                                            description: "Lista de errores de la solicitud"
                                        }
                                    },
                                    example: {
                                        success: false,
                                        errors: [
                                            {
                                                msg: "El buildingId es invalido",
                                                path: "buildingId"
                                            },
                                            {
                                                msg: "El building_name debe tener al menos 8 caracteres",
                                                path: "buildingName"
                                            },
                                            {
                                                msg: "El buildingFloors debe ser un numero (1-167)",
                                                path: "buildingFloors"
                                            },
                                            {
                                                msg: "El buildingTypeId es invalido",
                                                path: "buildingTypeId"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true,
                                            description: "Indica si la solicitud fue exitosa"
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Client Building Updated",
                                            description: "Mensaje de éxito"
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                buildingId: {
                                                    type: "integer",
                                                    example: 1000,
                                                    description: "ID del edificio"
                                                },
                                                buildingName: {
                                                    type: "string",
                                                    example: "Arreglar - updated2",
                                                    description: "Nombre del edificio"
                                                },
                                                buildingFloors: {
                                                    type: "integer",
                                                    example: 100,
                                                    description: "Número de pisos del edificio"
                                                },
                                                buildingAddress: {
                                                    type: "object",
                                                    properties: {
                                                        zipCode: {
                                                            type: "string",
                                                            example: "12345",
                                                            description: "Código postal"
                                                        },
                                                        cityName: {
                                                            type: "string",
                                                            example: "Autauga",
                                                            description: "Nombre de la ciudad"
                                                        },
                                                        stateName: {
                                                            type: "string",
                                                            example: "Alabama",
                                                            description: "Nombre del estado"
                                                        },
                                                        streetName: {
                                                            type: "string",
                                                            example: "Nombre de la Calle",
                                                            description: "Nombre de la calle"
                                                        },
                                                        addressBorough: {
                                                            type: "string",
                                                            example: "Ciudad",
                                                            description: "Nombre del barrio"
                                                        },
                                                        accommodationType: {
                                                            type: "string",
                                                            example: "Tipo de Alojamiento",
                                                            description: "Tipo de alojamiento"
                                                        }
                                                    },
                                                    description: "Dirección del edificio"
                                                },
                                                buildingTypeName: {
                                                    type: "string",
                                                    example: "Residential",
                                                    description: "Nombre del tipo de edificio"
                                                },
                                                buildingSurfaceSquareMeters: {
                                                    type: "number",
                                                    example: 150,
                                                    description: "Área en metros cuadrados del edificio"
                                                }
                                            },
                                            description: "Información actualizada del edificio"
                                        }
                                    },
                                    example: {
                                        success: true,
                                        msg: "Client Building Updated",
                                        data: {
                                            buildingId: 1000,
                                            buildingName: "Arreglar - updated2",
                                            buildingFloors: 100,
                                            buildingAddress: {
                                                zipCode: "12345",
                                                cityName: "Autauga",
                                                stateName: "Alabama",
                                                streetName: "Nombre de la Calle",
                                                addressBorough: "Ciudad",
                                                accommodationType: "Tipo de Alojamiento"
                                            },
                                            buildingTypeName: "Residential",
                                            buildingSurfaceSquareMeters: 150
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/client/deleteClientContact": {
            delete: {
                tags: ["Clients - Client"],
                summary: "Eliminar un contacto de cliente",
                description: "Permite eliminar un contacto de cliente existente.",
                operationId: "deleteClientContact",
                parameters: [
                    {
                        name: 'accessToken',
                        in: 'header',
                        schema: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6MTAzMCwiaWF0IjoxNjk0MzcyMjMxfQ.3G-pLAYaX4PFFOIp7grDd6jaIIpwv9FE7UzeANUj1Kw'
                        },
                        description: 'Token de acceso del usuario'
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    clientId: {
                                        type: "integer",
                                        example: 1000,
                                        description: "ID del cliente"
                                    },
                                    contactId: {
                                        type: "integer",
                                        example: 1003,
                                        description: "ID del contacto a eliminar"
                                    }
                                },
                                required: ["clientId", "contactId"]
                            }
                        }
                    }
                },
                responses: {
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false,
                                            description: "Indica si la solicitud fue incorrecta"
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string",
                                                        description: "Mensaje de error"
                                                    },
                                                    path: {
                                                        type: "string",
                                                        description: "Camino del error"
                                                    }
                                                }
                                            },
                                            description: "Lista de errores de la solicitud"
                                        }
                                    },
                                    example: {
                                        success: false,
                                        errors: [
                                            {
                                                msg: "El clientId es obligatorio",
                                                path: "clientId"
                                            },
                                            {
                                                msg: "El contactId es obligatorio",
                                                path: "contactId"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true,
                                            description: "Indica si la solicitud fue exitosa"
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Client Contact Deleted",
                                            description: "Mensaje de éxito"
                                        }
                                    },
                                    example: {
                                        success: true,
                                        msg: "Client Contact Deleted"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/client/exportClientsToPDF": {
            post: {
                tags: ["Clients - Client"],
                summary: "Exportar clientes a PDF",
                description: "Permite exportar la información de los clientes a un archivo PDF según el rango de fechas especificado.",
                operationId: "exportClientsToPDF",
                parameters: [
                    {
                        name: 'accessToken',
                        in: 'header',
                        schema: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6MTAzMCwiaWF0IjoxNjk0MzcyMjMxfQ.3G-pLAYaX4PFFOIp7grDd6jaIIpwv9FE7UzeANUj1Kw'
                        },
                        description: 'Token de acceso del usuario'
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    finalDate: {
                                        type: "string",
                                        example: "2023-07-09",
                                        description: "Fecha de finalización (AAAA-MM-DD)"
                                    },
                                    startDate: {
                                        type: "string",
                                        example: "2023-01-01",
                                        description: "Fecha de inicio (AAAA-MM-DD)"
                                    }
                                },
                                required: ["finalDate", "startDate"]
                            }
                        }
                    }
                },
                responses: {
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false,
                                            description: "Indica si la solicitud fue incorrecta"
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string",
                                                        description: "Mensaje de error"
                                                    },
                                                    path: {
                                                        type: "string",
                                                        description: "Camino del error"
                                                    }
                                                }
                                            },
                                            description: "Lista de errores de la solicitud"
                                        }
                                    },
                                    example: {
                                        success: false,
                                        errors: [
                                            {
                                                msg: "La fecha no cumple el formato correcto 'AAAA-MM-DD'",
                                                path: "startDate"
                                            },
                                            {
                                                msg: "La fecha no cumple el formato correcto 'AAAA-MM-DD'",
                                                path: "finalDate"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true,
                                            description: "Indica si la solicitud fue exitosa"
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Información obtenida correctamente",
                                            description: "Mensaje de éxito"
                                        },
                                        data: {
                                            type: "string",
                                            example: "http://3.80.189.150:9000/api/client/clientsPdfReport",
                                            description: "URL para descargar el archivo PDF"
                                        }
                                    },
                                    example: {
                                        success: true,
                                        msg: "Información obtenida correctamente",
                                        data: "http://3.80.189.150:9000/api/client/clientsPdfReport"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/client/exportClientsToXLSX": {
            post: {
                tags: ["Clients - Client"],
                summary: "Exportar clientes a XLSX",
                description: "Permite exportar la información de los clientes a un archivo XLSX según el rango de fechas especificado.",
                operationId: "exportClientsToXLSX",
                parameters: [
                    {
                        name: 'accessToken',
                        in: 'header',
                        schema: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6MTAzMCwiaWF0IjoxNjk0MzcyMjMxfQ.3G-pLAYaX4PFFOIp7grDd6jaIIpwv9FE7UzeANUj1Kw'
                        },
                        description: 'Token de acceso del usuario'
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    finalDate: {
                                        type: "string",
                                        example: "2023-07-09",
                                        description: "Fecha de finalización (AAAA-MM-DD)"
                                    },
                                    startDate: {
                                        type: "string",
                                        example: "2023-01-01",
                                        description: "Fecha de inicio (AAAA-MM-DD)"
                                    }
                                },
                                required: ["finalDate", "startDate"]
                            }
                        }
                    }
                },
                responses: {
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false,
                                            description: "Indica si la solicitud fue incorrecta"
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string",
                                                        description: "Mensaje de error"
                                                    },
                                                    path: {
                                                        type: "string",
                                                        description: "Camino del error"
                                                    }
                                                }
                                            },
                                            description: "Lista de errores de la solicitud"
                                        }
                                    },
                                    example: {
                                        success: false,
                                        errors: [
                                            {
                                                msg: "La fecha no cumple el formato correcto 'AAAA-MM-DD'",
                                                path: "startDate"
                                            },
                                            {
                                                msg: "La fecha no cumple el formato correcto 'AAAA-MM-DD'",
                                                path: "finalDate"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true,
                                            description: "Indica si la solicitud fue exitosa"
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Información obtenida correctamente",
                                            description: "Mensaje de éxito"
                                        },
                                        data: {
                                            type: "string",
                                            example: "http://3.80.189.150:9000/api/client/clientsXlsxReport",
                                            description: "URL para descargar el archivo XLSX"
                                        }
                                    },
                                    example: {
                                        success: true,
                                        msg: "Información obtenida correctamente",
                                        data: "http://3.80.189.150:9000/api/client/clientsXlsxReport"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/client/getClientInfo": {
            post: {
                tags: ["Clients - Client"],
                summary: "Obtener información del cliente por ID",
                description: "Obtiene información detallada de un cliente por su ID.",
                operationId: "getClientInfo",
                parameters: [
                    {
                        name: 'accessToken',
                        in: 'header',
                        schema: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6MTAzMCwiaWF0IjoxNjk0MzcyMjMxfQ.3G-pLAYaX4PFFOIp7grDd6jaIIpwv9FE7UzeANUj1Kw'
                        },
                        description: 'Token de acceso del usuario'
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    clientId: {
                                        type: "integer",
                                        example: 1000
                                    }
                                },
                                required: ["clientId"]
                            }
                        }
                    }
                },
                responses: {
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string"
                                                    },
                                                    path: {
                                                        type: "string"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    example: {
                                        success: false,
                                        errors: [
                                            {
                                                msg: "El clientId es obligatorio",
                                                path: "clientId"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Data obtenida correctamente"
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                clientId: {
                                                    type: "integer",
                                                    example: 1000
                                                },
                                                clientName: {
                                                    type: "string",
                                                    example: "Esteban"
                                                },
                                                clientState: {
                                                    type: "integer",
                                                    example: 1
                                                },
                                                clientTagId: {
                                                    type: "stirng"
                                                },
                                                clientAddress: {
                                                    type: "object",
                                                    properties: {
                                                        zipCode: {
                                                            type: "string",
                                                            example: "12345"
                                                        },
                                                        cityName: {
                                                            type: "string",
                                                            example: "Autauga"
                                                        },
                                                        stateName: {
                                                            type: "string",
                                                            example: "Alabama"
                                                        },
                                                        streetName: {
                                                            type: "string",
                                                            example: "nombre de mi calle"
                                                        },
                                                        addressBorough: {
                                                            type: "string",
                                                            example: "Ciudad"
                                                        },
                                                        accommodationType: {
                                                            type: "string",
                                                            example: "Tipo de Alojamiento"
                                                        }
                                                    }
                                                },
                                                clientContacts: {
                                                    type: "null"
                                                },
                                                clientBuildings: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {
                                                            buildingId: {
                                                                type: "integer",
                                                                example: 1000
                                                            },
                                                            buildingName: {
                                                                type: "string",
                                                                example: "Arreglar - updated2"
                                                            },
                                                            buildingFloors: {
                                                                type: "integer",
                                                                example: 100
                                                            },
                                                            buildingAddress: {
                                                                type: "object",
                                                                properties: {
                                                                    zipCode: {
                                                                        type: "string",
                                                                        example: "12345"
                                                                    },
                                                                    cityName: {
                                                                        type: "string",
                                                                        example: "Autauga"
                                                                    },
                                                                    stateName: {
                                                                        type: "string",
                                                                        example: "Alabama"
                                                                    },
                                                                    streetName: {
                                                                        type: "string",
                                                                        example: "Nombre de la Calle"
                                                                    },
                                                                    addressBorough: {
                                                                        type: "string",
                                                                        example: "Ciudad"
                                                                    },
                                                                    accommodationType: {
                                                                        type: "string",
                                                                        example: "Tipo de Alojamiento"
                                                                    }
                                                                }
                                                            },
                                                            buildingTypeName: {
                                                                type: "string",
                                                                example: "Residential"
                                                            },
                                                            buildingSurfaceSquareMeters: {
                                                                type: "integer",
                                                                example: 150
                                                            }
                                                        }
                                                    }
                                                },
                                                clientCreationDate: {
                                                    type: "string",
                                                    example: "2023-07-24"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        /**
         ** User
         */
        "/api/user/getUserInfo": {
            post: {
                tags: ["Users - User"],
                summary: "Obtener información de usuario por ID",
                description: "Obtiene información detallada de un usuario por su ID.",
                operationId: "getUserInfo",
                parameters: [
                    {
                        name: 'accessToken',
                        in: 'header',
                        schema: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6MTAzMCwiaWF0IjoxNjk0MzcyMjMxfQ.3G-pLAYaX4PFFOIp7grDd6jaIIpwv9FE7UzeANUj1Kw'
                        },
                        description: 'Token de acceso del usuario'
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    userId: {
                                        type: "integer",
                                        example: 1001
                                    }
                                },
                                required: ["userId"]
                            }
                        }
                    }
                },
                responses: {
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string"
                                                    },
                                                    path: {
                                                        type: "string"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    example: {
                                        success: false,
                                        errors: [
                                            {
                                                msg: "El userId es obligatorio",
                                                path: "userId"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Data obtenida correctamente"
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                userId: {
                                                    type: "integer",
                                                    example: 1001
                                                },
                                                userEmail: {
                                                    type: "string",
                                                    example: "202331ed@gmail.com"
                                                },
                                                userImage: {
                                                    type: "string",
                                                    example: null
                                                },
                                                userState: {
                                                    type: "boolean",
                                                    example: true
                                                },
                                                userAddress: {
                                                    type: "object",
                                                    properties: {
                                                        zipCode: {
                                                            type: "string",
                                                            example: "12345"
                                                        },
                                                        cityName: {
                                                            type: "string",
                                                            example: "Autauga"
                                                        },
                                                        stateName: {
                                                            type: "string",
                                                            example: "Alabama"
                                                        },
                                                        streetName: {
                                                            type: "string",
                                                            example: "Dary street"
                                                        },
                                                        addressBorough: {
                                                            type: "string",
                                                            example: "Ciudad Ejemplo"
                                                        },
                                                        accommodationType: {
                                                            type: "string",
                                                            example: "Casa"
                                                        }
                                                    }
                                                },
                                                userLastName: {
                                                    type: "string",
                                                    example: "Diaz"
                                                },
                                                userUsername: {
                                                    type: "string",
                                                    example: "esteban.diaz"
                                                },
                                                userFirstName: {
                                                    type: "string",
                                                    example: "Esteban / test"
                                                },
                                                agentCofNumber: {
                                                    type: "null"
                                                },
                                                userPermissions: {
                                                    type: "object",
                                                    properties: {
                                                        taskPermission: {
                                                            type: "boolean",
                                                            example: true
                                                        },
                                                        userPermission: {
                                                            type: "boolean",
                                                            example: true
                                                        },
                                                        clientPermission: {
                                                            type: "boolean",
                                                            example: true
                                                        },
                                                        auditLogPermission: {
                                                            type: "boolean",
                                                            example: true
                                                        },
                                                        reportTaskPermission: {
                                                            type: "boolean",
                                                            example: true
                                                        },
                                                        organizationPermission: {
                                                            type: "boolean",
                                                            example: true
                                                        }
                                                    }
                                                },
                                                userPhoneNumber: {
                                                    type: "string",
                                                    example: "3044283568"
                                                },
                                                userCreationDate: {
                                                    type: "string",
                                                    example: "2023-07-24"
                                                },
                                                userRequirePasswordChange: {
                                                    type: "boolean",
                                                    example: false
                                                }
                                            }
                                        }
                                    },
                                    example: {
                                        success: true,
                                        msg: "Data obtenida correctamente",
                                        data: {
                                            userId: 1001,
                                            userEmail: "202331ed@gmail.com",
                                            userImage: null,
                                            userState: true,
                                            userAddress: {
                                                zipCode: "12345",
                                                cityName: "Autauga",
                                                stateName: "Alabama",
                                                streetName: "Dary street",
                                                addressBorough: "Ciudad Ejemplo",
                                                accommodationType: "Casa"
                                            },
                                            userLastName: "Diaz",
                                            userUsername: "esteban.diaz",
                                            userFirstName: "Esteban / test",
                                            agentCofNumber: null,
                                            userPermissions: {
                                                taskPermission: true,
                                                userPermission: true,
                                                clientPermission: true,
                                                auditLogPermission: true,
                                                reportTaskPermission: true,
                                                organizationPermission: true
                                            },
                                            userPhoneNumber: "3044283568",
                                            userCreationDate: "2023-07-24",
                                            userRequirePasswordChange: false
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/user/createUser": {   
            post: {
                tags: ["Users - User"],
                summary: "Crear un nuevo usuario",
                description: "Crea un nuevo usuario con los datos proporcionados.",
                operationId: "createUser",
                parameters: [
                    {
                        name: 'accessToken',
                        in: 'header',
                        schema: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6MTAzMCwiaWF0IjoxNjk0MzcyMjMxfQ.3G-pLAYaX4PFFOIp7grDd6jaIIpwv9FE7UzeANUj1Kw'
                        },
                        description: 'Token de acceso del usuario'
                    },
                ],
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    userEmail: {
                                        type: "string",
                                        example: "test@s23w45.com"
                                    },
                                    addressBorough: {
                                        type: "string",
                                        example: "Cityville"
                                    },
                                    userUsername: {
                                        type: "string",
                                        example: "usernamew"
                                    },
                                    userLastName: {
                                        type: "string",
                                        example: "Doe"
                                    },
                                    userFirstName: {
                                        type: "string",
                                        example: "John"
                                    },
                                    zipCode: {
                                        type: "string",
                                        example: "12345-2125"
                                    },
                                    streetName: {
                                        type: "string",
                                        example: "123 Main St"
                                    },
                                    userPhoneNumber: {
                                        type: "string",
                                        example: "+1 304-428-3568"
                                    },
                                    agentCofNumber: {
                                        type: "string",
                                        example: "xxxxxx"
                                    },
                                    userPermission: {
                                        type: "boolean",
                                        example: true
                                    },
                                    taskPermission: {
                                        type: "boolean",
                                        example: true
                                    },
                                    clientPermission: {
                                        type: "boolean",
                                        example: true
                                    },
                                    auditLogPermission: {
                                        type: "boolean",
                                        example: true
                                    },
                                    reportTaskPermission: {
                                        type: "boolean",
                                        example: true
                                    },
                                    organizationPermission: {
                                        type: "boolean",
                                        example: true
                                    },
                                    countryId: {
                                        type: "string",
                                        example: "1000"
                                    },
                                    cityId: {
                                        type: "string",
                                        example: "1000"
                                    },
                                    stateId: {
                                        type: "string",
                                        example: "1000"
                                    },
                                    profilePhoto: {
                                        type: "string",
                                        format: "binary"
                                    }
                                },
                                required: [
                                    "userEmail",
                                    "userUsername",
                                    "userLastName",
                                    "userFirstName",
                                    "zipCode",
                                    "streetName",
                                    "userPhoneNumber",
                                    "agentCofNumber",
                                    "userPermission",
                                    "taskPermission",
                                    "clientPermission",
                                    "auditLogPermission",
                                    "reportTaskPermission",
                                    "organizationPermission",
                                    "countryId",
                                    "cityId",
                                    "stateId",
                                    'addressBorough'
                                ]
                            }
                        }
                    }
                },
                responses: {
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string"
                                                    },
                                                    path: {
                                                        type: "string"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    example: {
                                        success: false,
                                        errors: [
                                            {
                                                msg: "Solo se aceptan valores booleanos",
                                                path: "userState"
                                            },
                                            {
                                                msg: "Ingrese un email valido",
                                                path: "userEmail"
                                            },
                                            {
                                                msg: "Ingrese un email valido",
                                                path: "userEmail"
                                            },
                                            {
                                                msg: "'El email es obligatorio",
                                                path: "userEmail"
                                            },
                                            {
                                                msg: "El nombre de usuario debe tener al menos 8 caracteres",
                                                path: "userUsername"
                                            },
                                            {
                                                msg: "El nombre de usuario debe tener al menos 8 caracteres",
                                                path: "userUsername"
                                            },
                                            {
                                                msg: "El nombre de usuario debe tener al menos 8 caracteres",
                                                path: "userUsername"
                                            },
                                            {
                                                msg: "El username es obligatorio",
                                                path: "userUsername"
                                            },
                                            {
                                                msg: "Ingrese un numero de telefomo valido",
                                                path: "userPhoneNumber"
                                            },
                                            {
                                                msg: "Ingrese un numero de telefomo valido",
                                                path: "userPhoneNumber"
                                            },
                                            {
                                                msg: "El apellido es obligatorio",
                                                path: "userLastName"
                                            },
                                            {
                                                msg: "El apellido es obligatorio",
                                                path: "userLastName"
                                            },
                                            {
                                                msg: "El nombre es obligatorio",
                                                path: "userFirstName"
                                            },
                                            {
                                                msg: "El nombre es obligatorio",
                                                path: "userFirstName"
                                            },
                                            {
                                                msg: "El es obligatorio",
                                                path: "agentCofNumber"
                                            },
                                            {
                                                msg: "Ingrese un zip code valido",
                                                path: "zipCode"
                                            },
                                            {
                                                msg: "El nombre de la calle es obligatorio",
                                                path: "streetName"
                                            },
                                            {
                                                msg: "El nombre de la calle es obligatorio",
                                                path: "streetName"
                                            },
                                            {
                                                msg: "El addressBorough es obligatorio",
                                                path: "addressBorough"
                                            },
                                            {
                                                msg: "El addressBorough es obligatorio",
                                                path: "addressBorough"
                                            },
                                            {
                                                msg: "El tipo de edificio es obligatirio",
                                                path: "accommodationType"
                                            },
                                            {
                                                msg: "El auditLogPermission debe ser un valor booleano",
                                                path: "auditLogPermission"
                                            },
                                            {
                                                msg: "El reportTaskPermission debe ser un valor booleano",
                                                path: "reportTaskPermission"
                                            },
                                            {
                                                msg: "El organizationPermission debe ser un valor booleano",
                                                path: "organizationPermission"
                                            },
                                            {
                                                msg: "El userPermission debe ser un valor booleano",
                                                path: "userPermission"
                                            },
                                            {
                                                msg: "El taskPermission debe ser un valor booleano",
                                                path: "taskPermission"
                                            },
                                            {
                                                msg: "El clientPermission debe ser un valor booleano",
                                                path: "clientPermission"
                                            },
                                            {
                                                msg: "El stateId es obligatorio",
                                                path: "stateId"
                                            },
                                            {
                                                msg: "El stateId es obligatorio",
                                                path: "cityId"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true
                                        },
                                        msg: {
                                            type: "string",
                                            example: "User created"
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                userId: {
                                                    type: "integer",
                                                    example: 1039
                                                },
                                                userEmail: {
                                                    type: "string",
                                                    example: "test@s23w45.com"
                                                },
                                                userImage: {
                                                    type: "null"
                                                },
                                                userState: {
                                                    type: "boolean",
                                                    example: true
                                                },
                                                userAddress: {
                                                    type: "object",
                                                    properties: {
                                                        zipCode: {
                                                            type: "string",
                                                            example: "12345-2125"
                                                        },
                                                        cityName: {
                                                            type: "string",
                                                            example: "Autauga"
                                                        },
                                                        stateName: {
                                                            type: "string",
                                                            example: "Alabama"
                                                        },
                                                        streetName: {
                                                            type: "string",
                                                            example: "123 Main St"
                                                        },
                                                        addressBorough: {
                                                            type: "string",
                                                            example: "Cityville"
                                                        },
                                                        accommodationType: {
                                                            type: "string",
                                                            example: "Casa"
                                                        }
                                                    }
                                                },
                                                userLastName: {
                                                    type: "string",
                                                    example: "Doe"
                                                },
                                                userUsername: {
                                                    type: "string",
                                                    example: "usernamew"
                                                },
                                                userFirstName: {
                                                    type: "string",
                                                    example: "John"
                                                },
                                                agentCofNumber: {
                                                    type: "string",
                                                    example: "xxxxxx"
                                                },
                                                userPermissions: {
                                                    type: "object",
                                                    properties: {
                                                        taskPermission: {
                                                            type: "boolean",
                                                            example: true
                                                        },
                                                        userPermission: {
                                                            type: "boolean",
                                                            example: true
                                                        },
                                                        clientPermission: {
                                                            type: "boolean",
                                                            example: true
                                                        },
                                                        auditLogPermission: {
                                                            type: "boolean",
                                                            example: true
                                                        },
                                                        reportTaskPermission: {
                                                            type: "boolean",
                                                            example: true
                                                        },
                                                        organizationPermission: {
                                                            type: "boolean",
                                                            example: true
                                                        }
                                                    }
                                                },
                                                userPhoneNumber: {
                                                    type: "string",
                                                    example: "+1 304-428-3568"
                                                },
                                                userCreationDate: {
                                                    type: "string",
                                                    example: "2023-09-11"
                                                },
                                                userRequirePasswordChange: {
                                                    type: "boolean",
                                                    example: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/user/updateUser": {
            put: {
                tags: ["Users - User"],
                summary: "Actualizar usuario existente",
                description: "Actualiza un usuario existente con los datos proporcionados.",
                operationId: "updateUser",
                parameters: [
                    {
                        name: 'accessToken',
                        in: 'header',
                        schema: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6MTAzMCwiaWF0IjoxNjk0MzcyMjMxfQ.3G-pLAYaX4PFFOIp7grDd6jaIIpwv9FE7UzeANUj1Kw'
                        },
                        description: 'Token de acceso del usuario'
                    },
                ],
                requestBody: {
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    userId: {
                                        type: "string",
                                        example: "1001"
                                    },
                                    userEmail: {
                                        type: "string",
                                        example: "202331ed@gmail.com"
                                    },
                                    addressBorough: {
                                        type: "string",
                                        example: "Cityville"
                                    },
                                    userUsername: {
                                        type: "string",
                                        example: "esteban.diaz"
                                    },
                                    userLastName: {
                                        type: "string",
                                        example: "Doe"
                                    },
                                    userFirstName: {
                                        type: "string",
                                        example: "John"
                                    },
                                    zipCode: {
                                        type: "string",
                                        example: "12345-2125"
                                    },
                                    streetName: {
                                        type: "string",
                                        example: "123 Main St"
                                    },
                                    userPhoneNumber: {
                                        type: "string",
                                        example: "+1 304-428-3568"
                                    },
                                    agentCofNumber: {
                                        type: "string",
                                        example: "xxxxxx"
                                    },
                                    userPermission: {
                                        type: "boolean",
                                        example: true
                                    },
                                    taskPermission: {
                                        type: "boolean",
                                        example: true
                                    },
                                    clientPermission: {
                                        type: "boolean",
                                        example: true
                                    },
                                    auditLogPermission: {
                                        type: "boolean",
                                        example: true
                                    },
                                    reportTaskPermission: {
                                        type: "boolean",
                                        example: true
                                    },
                                    organizationPermission: {
                                        type: "boolean",
                                        example: true
                                    },
                                    countryId: {
                                        type: "string",
                                        example: "1000"
                                    },
                                    cityId: {
                                        type: "string",
                                        example: "1000"
                                    },
                                    stateId: {
                                        type: "string",
                                        example: "1000"
                                    },
                                    accommodationType: {
                                        type: "string",
                                        example: "Casa"
                                    },
                                    profilePhoto: {
                                        type: "string",
                                        format: "binary"
                                    }
                                },
                                required:['userId']
                            }
                        }
                    }
                },
                responses: {
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string"
                                                    },
                                                    path: {
                                                        type: "string"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    example: {
                                        success: false,
                                        errors: [
                                            {
                                                msg: "El userId es obligatorio",
                                                path: "userId"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true
                                        },
                                        msg: {
                                            type: "string",
                                            example: "User Updated"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/user/alternateUser": {
            put: {
                tags: ["Users - User"],
                summary: "Cambiar el estado del usuario",
                description: "Cambia el estado (activo/inactivo) de un usuario con la ID proporcionada.",
                operationId: "alternateUser",
                parameters: [
                    {
                        name: 'accessToken',
                        in: 'header',
                        schema: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6MTAzMCwiaWF0IjoxNjk0MzcyMjMxfQ.3G-pLAYaX4PFFOIp7grDd6jaIIpwv9FE7UzeANUj1Kw'
                        },
                        description: 'Token de acceso del usuario'
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    userId: {
                                        type: "string",
                                        example: "1001"
                                    }
                                },
                                required: ["userId"]
                            }
                        }
                    }
                },
                responses: {
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string"
                                                    },
                                                    path: {
                                                        type: "string"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    example: {
                                        success: false,
                                        errors: [
                                            {
                                                msg: "Ingrese una ID de usuario válida",
                                                path: "userId"
                                            },
                                            {
                                                msg: "El userId es obligatorio",
                                                path: "userId"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true
                                        },
                                        msg: {
                                            type: "string",
                                            example: "User status changed"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/user/exportUsersToPDF": {
            post: {
                tags: ["Users - User"],
                summary: "Exportar usuarios a PDF",
                description: "Exporta información de usuarios en formato PDF dentro del rango de fechas especificado.",
                operationId: "exportUsersToPDF",
                parameters: [
                    {
                        name: 'accessToken',
                        in: 'header',
                        schema: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6MTAzMCwiaWF0IjoxNjk0MzcyMjMxfQ.3G-pLAYaX4PFFOIp7grDd6jaIIpwv9FE7UzeANUj1Kw'
                        },
                        description: 'Token de acceso del usuario'
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    finalDate: {
                                        type: "string",
                                        format: "date",
                                        example: "2023-07-09"
                                    },
                                    startDate: {
                                        type: "string",
                                        format: "date",
                                        example: "2023-01-01"
                                    }
                                },
                                required: ["finalDate", "startDate"]
                            }
                        }
                    }
                },
                responses: {
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string"
                                                    },
                                                    path: {
                                                        type: "string"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    example: {
                                        success: false,
                                        errors: [
                                            {
                                                msg: "La fecha no cumple el formato correcto 'AAAA-MM-DD'",
                                                path: "startDate"
                                            },
                                            {
                                                msg: "La fecha no cumple el formato correcto 'AAAA-MM-DD'",
                                                path: "finalDate"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Información obtenida correctamente"
                                        },
                                        data: {
                                            type: "string",
                                            example: "http://3.80.189.150:9000/api/user/usersPdfReport"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/user/exportUsersToXLSX": {
            post: {
                tags: ["Users - User"],
                summary: "Exportar usuarios a XLSX",
                description: "Exporta información de usuarios en formato XLSX dentro del rango de fechas especificado.",
                operationId: "exportUsersToXLSX",
                parameters: [
                    {
                        name: 'accessToken',
                        in: 'header',
                        schema: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6MTAzMCwiaWF0IjoxNjk0MzcyMjMxfQ.3G-pLAYaX4PFFOIp7grDd6jaIIpwv9FE7UzeANUj1Kw'
                        },
                        description: 'Token de acceso del usuario'
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    finalDate: {
                                        type: "string",
                                        format: "date",
                                        example: "2023-07-09"
                                    },
                                    startDate: {
                                        type: "string",
                                        format: "date",
                                        example: "2023-01-01"
                                    }
                                },
                                required: ["finalDate", "startDate"]
                            }
                        }
                    }
                },
                responses: {
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: false
                                        },
                                        errors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg: {
                                                        type: "string"
                                                    },
                                                    path: {
                                                        type: "string"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    example: {
                                        success: false,
                                        errors: [
                                            {
                                                msg: "La fecha no cumple el formato correcto 'AAAA-MM-DD'",
                                                path: "startDate"
                                            },
                                            {
                                                msg: "La fecha no cumple el formato correcto 'AAAA-MM-DD'",
                                                path: "finalDate"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    },
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Información obtenida correctamente"
                                        },
                                        data: {
                                            type: "string",
                                            example: "http://3.80.189.150:9000/api/user/usersXlsxReport"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        
        "/api/info/getLocationInfo": {
            get: {
                tags: ["Get info - info"]
            }
        },
        "/api/info/getClientsInfo": {
            get: {
                tags: ["Get info - info"]
            }
        },
        "/api/info/getUsersInfo": {
            get: {
                tags: ["Get info - info"]
            }
        },/**
         ** Task
         */
         "/api/task/getTaskInfo": {
            post: {
                tags: ["Tasks - Task"],
                summary: "Obtener información de la tarea",
                description: "Obtiene información detallada de una tarea según su ID.",
                operationId: "getTaskInfo",
                parameters: [
                    {
                        name: "taskId",
                        in: "body",
                        required: true,
                        schema: {
                            type: "object",
                            properties: {
                                taskId: {
                                    type: "string",
                                    example: "1001"
                                }
                            }
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Task info."
                                        },
                                        data: {
                                            $ref: "#/components/schemas/Task"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/task/createTask": {
            post: {
                tags: ["Tasks - Task"],
                summary: "Crear una nueva tarea",
                description: "Crea una nueva tarea con los datos proporcionados.",
                operationId: "createTask",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/NewTask"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Create Task"
                                        },
                                        data: {
                                            $ref: "#/components/schemas/Task"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/task/updateTask": {
            put: {
                tags: ["Tasks - Task"],
                summary: "Actualizar una tarea existente",
                description: "Actualiza una tarea existente con los datos proporcionados.",
                operationId: "updateTask",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/UpdateTask"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Update Task"
                                        },
                                        data: {
                                            $ref: "#/components/schemas/Task"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/task/assignTask": {
            put: {
                tags: ["Tasks - Task"],
                summary: "Asignar una tarea",
                description: "Asigna una tarea existente a un usuario específico.",
                operationId: "assignTask",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/AssignTask"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Assign Task"
                                        },
                                        data: {
                                            $ref: "#/components/schemas/Task"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/task/manageTask": {
            put: {
                tags: ["Tasks - Task"],
                summary: "Gestionar una tarea",
                description: "Gestiona una tarea existente según los datos proporcionados.",
                operationId: "manageTask",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ManageTask"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Manage Task"
                                        },
                                        data: {
                                            $ref: "#/components/schemas/Task"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/task/cancelTask": {
            put: {
                tags: ["Tasks - Task"],
                summary: "Cancelar una tarea",
                description: "Cancela una tarea existente según su ID.",
                operationId: "cancelTask",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CancelTask"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Cancel Task"
                                        },
                                        data: {
                                            $ref: "#/components/schemas/Task"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/task/completeTask": {
            put: {
                tags: ["Tasks - Task"],
                summary: "Completar una tarea",
                description: "Marca una tarea existente como completada según su ID.",
                operationId: "completeTask",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CompleteTask"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Complete Task"
                                        },
                                        data: {
                                            $ref: "#/components/schemas/Task"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/task/reportTask": {
            post: {
                tags: ["Tasks - Task"],
                summary: "Reportar una tarea",
                description: "Reporta una tarea existente según su ID.",
                operationId: "reportTask",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ReportTask"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Report Task"
                                        },
                                        data: {
                                            $ref: "#/components/schemas/Task"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/task/exportTasksToXLSX": {
            post: {
                tags: ["Tasks - Task"],
                summary: "Exportar tareas a XLSX",
                description: "Exporta información de tareas en formato XLSX dentro del rango de fechas especificado.",
                operationId: "exportTasksToXLSX",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ExportTaskXLSX"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Iformacion obtenida correctamente"
                                        },
                                        data: {
                                            type: "string",
                                            example: "http://3.80.189.150:9000/api/task/tasksXlsxReport"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/task/exportTasksToPDF": {
            post: {
                tags: ["Tasks - Task"],
                summary: "Exportar tareas a PDF",
                description: "Exporta información de tareas en formato PDF dentro del rango de fechas especificado.",
                operationId: "exportTasksToPDF",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/ExportTaskPDF"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            example: true
                                        },
                                        msg: {
                                            type: "string",
                                            example: "Iformacion obtenida correctamente"
                                        },
                                        data: {
                                            type: "string",
                                            example: "http://3.80.189.150:9000/api/task/tasksPdfReport"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Solicitud incorrecta",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/task/tasksXlsxReport": {
            get: {
                tags: ["Tasks - Task"],
                summary: "Informe de tareas en formato XLSX",
                description: "Genera un informe de tareas en formato XLSX.",
                operationId: "tasksXlsxReport",
                responses: {
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "string",
                                    example: "Buffer data"
                                }
                            }
                        }
                    },
                    500: {
                        description: "Error del servidor",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/task/tasksPdfReport": {
            get: {
                tags: ["Tasks - Task"],
                summary: "Informe de tareas en formato PDF",
                description: "Genera un informe de tareas en formato PDF.",
                operationId: "tasksPdfReport",
                responses: {
                    200: {
                        description: "Solicitud exitosa",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "string",
                                    example: "Buffer data"
                                }
                            }
                        }
                    },
                    500: {
                        description: "Error del servidor",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Error"
                                }
                            }
                        }
                    }
                }
            }
        }
        
    }

};



export default swaggerDefinition;