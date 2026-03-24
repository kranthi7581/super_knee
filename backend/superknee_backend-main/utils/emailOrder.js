import { sendEmail } from "./emailUtils.js";
import orderPlacedTmpl from "../templates/orderPlaced.js";
import orderConfirmedTmpl from "../templates/orderConfirmed.js";
import orderShippedTmpl from "../templates/orderShipped.js";
import orderCancelledTmpl from "../templates/orderCancelled.js";

export const orderConfirmationTemplate = (userName, order) => {
  return orderConfirmedTmpl(userName, order);
};

export const orderPlacedTemplate = (userName, order) => {
  return orderPlacedTmpl(userName, order);
};

export const orderShippedTemplate = (userName, order, trackingNumber) => {
  return orderShippedTmpl(userName, order, trackingNumber);
};

export const orderCancelTemplate = (userName, order) => {
  return orderCancelledTmpl(userName, order);
};

export const sendOrderConfirmationEmail = async (user, order) => {
  const html = orderConfirmationTemplate(user.name, order);
  await sendEmail(user.email, "Super Health - Order Confirmation", html);
};

export const sendOrderPlacedEmail = async (user, order) => {
  const html = orderPlacedTemplate(user.name, order);
  await sendEmail(user.email, "Super Health - Order Placed Successfully", html);
};

export const sendOrderShippedEmail = async (user, order, trackingLink) => {
  const html = orderShippedTemplate(user.name, order, trackingLink);
  await sendEmail(user.email, "Super Health - Your Order has been Shipped", html);
};

export const sendOrderCancelEmail = async (user, order) => {
  const html = orderCancelTemplate(user.name, order);
  await sendEmail(user.email, "Super Health - Order Cancellation", html);
};