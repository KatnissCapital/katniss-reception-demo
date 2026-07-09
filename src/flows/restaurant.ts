import { Flow } from "@/engine/types";

export const restaurantFlow: Flow = {
  id: "restaurant",
  initialStep: "menu",

  states: {
    menu: {
      question: "Hola, soy Katniss Reception. ¿Qué necesitas?",
      options: {
        "1": {
          label: "Reservar mesa",
          next: "booking_day",
        },
        "2": {
          label: "Cambiar reserva",
          next: "change_name",
        },
        "3": {
          label: "Cancelar reserva",
          next: "cancel_name",
        },
        "4": {
          label: "Más información de horarios",
          next: "opening_hours",
        },
        "5": {
          label: "Hablar con una persona",
          next: "human_contact",
        },
        "6": {
          label: "Salir / cerrar conversación",
          next: "goodbye",
        },
      },
    },

    booking_day: {
      question: "¿Qué día quieres reservar?",
      options: {
        "1": {
          label: "Martes",
          value: { day: "Martes" },
          next: "booking_service",
        },
        "2": {
          label: "Miércoles",
          value: { day: "Miércoles" },
          next: "booking_service",
        },
        "3": {
          label: "Jueves",
          value: { day: "Jueves" },
          next: "booking_service",
        },
        "4": {
          label: "Viernes",
          value: { day: "Viernes" },
          next: "booking_service",
        },
        "5": {
          label: "Sábado",
          value: { day: "Sábado" },
          next: "booking_service",
        },
        "6": {
          label: "Domingo",
          value: { day: "Domingo" },
          next: "booking_service",
        },
        "0": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    booking_service: {
      question: "¿Quieres reservar para comida o cena?",
      options: {
        "1": {
          label: "Comida",
          value: { service: "Comida" },
          next: "booking_time_lunch",
        },
        "2": {
          label: "Cena",
          value: { service: "Cena" },
          next: "booking_time_dinner",
        },
        "0": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    booking_time_lunch: {
      question: "¿Qué hora prefieres para comer?",
      options: {
        "1": {
          label: "13:00",
          value: { time: "13:00" },
          next: "booking_people",
        },
        "2": {
          label: "13:30",
          value: { time: "13:30" },
          next: "booking_people",
        },
        "3": {
          label: "14:00",
          value: { time: "14:00" },
          next: "booking_people",
        },
        "4": {
          label: "14:30",
          value: { time: "14:30" },
          next: "booking_people",
        },
        "0": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    booking_time_dinner: {
      question: "¿Qué hora prefieres para cenar?",
      options: {
        "1": {
          label: "20:30",
          value: { time: "20:30" },
          next: "booking_people",
        },
        "2": {
          label: "21:00",
          value: { time: "21:00" },
          next: "booking_people",
        },
        "3": {
          label: "21:30",
          value: { time: "21:30" },
          next: "booking_people",
        },
        "4": {
          label: "22:00",
          value: { time: "22:00" },
          next: "booking_people",
        },
        "0": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    booking_people: {
      question: "¿Para cuántas personas sería la reserva?",
      next: "booking_name",
      valueKey: "people",
    },

    booking_name: {
      question: "Perfecto. Escribe tu nombre para la solicitud de reserva.",
      next: "booking_phone",
      valueKey: "name",
    },

    booking_phone: {
      question: "Indica un teléfono de contacto.",
      next: "booking_confirm",
      valueKey: "phone",
    },

    booking_confirm: {
      question:
        "Vamos a tomar nota de tu petición. El restaurante revisará la disponibilidad y te enviará confirmación después.",
      options: {
        "1": {
          label: "Enviar solicitud de reserva",
          next: "booking_done",
          action: {
            name: "createRestaurantBookingRequest",
          },
        },
        "2": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    booking_done: {
      question:
        "✅ Solicitud de reserva recibida correctamente. Revisaremos disponibilidad y te enviaremos confirmación lo antes posible.",
      options: {
        "1": {
          label: "Volver al menú principal",
          next: "menu",
        },
        "2": {
          label: "Salir",
          next: "goodbye",
        },
      },
    },

    change_name: {
      question: "Escribe tu nombre para localizar la reserva que quieres cambiar.",
      next: "change_current_day",
      valueKey: "changeName",
    },

    change_current_day: {
      question: "¿Qué día tienes actualmente la reserva?",
      options: {
        "1": {
          label: "Martes",
          value: { currentDay: "Martes" },
          next: "change_new_day",
        },
        "2": {
          label: "Miércoles",
          value: { currentDay: "Miércoles" },
          next: "change_new_day",
        },
        "3": {
          label: "Jueves",
          value: { currentDay: "Jueves" },
          next: "change_new_day",
        },
        "4": {
          label: "Viernes",
          value: { currentDay: "Viernes" },
          next: "change_new_day",
        },
        "5": {
          label: "Sábado",
          value: { currentDay: "Sábado" },
          next: "change_new_day",
        },
        "6": {
          label: "Domingo",
          value: { currentDay: "Domingo" },
          next: "change_new_day",
        },
        "0": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    change_new_day: {
      question: "¿Qué nuevo día prefieres?",
      options: {
        "1": {
          label: "Martes",
          value: { newDay: "Martes" },
          next: "change_new_service",
        },
        "2": {
          label: "Miércoles",
          value: { newDay: "Miércoles" },
          next: "change_new_service",
        },
        "3": {
          label: "Jueves",
          value: { newDay: "Jueves" },
          next: "change_new_service",
        },
        "4": {
          label: "Viernes",
          value: { newDay: "Viernes" },
          next: "change_new_service",
        },
        "5": {
          label: "Sábado",
          value: { newDay: "Sábado" },
          next: "change_new_service",
        },
        "6": {
          label: "Domingo",
          value: { newDay: "Domingo" },
          next: "change_new_service",
        },
        "0": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    change_new_service: {
      question: "¿Quieres cambiar a comida o cena?",
      options: {
        "1": {
          label: "Comida",
          value: { newService: "Comida" },
          next: "change_new_time_lunch",
        },
        "2": {
          label: "Cena",
          value: { newService: "Cena" },
          next: "change_new_time_dinner",
        },
        "0": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    change_new_time_lunch: {
      question: "¿Qué nueva hora prefieres para comer?",
      options: {
        "1": {
          label: "13:00",
          value: { newTime: "13:00" },
          next: "change_confirm",
        },
        "2": {
          label: "13:30",
          value: { newTime: "13:30" },
          next: "change_confirm",
        },
        "3": {
          label: "14:00",
          value: { newTime: "14:00" },
          next: "change_confirm",
        },
        "4": {
          label: "14:30",
          value: { newTime: "14:30" },
          next: "change_confirm",
        },
        "0": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    change_new_time_dinner: {
      question: "¿Qué nueva hora prefieres para cenar?",
      options: {
        "1": {
          label: "20:30",
          value: { newTime: "20:30" },
          next: "change_confirm",
        },
        "2": {
          label: "21:00",
          value: { newTime: "21:00" },
          next: "change_confirm",
        },
        "3": {
          label: "21:30",
          value: { newTime: "21:30" },
          next: "change_confirm",
        },
        "4": {
          label: "22:00",
          value: { newTime: "22:00" },
          next: "change_confirm",
        },
        "0": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    change_confirm: {
      question:
        "Vamos a tomar nota de tu petición de cambio. El restaurante revisará disponibilidad y te confirmará si es posible.",
      options: {
        "1": {
          label: "Enviar solicitud de cambio",
          next: "change_done",
          action: {
            name: "changeRestaurantBookingRequest",
          },
        },
        "2": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    change_done: {
      question:
        "✅ Solicitud de cambio recibida correctamente. Revisaremos disponibilidad y te enviaremos confirmación lo antes posible.",
      options: {
        "1": {
          label: "Volver al menú principal",
          next: "menu",
        },
        "2": {
          label: "Salir",
          next: "goodbye",
        },
      },
    },

    cancel_name: {
      question: "Escribe tu nombre para localizar la reserva que quieres cancelar.",
      next: "cancel_day",
      valueKey: "cancelName",
    },

    cancel_day: {
      question: "¿Qué día tienes la reserva que quieres cancelar?",
      options: {
        "1": {
          label: "Martes",
          value: { cancelDay: "Martes" },
          next: "cancel_confirm",
        },
        "2": {
          label: "Miércoles",
          value: { cancelDay: "Miércoles" },
          next: "cancel_confirm",
        },
        "3": {
          label: "Jueves",
          value: { cancelDay: "Jueves" },
          next: "cancel_confirm",
        },
        "4": {
          label: "Viernes",
          value: { cancelDay: "Viernes" },
          next: "cancel_confirm",
        },
        "5": {
          label: "Sábado",
          value: { cancelDay: "Sábado" },
          next: "cancel_confirm",
        },
        "6": {
          label: "Domingo",
          value: { cancelDay: "Domingo" },
          next: "cancel_confirm",
        },
        "0": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    cancel_confirm: {
      question:
        "Vamos a tomar nota de tu petición de cancelación. ¿Confirmas que quieres cancelar la reserva indicada?",
      options: {
        "1": {
          label: "Enviar solicitud de cancelación",
          next: "cancel_done",
          action: {
            name: "cancelRestaurantBookingRequest",
          },
        },
        "2": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    cancel_done: {
      question:
        "✅ Solicitud de cancelación recibida correctamente. El restaurante revisará la reserva y te confirmará la cancelación.",
      options: {
        "1": {
          label: "Volver al menú principal",
          next: "menu",
        },
        "2": {
          label: "Salir",
          next: "goodbye",
        },
      },
    },

    opening_hours: {
      question:
        "El horario del restaurante es de martes a domingo. Comidas de 13:00 a 15:30 y cenas de 20:30 a 23:00. Los lunes cerramos por descanso.",
      options: {
        "1": {
          label: "Reservar mesa",
          next: "booking_day",
        },
        "2": {
          label: "Volver al menú principal",
          next: "menu",
        },
        "3": {
          label: "Salir",
          next: "goodbye",
        },
      },
    },

    human_contact: {
      question:
        "De acuerdo. Dejamos aviso para que una persona del restaurante contacte contigo.",
      options: {
        "1": {
          label: "Volver al menú principal",
          next: "menu",
        },
        "2": {
          label: "Salir",
          next: "goodbye",
        },
      },
    },

    goodbye: {
      question: "Gracias por contactar con el restaurante. Hasta pronto.",
      options: {},
    },
  },
};