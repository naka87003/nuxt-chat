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

async function handleError() {
  await navigateTo("/", { replace: true });
}

const { deleteChat } = useChat(chat.value.id);

async function onDelete() {
  await navigateTo("/chats/");
  await deleteChat();
}

useHead({
  title,
});
</script>
<template>
  <NuxtErrorBoundary>
    <ChatWindow
      :messages
      :chat
      :typing
      @send-message="handleSendMessage"
      @delete="onDelete"
    />
    <template #error="{ error }">
      <UContainer class="flex justify-center items-center h-full p-4">
        <UCard variant="soft" class="min-w-md">
          <template #header>
            <h1 class="text-lg font-bold">Error</h1>
          </template>
          <p>{{ error.message }}</p>
          <UButton
            class="mt-4"
            color="primary"
            variant="soft"
            icon="i-heroicons-arrow-left"
            @click="handleError"
          >
            Go back home
          </UButton>
        </UCard>
      </UContainer>
    </template>
  </NuxtErrorBoundary>
</template>
