<template>
  <app-page-layout title="日历">
    <view class="h2">基础用法</view>
    <view>
      <vin-cell
        :show-icon="true"
        title="选择单个日期"
        :desc="date ? `${date} ${dateWeek}` : '请选择'"
        @click="openSwitch('isVisible')"
      >
      </vin-cell>
      <vin-calendar
        v-model:visible="isVisible"
        :default-value="date"
        @close="closeSwitch('isVisible')"
        @choose="setChooseValue"
        :start-date="`2022-01-11`"
        :end-date="`2022-11-11`"
      >
      </vin-calendar>
    </view>

    <view>
      <vin-cell
        :show-icon="true"
        title="选择日期区间"
        :desc="date1 ? `${date1[0]}至${date1[1]}` : '请选择'"
        @click="openSwitch('isVisible1')"
      >
      </vin-cell>
      <vin-calendar
        v-model:visible="isVisible1"
        :default-value="date1"
        type="range"
        :start-date="`2019-12-22`"
        :end-date="`2021-01-08`"
        @close="closeSwitch('isVisible1')"
        @choose="setChooseValue1"
        @select="select"
      >
      </vin-calendar>
    </view>

    <view class="h2">快捷选择</view>
    <view>
      <vin-cell
        :show-icon="true"
        title="选择单个日期"
        :desc="date3 ? date3 : '请选择'"
        @click="openSwitch('isVisible3')"
      >
      </vin-cell>
      <vin-calendar
        v-model:visible="isVisible3"
        @close="closeSwitch('isVisible3')"
        @choose="setChooseValue3"
        :default-value="date3"
        :start-date="null"
        :end-date="null"
        :is-auto-back-fill="true"
      >
      </vin-calendar>
    </view>
    <view>
      <vin-cell
        :show-icon="true"
        title="选择日期范围"
        @click="openSwitch('isVisible4')"
        :desc="date4 ? `${date4[0]}至${date4[1]}` : '请选择'"
      >
      </vin-cell>
      <vin-calendar
        v-model:visible="isVisible4"
        :default-value="date4"
        type="range"
        :start-date="`2022-01-01`"
        :end-date="`2022-12-31`"
        @close="closeSwitch('isVisible4')"
        @choose="setChooseValue4"
        :is-auto-back-fill="true"
      >
      </vin-calendar>
    </view>
    <view class="h2">自定义日历</view>
    <view>
      <vin-cell
        :show-icon="true"
        title="自定义按钮"
        :desc="date5 && date5[0] ? `${date5[0]}至${date5[1]}` : '请选择'"
        @click="openSwitch('isVisible5')"
      >
      </vin-cell>
      <vin-calendar
        v-model:visible="isVisible5"
        :default-value="date5"
        type="range"
        @close="closeSwitch('isVisible5')"
        @choose="setChooseValue5"
      >
        <template v-slot:btn>
          <view class="wrapper">
            <view class="d_div"> <text class="d_btn" @click="clickBtn">最近七天</text></view>
            <view class="d_div"> <text class="d_btn" @click="clickBtn1">当月</text></view>
          </view>
        </template>
        <template v-slot:day="date">
          <text>{{ date.date.day }}</text>
        </template>
      </vin-calendar>
    </view>
    <view>
      <vin-cell
        :show-icon="true"
        title="自定义时间文案"
        :desc="date6 && date6[0] ? `${date6[0]}至${date6[1]}` : '请选择'"
        @click="openSwitch('isVisible6')"
      >
      </vin-cell>
      <vin-calendar
        v-model:visible="isVisible6"
        :default-value="date6"
        type="range"
        @close="closeSwitch('isVisible6')"
        @choose="setChooseValue6"
        :start-date="`2022-01-01`"
        :end-date="`2022-12-31`"
        confirm-text="submit"
        start-text="入店"
        end-text="离店"
        title="日期选择"
      >
        <template v-slot:day="date">
          <text>{{ date.date.day <= 9 ? '0' + date.date.day : date.date.day }}</text>
        </template>
        <template v-slot:bottomInfo="date">
          <text class="info">{{
            date.date ? (date.date.day <= 10 ? '上旬' : date.date.day <= 20 ? '中旬' : '下旬') : ''
          }}</text>
        </template>
      </vin-calendar>
    </view>
    <view class="h2">平铺展示</view>
    <view class="test-calendar-wrapper">
      <vin-calendar
        :poppable="false"
        :default-value="date2"
        :is-auto-back-fill="true"
        @choose="setChooseValue2"
      >
      </vin-calendar>
    </view>
  </app-page-layout>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import Utils from '@/utils/date';
import { createComponent } from '@/utils/create';

const { createDemo } = createComponent('calendar');

interface TestCalendarState {
  isVisible: boolean;
  date: string;
  dateWeek: string;
  isVisible1: boolean;
  isVisible2: boolean;
  isVisible3: boolean;
  isVisible4: boolean;
  isVisible5: boolean;
  isVisible6: boolean;
  date1: string[];
  date2: string;
  date3: string;
  date4: string[];
  date5: string[];
  date6: string[];
}
export default createDemo({
  props: {},
  setup() {
    const state: TestCalendarState = reactive({
      isVisible: false,
      date: '',
      dateWeek: '',
      date1: ['2019-12-23', '2019-12-26'],
      date2: '2020-07-08',
      date3: '',
      date4: ['2021-12-23', '2021-12-26'],
      date5: ['2021-12-23', '2021-12-26'],
      date6: [],
      isVisible1: false,
      isVisible2: false,
      isVisible3: false,
      isVisible4: false,
      isVisible5: false,
      isVisible6: false,
    });
    const openSwitch = (param: string) => {
      state[`${param}`] = true;
    };

    const closeSwitch = (param: string) => {
      state[`${param}`] = false;
    };

    const setChooseValue = (param: string) => {
      state.date = param[3];
      state.dateWeek = param[4];
    };

    const select = (param: string) => {
      console.log(param);
    };
    const setChooseValue1 = (param: string) => {
      state.date1 = [...[param[0][3], param[1][3]]];
    };

    const setChooseValue2 = (param: string) => {
      state.date2 = param[3];
    };

    const setChooseValue3 = (param: string) => {
      state.date3 = param[3];
    };
    const setChooseValue4 = (param: string) => {
      state.date4 = [...[param[0][3], param[1][3]]];
    };

    const setChooseValue5 = (param: string) => {
      state.date5 = [...[param[0][3], param[1][3]]];
    };
    const setChooseValue6 = (param: string) => {
      state.date6 = [...[param[0][3], param[1][3]]];
    };
    const clickBtn = () => {
      const date = [Utils.date2Str(new Date()), Utils.getDay(6)];
      state.date5 = date;
    };
    const clickBtn1 = () => {
      const date = new Date();
      const year = date.getFullYear();
      let month: any = date.getMonth() + 1;
      month = month < 10 ? `0${month}` : `${month}`;
      const yearMonth = `${year}-${month}`;
      const currMonthDays = Utils.getMonthDays(`${year}`, `${month}`);
      state.date5 = [`${yearMonth}-01`, `${yearMonth}-${currMonthDays}`];
    };
    return {
      ...toRefs(state),
      openSwitch,
      closeSwitch,
      setChooseValue,
      setChooseValue1,
      setChooseValue2,
      setChooseValue3,
      setChooseValue4,
      setChooseValue5,
      setChooseValue6,
      clickBtn,
      clickBtn1,
      select,
    };
  },
});
</script>

<style lang="scss">
.test-calendar-wrapper {
  display: flex;
  width: 100%;
  height: 560px;
  overflow: hidden;
}
.wrapper {
  display: flex;
  padding: 0 40px;
}
.d_div {
  margin: 0px 5px;
  .d_btn {
    background: #fa3f19;
    color: #fff;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 4px;
    display: inline-block;
    height: 16px;
  }
}
.info {
  font-size: 12px;
  line-height: 14px;
}
</style>
