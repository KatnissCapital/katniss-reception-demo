import { Flow } from "@/engine/types";

export const hairdresserFlow: Flow = {
  initialStep: "menu",

  states: {
    menu: {
      question: "Hola, soy Katniss Reception. ¿Qué necesitas?",
      options: {
        "1": {
          label: "Reservar cita",
          next: "booking_service",
        },
        "2": {
          label: "Cambiar cita",
          next: "change_name",
        },
        "3": {
          label: "Cancelar cita",
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

    booking_service: {
      question: "¿Qué servicio quieres reservar?",
      options: {
        "1": {
          label: "Corte",
          value: { service: "Corte" },
          next: "booking_day",
        },
        "2": {
          label: "Color",
          value: { service: "Color" },
          next: "booking_day",
        },
        "3": {
          label: "Peinado",
          value: { service: "Peinado" },
          next: "booking_day",
        },
        "0": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    booking_day: {
      question: "¿Qué día te va bien?",
      options: {
        "1": {
          label: "Martes",
          value: { day: "Martes" },
          next: "booking_slot",
        },
        "2": {
          label: "Miércoles",
          value: { day: "Miércoles" },
          next: "booking_slot",
        },
        "3": {
          label: "Jueves",
          value: { day: "Jueves" },
          next: "booking_slot",
        },
        "4": {
          label: "Viernes",
          value: { day: "Viernes" },
          next: "booking_slot",
        },
        "5": {
          label: "Sábado",
          value: { day: "Sábado" },
          next: "booking_slot",
        },
        "0": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    booking_slot: {
      question: "¿Prefieres mañana o tarde?",
      options: {
        "1": {
          label: "Mañana, entre 9:00 y 13:00",
          value: { slot: "Mañana" },
          next: "booking_time_morning",
        },
        "2": {
          label: "Tarde, entre 16:00 y 19:00",
          value: { slot: "Tarde" },
          next: "booking_time_afternoon",
        },
        "0": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    booking_time_morning: {
      question: "¿Qué hora de la mañana prefieres?",
      options: {
        "1": {
          label: "9:00",
          value: { time: "9:00" },
          next: "booking_name",
        },
        "2": {
          label: "10:00",
          value: { time: "10:00" },
          next: "booking_name",
        },
        "3": {
          label: "11:00",
          value: { time: "11:00" },
          next: "booking_name",
        },
        "4": {
          label: "12:00",
          value: { time: "12:00" },
          next: "booking_name",
        },
        "0": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    booking_time_afternoon: {
      question: "¿Qué hora de la tarde prefieres?",
      options: {
        "1": {
          label: "16:00",
          value: { time: "16:00" },
          next: "booking_name",
        },
        "2": {
          label: "17:00",
          value: { time: "17:00" },
          next: "booking_name",
        },
        "3": {
          label: "18:00",
          value: { time: "18:00" },
          next: "booking_name",
        },
        "4": {
          label: "19:00",
          value: { time: "19:00" },
          next: "booking_name",
        },
        "0": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    booking_name: {
      question: "Perfecto. Escribe tu nombre para la solicitud de cita.",
      next: "booking_confirm",
      valueKey: "name",
    },

    booking_confirm: {
      question:
        "Vamos a tomar nota de tu petición. La peluquería revisará la disponibilidad en la agenda y te enviará confirmación después.",
      options: {
        "1": {
          label: "Enviar solicitud de cita",
          next: "booking_done",
          action: {
            name: "createAppointmentRequest",
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
        "✅ Solicitud recibida correctamente. Revisaremos la agenda y te enviaremos confirmación lo antes posible.",
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
      question: "Escribe tu nombre para localizar la cita que quieres cambiar.",
      next: "change_current_day",
      valueKey: "changeName",
    },

    change_current_day: {
      question: "¿Qué día tienes actualmente la cita?",
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
          next: "change_new_slot",
        },
        "2": {
          label: "Miércoles",
          value: { newDay: "Miércoles" },
          next: "change_new_slot",
        },
        "3": {
          label: "Jueves",
          value: { newDay: "Jueves" },
          next: "change_new_slot",
        },
        "4": {
          label: "Viernes",
          value: { newDay: "Viernes" },
          next: "change_new_slot",
        },
        "5": {
          label: "Sábado",
          value: { newDay: "Sábado" },
          next: "change_new_slot",
        },
        "0": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    change_new_slot: {
      question: "¿Prefieres mañana o tarde?",
      options: {
        "1": {
          label: "Mañana, entre 9:00 y 13:00",
          value: { newSlot: "Mañana" },
          next: "change_new_time_morning",
        },
        "2": {
          label: "Tarde, entre 16:00 y 19:00",
          value: { newSlot: "Tarde" },
          next: "change_new_time_afternoon",
        },
        "0": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    change_new_time_morning: {
      question: "¿Qué nueva hora de la mañana prefieres?",
      options: {
        "1": {
          label: "9:00",
          value: { newTime: "9:00" },
          next: "change_confirm",
        },
        "2": {
          label: "10:00",
          value: { newTime: "10:00" },
          next: "change_confirm",
        },
        "3": {
          label: "11:00",
          value: { newTime: "11:00" },
          next: "change_confirm",
        },
        "4": {
          label: "12:00",
          value: { newTime: "12:00" },
          next: "change_confirm",
        },
        "0": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    change_new_time_afternoon: {
      question: "¿Qué nueva hora de la tarde prefieres?",
      options: {
        "1": {
          label: "16:00",
          value: { newTime: "16:00" },
          next: "change_confirm",
        },
        "2": {
          label: "17:00",
          value: { newTime: "17:00" },
          next: "change_confirm",
        },
        "3": {
          label: "18:00",
          value: { newTime: "18:00" },
          next: "change_confirm",
        },
        "4": {
          label: "19:00",
          value: { newTime: "19:00" },
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
        "Vamos a tomar nota de tu petición de cambio. La peluquería revisará la agenda y te confirmará si es posible.",
      options: {
        "1": {
          label: "Enviar solicitud de cambio",
          next: "change_done",
          action: {
            name: "changeAppointmentRequest",
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
        "✅ Solicitud de cambio recibida correctamente. Revisaremos la agenda y te enviaremos confirmación lo antes posible.",
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
      question: "Escribe tu nombre para localizar la cita que quieres cancelar.",
      next: "cancel_day",
      valueKey: "cancelName",
    },

    cancel_day: {
      question: "¿Qué día tienes la cita que quieres cancelar?",
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
        "0": {
          label: "Volver al menú principal",
          next: "menu",
        },
      },
    },

    cancel_confirm: {
      question:
        "Vamos a tomar nota de tu petición de cancelación. ¿Confirmas que quieres cancelar la cita indicada?",
      options: {
        "1": {
          label: "Enviar solicitud de cancelación",
          next: "cancel_done",
          action: {
            name: "cancelAppointmentRequest",
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
        "✅ Solicitud de cancelación recibida correctamente. La peluquería revisará la agenda y te confirmará la cancelación.",
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
        "El horario de la peluquería es de martes a viernes de 9:00 a 13:00 y de 16:00 a 19:00. Los sábados abrimos de 9:00 a 13:00.",
      options: {
        "1": {
          label: "Reservar cita",
          next: "booking_service",
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
        "De acuerdo. Dejamos aviso para que una persona del equipo contacte contigo.",
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
      question: "Gracias por contactar con la peluquería. Hasta pronto.",
      options: {},
    },
  },
};