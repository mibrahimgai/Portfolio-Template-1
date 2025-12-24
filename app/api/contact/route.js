import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const { firstName, lastName, email, phone, company, message, newsletter } = await req.json();

        // Check if environment variables are set for actual email sending
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail', // or your preferred service
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: email, // Sender address (client's email) - Note: Gmail might override this to be the authenticated user
                to: 'gaimran414@gmail.com',
                replyTo: email,
                subject: `New Contact Form Message from ${firstName} ${lastName}`,
                text: `
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Company: ${company}
Newsletter: ${newsletter ? 'Yes' : 'No'}

Message:
${message}
                `,
            };

            await transporter.sendMail(mailOptions);
            return new Response(JSON.stringify({ success: true, message: 'Email sent successfully' }), { status: 200 });

        } else {
            // Development fallback when no credentials are provided
            console.log('--- MOCK EMAIL SEND ---');
            console.log(`To: gaimran414@gmail.com`);
            console.log(`From: ${firstName} ${lastName} <${email}>`);
            console.log(`Phone: ${phone}`);
            console.log(`Company: ${company}`);
            console.log(`Newsletter: ${newsletter ? 'Yes' : 'No'}`);
            console.log(`Message: ${message}`);
            console.log('-----------------------');

            return new Response(JSON.stringify({ success: true, message: 'Mock email sent (check server console)' }), { status: 200 });
        }

    } catch (error) {
        console.error('Email send error:', error);
        return new Response(JSON.stringify({ success: false, message: 'Failed to send email' }), { status: 500 });
    }
}
