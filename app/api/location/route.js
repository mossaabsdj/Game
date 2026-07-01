import nodemailer from "nodemailer";

export async function POST(request) {
  const { latitude, longitude } = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: "saadsdj0@gmail.com",
    subject: "New Location",
    text: `
Latitude: ${latitude}
Longitude: ${longitude}

Google Maps:
${mapsLink}
`,
  });

  return Response.json({ success: true });
}
