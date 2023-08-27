<template>
  <form class="vin-form" action="#" @submit.prevent="onSubmit">
    <vin-cell-group>
      <slot></slot>
    </vin-cell-group>
  </form>
</template>
<script lang="ts">
import { Component } from './common';

export default Component;
</script>

<style lang="scss">
@import './index.scss';
</style>
