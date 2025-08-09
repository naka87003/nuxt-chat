<script setup lang="ts">
const route = useRoute();
const {
  chat: chatFromChats,
  messages,
  sendMessage,
  fetchMessages,
} = useChat(route.params.id as string);

await fetchMessages();

if (!chatFromChats.value) {
  await navigateTo("/", { replace: true });
}

const chat = computed(() => chatFromChats.value as Chat);

const appConfig = useAppConfig();

const typing = ref(false);

const handleSendMessage = async (message: string) => {
  typing.value = true;
  await sendMessage(message);
  typing.value = false;
};

const title = computed(() =>
  chatFromChats.value?.title
    ? `${chatFromChats.value.title} - ${appConfig.title}`
    : appConfig.title
);
useHead({
  title,
});
</script>
<template>
  <ChatWindow :messages :chat :typing @send-message="handleSendMessage" />
</template>
