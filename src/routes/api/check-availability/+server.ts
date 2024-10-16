import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import twilio from 'twilio';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, TWILIO_RECIPIENT_NUMBER, AMAZON_URL } from '$env/static/private';

const sendSMS = async (message: string) => {
    const accountSid = TWILIO_ACCOUNT_SID;
    const authToken = TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    client.messages.create({
        body: message,
        from: TWILIO_PHONE_NUMBER,
        to: TWILIO_RECIPIENT_NUMBER ?? ""
    })
    .then(msg => console.log(msg.sid));
}

export const GET: RequestHandler = async ({ request }) => {
    const isCronJob: string = request.headers.get('x-cron') ?? 'yes';
    let availability = false;
    const url = AMAZON_URL?.toString() ?? "https://www.amazon.ca/dp/B0C4W1PLSS";

    await fetch(url).then(async (resp) => {
        if(resp.status === 200) {
            availability = true;
        } else if(resp.status === 404) {
            availability = false;
        }
        if (isCronJob !== 'no') {
            const message = availability ? "Available" : "Not available";
            await sendSMS(`Amazon article availability: ${message}`);
        }
    }).catch((error) => {
        console.error(error);
        throw error;
    });

    return json({ availability });
}