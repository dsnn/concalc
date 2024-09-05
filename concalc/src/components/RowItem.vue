<template>
  <div class="item">
    <i class="icon">
      <slot name="icon" />
    </i>
    <div class="details">
      <span class="heading">
        <slot name="heading" />
      </span>
      <div class="value">
        <slot name="value" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  text-align: left;
  padding: 0.5rem 0;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
  width: 100%;
}

.icon {
  display: flex;
  place-items: center;
  place-content: center;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  background: var(--color-background);
  border-radius: 8px;
  width: 32px;
  height: 32px;
}

.details {
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
}

.heading {
  font-size: medium;
  color: var(--color-heading);
}

.value {
  font-size: medium;
  color: var(--color-text);
}
</style>
