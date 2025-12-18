<script setup lang="ts">
import { useCopy } from '@/composable/copy';
import { encodeToMorse, decodeFromMorse, isValidMorse } from './morse-code.service';
import { withDefaultOnError } from '@/utils/defaults';

const textInput = ref('');
const morseOutput = computed(() => encodeToMorse(textInput.value));
const { copy: copyMorse } = useCopy({ source: morseOutput, text: 'Morse code copied to the clipboard' });

const morseInput = ref('');
const textOutput = computed(() =>
  withDefaultOnError(() => decodeFromMorse(morseInput.value.trim()), ''),
);
const { copy: copyText } = useCopy({ source: textOutput, text: 'Text copied to the clipboard' });

const morseValidationRules = [
  {
    message: 'Invalid Morse code (only dots, dashes, spaces, and slashes allowed)',
    validator: (value: string) => isValidMorse(value.trim()),
  },
];
</script>

<template>
  <div grid grid-cols-1 gap-5>
    <c-card title="Text to Morse code">
      <c-input-text
        v-model:value="textInput"
        multiline
        placeholder="Enter text to encode..."
        rows="5"
        label="Text to encode"
        raw-text
        mb-5
      />

      <c-input-text
        label="Morse code"
        :value="morseOutput"
        multiline
        readonly
        placeholder="Morse code will appear here"
        rows="5"
        mb-5
      />

      <div flex justify-center>
        <c-button @click="copyMorse()">
          Copy Morse code
        </c-button>
      </div>
    </c-card>

    <c-card title="Morse code to Text">
      <c-input-text
        v-model:value="morseInput"
        multiline
        placeholder="Enter Morse code (dots '.' and dashes '-') separated by spaces, '/' for word separation..."
        rows="5"
        :validation-rules="morseValidationRules"
        label="Morse code to decode"
        mb-5
      />

      <c-input-text
        v-model:value="textOutput"
        label="Decoded text"
        placeholder="Decoded text will appear here"
        multiline
        rows="5"
        readonly
        mb-5
      />

      <div flex justify-center>
        <c-button @click="copyText()">
          Copy decoded text
        </c-button>
      </div>
    </c-card>
  </div>
</template>