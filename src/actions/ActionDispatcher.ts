import { Action, Answers } from "@/engine/types";

export async function dispatchAction(
  action: Action,
  answers: Answers
): Promise<string> {
  if (action.name === "createAppointmentRequest") {
    console.log("Solicitud de cita recibida:", answers);
    return "📩 Hemos recibido tu solicitud de cita.";
  }

  if (action.name === "changeAppointmentRequest") {
    console.log("Solicitud de cambio de cita recibida:", answers);
    return "📩 Hemos recibido tu solicitud de cambio de cita.";
  }

  if (action.name === "cancelAppointmentRequest") {
    console.log("Solicitud de cancelación de cita recibida:", answers);
    return "📩 Hemos recibido tu solicitud de cancelación.";
  }

  if (action.name === "createRestaurantBookingRequest") {
    console.log("Solicitud de reserva de restaurante recibida:", answers);
    return "📩 Hemos recibido tu solicitud de reserva.";
  }

  if (action.name === "changeRestaurantBookingRequest") {
    console.log("Solicitud de cambio de reserva recibida:", answers);
    return "📩 Hemos recibido tu solicitud de cambio de reserva.";
  }

  if (action.name === "cancelRestaurantBookingRequest") {
    console.log("Solicitud de cancelación de reserva recibida:", answers);
    return "📩 Hemos recibido tu solicitud de cancelación de reserva.";
  }

  console.log("Acción no reconocida:", action, answers);
  return "Hemos recibido tu solicitud.";
}