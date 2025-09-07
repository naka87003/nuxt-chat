<script setup lang="ts">
defineProps<{
  chatId: string;
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
  delete: [];
}>();
</script>

<template>
  <UModal
    :open
    title="Delete chat"
    :ui="{ footer: 'justify-end' }"
    @update:open="emit('close')"
  >
    <template #body>
      <div class="space-y-2">Are you sure you want to delete this chat?</div>
    </template>

    <template #footer>
      <UButton color="neutral" variant="soft" @click="emit('close')">
        Cancel
      </UButton>
      <UButton color="neutral" @click="$emit('delete')"> Delete </UButton>
    </template>
  </UModal>
</template>
