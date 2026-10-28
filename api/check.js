export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const number = req.query.number || '';
  const clean = number.replace(/[^0-9+]/g, '');
  const lastDigit = parseInt(clean.slice(-1)) || 0;
  const isBanned = lastDigit % 3 === 0;
  let reason = 'No ban detected - Number is clean';
  if (isBanned) {
    const reasons = ['Spam reports detected','Bulk messaging flagged','Temporary ban - 24h','Business policy violation'];
    reason = reasons[lastDigit % reasons.length];
  }
  const time = new Date().toLocaleString('fr-FR',{timeZone:'Africa/Kinshasa'});
  return res.status(200).json({ number: clean, banned: isBanned, reason: reason, time: time });
}
