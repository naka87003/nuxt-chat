<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const {
  chat: chatFromChats,
  messages,
  sendMessage,
  fetchMessages,
  deleteChat,
} = useChat(route.params.id as string);

const { createChatAndNavigate } = useChats();

await fetchMessages();

if (!chatFromChats.value) {
  await navigateTo(`/projects/${route.params.projectId}`, {
    replace: true,
  });
}

const chat = computed(() => chatFromChats.value as Chat);
const typing = ref(false);

const handleSendMessage = async (message: string) => {
  typing.value = true;
  await sendMessage(message);
  typing.value = false;
};

const appConfig = useAppConfig();
const title = computed(() =>
  chat.value?.title
    ? `${chat.value.title} - ${appConfig.title}`
    : appConfig.title
);

async function onDelete() {
  await deleteChat();
  return createChatAndNavigate({ projectId: String(route.params.projectId) });
}

useHead({
  title,
});
</script>

<template>
  <ChatWindow
    :typing
    :chat
    :messages
    @send-message="handleSendMessage"
    @delete="onDelete"
  />
</template>
