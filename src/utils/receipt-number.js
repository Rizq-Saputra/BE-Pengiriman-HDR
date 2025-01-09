function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateReceiptNumber(orderId) {
    const now = new Date();
    // Extract timestamp components (MMDDHHmmss)
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month (01-12)
    const day = String(now.getDate()).padStart(2, '0'); // Day (01-31)
    const hours = String(now.getHours()).padStart(2, '0'); // Hours (00-23)
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Minutes (00-59)
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Seconds (00-59)
    const timestamp = `${month}${day}${hours}${minutes}${seconds}`; // MMDDHHmmss

    // Shuffle the timestamp digits
    const shuffledTimestamp = shuffleArray(timestamp.split('')).join('');

    // Combine into receipt number: KT + shuffled timestamp + order ID
    return `KT${shuffledTimestamp}${orderId}`;
}

module.exports = generateReceiptNumber;