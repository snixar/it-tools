import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: translate('tools.morse-code.title'),
  path: '/morse-code',
  description: translate('tools.morse-code.description'),
  keywords: ['morse', 'code', 'encode', 'decode', 'telegraph', 'dots', 'dashes'],
  component: () => import('./morse-code.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('2025-12-18'),
});