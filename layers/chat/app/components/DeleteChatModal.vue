<script setup lang="ts">
const props = defineProps<{
  chatId: string;
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const { deleteChat } = useChat(props.chatId);

const { createChatAndNavigate } = useChats();

async function handleDeleteChat() {
  await createChatAndNavigate();
  await deleteChat();
}
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
      <UButton color="neutral" @click="handleDeleteChat"> Delete </UButton>
    </template>
  </UModal>
</template>
