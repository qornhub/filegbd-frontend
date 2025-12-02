<template>
  <!-- Sidebar as drawer on mobile, static on desktop -->
  <aside
    :class="[
      // base
      'h-screen bg-gradient-to-b from-white to-neutral-50 border-r border-neutral-200',
      'flex flex-col overflow-hidden',
      // drawer behavior
      'fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-200',
      'md:relative md:w-80 md:translate-x-0 md:transform-none',
      // mobile open/close
      mobileOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <!-- Header: FileGBD -->
    <div
      class="px-4 py-3 md:px-6 md:py-5 flex items-center justify-between border-b border-neutral-200"
    >
      <div class="inline-flex flex-col gap-0.5 md:gap-1">
        <span
          class="text-[9px] md:text-[10px] uppercase tracking-[0.22em] md:tracking-[0.25em] text-neutral-500"
        >
          File
        </span>
        <div class="flex items-center gap-2">
          <span class="text-lg md:text-xl font-bold tracking-tight text-neutral-900">
            GBD
          </span>
          <span class="text-[11px] md:text-xs font-medium text-neutral-500 tracking-wide">
            Notes
          </span>
        </div>
      </div>

      <!-- Mobile close button -->
      <button
        class="md:hidden p-2 rounded-full hover:bg-neutral-100 text-neutral-600"
        @click="emit('close-mobile')"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Create + Search Section (fixed) -->
    <div
      class="px-4 py-3 md:px-6 md:py-4 border-b border-neutral-200 space-y-3 md:space-y-4 flex-shrink-0"
    >
      <!-- Create Button (with hover rotate + gradient) -->
      <button
        @click="emit('create')"
        @mouseenter="createHover = true"
        @mouseleave="createHover = false"
        class="w-full flex items-center justify-center gap-2 bg-black text-white 
               font-semibold py-2.5 md:py-3 rounded-xl hover:bg-neutral-900 transition-all duration-300
               group relative overflow-hidden text-sm"
      >
        <span class="relative z-10 flex items-center gap-2">
          <svg
            class="w-4 h-4 transition-transform duration-300 group-hover:rotate-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span class="hidden sm:inline">Create note</span>
          <span class="sm:hidden">New</span>
        </span>

        <!-- Gradient overlay effect -->
        <span
          v-if="createHover"
          class="absolute inset-0 bg-gradient-to-r from-black to-neutral-800 
                 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></span>
      </button>

      <!-- Search Box -->
      <div class="relative">
        <div class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          v-model="searchQuery"
          @input="emit('search', searchQuery)"
          type="text"
          placeholder="Search notes..."
          class="w-full bg-white border-2 border-neutral-300 rounded-xl pl-9 pr-9 py-2 
                 text-xs md:text-sm placeholder-neutral-400 focus:outline-none focus:border-black 
                 focus:ring-2 focus:ring-black/10 transition-all"
        />

        <!-- Clear Search -->
        <button
          v-if="searchQuery"
          @click="clearSearch"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Notes Header + Count -->
    <div
      class="px-4 py-2 md:px-6 md:py-2.5 border-b border-neutral-200 flex items-center justify-between"
    >
      <div class="flex items-center gap-2">
        <h3 class="text-xs md:text-sm font-semibold text-neutral-900">Your Notes</h3>
        <span
          class="px-1.5 md:px-2 py-0.5 text-[11px] md:text-xs bg-neutral-100 text-neutral-600 rounded-full"
        >
          {{ notes.length }}
        </span>
      </div>
    </div>

    <!-- Notes List (scrollable, only this part scrolls) -->
    <div class="flex-1 overflow-y-auto pt-1 pb-2">
      <div v-if="notes.length === 0" class="px-4 md:px-6 py-5 text-center">
        <p class="text-xs md:text-sm text-neutral-600 mb-2">No notes yet</p>
        <button
          @click="emit('create')"
          class="text-xs text-black font-medium hover:text-neutral-700"
        >
          Create your first note
        </button>
      </div>

      <ul class="px-1.5 md:px-2 py-2 space-y-1">
        <li
          v-for="note in notes"
          :key="note.id"
          class="group px-3 md:px-4 py-2 md:py-2.5 rounded-xl mx-1.5 md:mx-2 cursor-pointer flex items-center gap-3
                 transition-all duration-200 hover:bg-neutral-100"
          :class="note.id === selectedId
            ? 'bg-neutral-100 border-l-4 border-black'
            : 'hover:border-l-2 hover:border-neutral-300'"
        >
          <!-- Note main area (title + date only) -->
          <div class="flex-1 min-w-0" @click="emit('select', note)">
            <div class="text-xs md:text-sm font-medium truncate text-neutral-900">
              {{ note.title || 'Untitled Note' }}
            </div>
            <div class="text-[11px] md:text-xs text-neutral-500">
              {{ formatDate(note.created_at) }}
            </div>
          </div>

          <!-- 3-dot menu -->
          <div class="relative flex-shrink-0">
            <button
              @click.stop="emit('toggle-menu', note.id)"
              class="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-600"
            >
              <span class="text-base md:text-lg leading-none">⋮</span>
            </button>

            <div
              v-if="openMenu === note.id"
              class="absolute right-0 mt-1.5 md:mt-2 w-32 md:w-36 bg-white border border-neutral-200 
                     rounded-lg shadow-lg text-xs z-20 animate-fade-in"
            >
              <button
                class="w-full text-left px-3 py-2 hover:bg-neutral-100"
                @click.stop="emit('edit', note)"
              >
                <div class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4 text-neutral-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span>Edit</span>
                </div>
              </button>
              <button
                class="w-full text-left px-3 py-2 text-red-500 hover:bg-neutral-100"
                @click.stop="emit('delete', note)"
              >
                <div class="flex items-center gap-2">
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-4 0h14"
                    />
                  </svg>
                  <span>Delete</span>
                </div>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- User Footer (fixed) -->
    <div class="border-t border-neutral-200 px-4 md:px-6 py-3 md:py-4 flex-shrink-0">
      <div
        @click="toggleUserMenu"
        class="flex items-center gap-3 p-2.5 md:p-3 rounded-xl cursor-pointer transition-all"
        :class="userMenuOpen ? 'bg-neutral-100' : ''"
      >
        <!-- Avatar -->
        <div class="relative">
          <div
            class="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-black text-white flex items-center 
                   justify-center text-xs md:text-sm font-bold shadow-sm"
          >
            {{ initials }}
          </div>
        </div>

        <!-- User Info -->
        <div class="flex flex-col flex-1 min-w-0 leading-tight">
          <span class="text-xs md:text-sm font-semibold text-neutral-900 truncate">
            {{ displayName }}
          </span>
        </div>

        <!-- Dropdown Arrow -->
        <svg
          class="w-4 h-4 text-neutral-500 transition-transform"
          :class="userMenuOpen ? 'rotate-180' : ''"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <!-- User Menu -->
      <div
        v-if="userMenuOpen"
        class="mt-2 w-full bg-white border border-neutral-200 rounded-xl shadow-lg text-sm overflow-hidden"
      >
        <button
          @click="emit('logout')"
          class="w-full text-left px-3 py-3 hover:bg-red-50 text-red-600 flex items-center gap-2"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H9m4 4v1a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v1"
            />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  notes: Array,
  selectedId: Number,
  openMenu: Number,
  mobileOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "create",
  "select",
  "edit",
  "delete",
  "toggle-menu",
  "search",
  "logout",
  "close-mobile",
]);

const searchQuery = ref("");
const userMenuOpen = ref(false);
const createHover = ref(false);

// Username from localStorage
const rawUsername = localStorage.getItem("username") || "User";

const displayName = computed(() => rawUsername);
const initials = computed(() => rawUsername.substring(0, 2).toUpperCase());

function clearSearch() {
  searchQuery.value = "";
  emit("search", "");
}

function toggleUserMenu() {
  userMenuOpen.value = !userMenuOpen.value;
}

function formatDate(d) {
  if (!d) return "";
  const date = new Date(d);
  return date.toLocaleDateString("en-MY", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
</script>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.15s ease-out;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #d4d4d4;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a3a3a3;
}
</style>
