import type { ExtractPropTypes } from 'vue';
import Utils from '../../shared/utils/date';

export const calendarItemProps = {
  type: {
    type: String,
    default: 'one',
  },
  isAutoBackFill: {
    type: Boolean,
    default: false,
  },
  poppable: {
    type: Boolean,
    default: true,
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
  showSubTitle: {
    type: Boolean,
    default: true,
  },
  showToday: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '',
  },
  confirmText: {
    type: String,
    default: '',
  },
  startText: {
    type: String,
    default: '',
  },
  endText: {
    type: String,
    default: '',
  },
  defaultValue: {
    type: [String, Array],
    default: null,
  },
  startDate: {
    type: String,
    default: Utils.getDay(0),
  },
  endDate: {
    type: String,
    default: Utils.getDay(365),
  },
};

export type CalendarItemProps = ExtractPropTypes<typeof calendarItemProps>;
