<script setup lang="ts">
const props = defineProps<{
  projectId: string;
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const { deleteProject } = useProject(props.projectId);
const { refreshProjects } = useProjects();

async function handleDeleteProject() {
  await deleteProject();
  await refreshProjects();
  await navigateTo("/chats/");
}
</script>

<template>
  <UModal
    :open
    title="Delete project"
    :ui="{ footer: 'justify-end' }"
    @update:open="emit('close')"
  >
    <template #body>
      <div class="space-y-2">Are you sure you want to delete this project?</div>
    </template>

    <template #footer>
      <UButton color="neutral" variant="soft" @click="emit('close')">
        Cancel
      </UButton>
      <UButton color="neutral" @click="handleDeleteProject"> Delete </UButton>
    </template>
  </UModal>
</template>
