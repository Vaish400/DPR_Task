// In a real app you would call your backend or
// a service like SendGrid, Resend, EmailJS etc.
// Here we just simulate a small delay.

export function sendLoginEmail(toEmail) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[mock-email] Sent login notification to ${toEmail}`);
      resolve();
    }, 700);
  });
}

export function sendWelcomeEmail(toEmail) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[mock-email] Sent welcome email to ${toEmail}`);
      resolve();
    }, 700);
  });
}

