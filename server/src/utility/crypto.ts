import crypto from 'crypto';
import { razorPay_KEY_SECRET } from '../config';


const algorithm = 'aes-256-cbc';
const key = Buffer.from('c3ab8ff13720e8ad9047dd39466b3c89e326d22e3b9e9d8b973aff4b0ebd156e', 'hex');  // 32-byte key
const iv = Buffer.from('5b6925cc5f52b6c62c8b93d18d2bc911', 'hex');


export function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return (iv.toString('hex') + ':' + encrypted.toString('hex'));
}

export function decrypt(text) {
    let textParts = text.split(':');
    console.log(textParts);
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    console.log(encryptedText)
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

export async function generatedSignature(razorpayOrderId, razorpayPaymentId) {
    const keySecret = razorPay_KEY_SECRET;
    const body = razorpayOrderId + "|" + razorpayPaymentId;
    if (!keySecret) {
        throw new Error(
            'Razorpay key secret is not defined in environment variables.'
        );
    }
    const sig = crypto
        .createHmac('sha256', keySecret)
        .update(body.toString())
        .digest('hex');

    return sig;
};
