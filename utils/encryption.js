const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
let key = process.env.ENCRYPTION_KEY;

if (!key) {
  throw new Error("ENCRYPTION_KEY is not defined");
}

key = crypto.createHash('sha256').update(key).digest(); 

exports.encrypt = (text) => {
  const iv = crypto.randomBytes(16); 
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};

exports.decrypt = (text) => {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = textParts.join(':');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
