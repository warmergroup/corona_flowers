<script setup lang="ts">
import {useAuthStore} from "~/store/auth.store";
import $axios from "~/http";

import type {IUser} from '~/interfaces';

const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();

const props = defineProps({
  user: {
    type: Object as PropType<IUser>,
    required: true,
  }
});

const logout = async () => {
  try {
    await $axios.post('/auth/logout');
    localStorage.removeItem('accessToken');
    authStore.clearAuthData()
    router.push('/auth');
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to log out',
      icon: 'material-symbols:error-rounded'
    });
  }
};

const items = [
  [{
    label: props.user.email,
    className: "text-blue-600",
  },
    {
      label: props.user.isActivated ? "User activated" : "Not Activated",
      icon: props.user.isActivated
        ? "i-heroicons-check-circle-20-solid"
        : "i-heroicons-exclamation-circle-20-solid",
      disabled: true,
      className: props.user.isActivated
        ? "text-green-400"
        : "text-red-400"
    },
  ],
  [{
    label: "Profile",
    icon: "i-heroicons-pencil-square-20-solid",
  },
    {
      label: "Logout",
      icon: "mi:log-out",
      click: () => logout(),
      className: "text-red-600",
    },
  ],
];
</script>

<template>
  <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" mode="click"
             :popper="{ placement: 'bottom-start' }">
    <UAvatar src="https://github.com/shadcn.png"/>
    <template #item="{ item }">
      <p :class="item.className" class="p-2">
        <UIcon v-if="item.icon" :name="item.icon"/>
        {{ item.label }}
      </p>
    </template>
  </UDropdown>
</template>
