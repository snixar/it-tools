// Morse code mapping (International Morse Code)
const morseMap: Record<string, string> = {
  'A': '.-',
  'B': '-...',
  'C': '-.-.',
  'D': '-..',
  'E': '.',
  'F': '..-.',
  'G': '--.',
  'H': '....',
  'I': '..',
  'J': '.---',
  'K': '-.-',
  'L': '.-..',
  'M': '--',
  'N': '-.',
  'O': '---',
  'P': '.--.',
  'Q': '--.-',
  'R': '.-.',
  'S': '...',
  'T': '-',
  'U': '..-',
  'V': '...-',
  'W': '.--',
  'X': '-..-',
  'Y': '-.--',
  'Z': '--..',
  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  '.': '.-.-.-',
  ',': '--..--',
  '?': '..--..',
  "'": '.----.',
  '!': '-.-.--',
  '/': '-..-.',
  '(': '-.--.',
  ')': '-.--.-',
  '&': '.-...',
  ':': '---...',
  ';': '-.-.-.',
  '=': '-...-',
  '+': '.-.-.',
  '-': '-....-',
  '_': '..--.-',
  '"': '.-..-.',
  '$': '...-..-',
  '@': '.--.-.',
  ' ': '/', // word separator
};

// Reverse mapping
const reverseMorseMap: Record<string, string> = {};
Object.entries(morseMap).forEach(([char, code]) => {
  reverseMorseMap[code] = char;
});

/**
 * Encode text to Morse code.
 * @param text - Input text (uppercase letters, numbers, punctuation)
 * @returns Morse code with spaces between characters and '/' between words.
 */
export function encodeToMorse(text: string): string {
  return text
    .toUpperCase()
    .split('')
    .map(char => morseMap[char] || char)
    .join(' ')
    .replace(/ \/ /g, '/'); // normalize word separator
}

/**
 * Decode Morse code to text.
 * @param morse - Morse code with spaces between characters and '/' between words.
 * @returns Decoded text.
 */
export function decodeFromMorse(morse: string): string {
  return morse
    .split(' ')
    .map(code => reverseMorseMap[code] || code)
    .join('')
    .replace(/\//g, ' ');
}

/**
 * Check if a string is valid Morse code (only dots, dashes, spaces, slashes).
 */
export function isValidMorse(morse: string): boolean {
  return /^[.\-\s/]*$/.test(morse);
}