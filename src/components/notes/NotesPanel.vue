<template>
  <div class="flex-1 bg-white px-8 py-6">
    <!-- CREATE / EDIT FORM -->
    <div
      v-if="mode === 'create' || mode === 'edit'"
      class="w-full max-w-4xl mx-auto"
    >
      <!-- Simple header -->
      <div class="mb-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-black"></div>
          <h2 class="text-lg font-semibold text-neutral-900">
            {{ mode === 'create' ? 'Create New Note' : 'Edit Note' }}
          </h2>
        </div>
      </div>

      <!-- Form card -->
      <div
        class="space-y-4 bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm w-full"
      >
        <!-- Title -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label
              class="text-sm font-medium text-neutral-700 flex items-center gap-2"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Title
            </label>
            <span class="text-xs text-neutral-400">
              {{ (formTitle || '').length }}/100
            </span>
          </div>

          <div class="relative group">
            <input
              :value="formTitle"
              @input="onTitleInput"
              @focus="setActiveField('title')"
              @blur="clearActiveField"
              type="text"
              placeholder="Enter a descriptive title..."
              maxlength="100"
              class="w-full bg-white border-2 border-neutral-300 rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 focus:border-black focus:ring-4 focus:ring-black/5 focus:outline-none placeholder:text-neutral-400"
              :class="
                activeField === 'title'
                  ? 'border-black shadow-sm'
                  : 'hover:border-neutral-400'
              "
              ref="titleInput"
            />
            <div
              v-if="formTitle"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-1"
            >
              <button
                @click="clearField('title')"
                class="w-6 h-6 flex items-center justify-center rounded-full hover:bg-neutral-200 transition-colors"
                title="Clear title"
              >
                <svg
                  class="w-4 h-4 text-neutral-500"
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
          </div>
        </div>

        <!-- Content -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label
              class="text-sm font-medium text-neutral-700 flex items-center gap-2"
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
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
              Content
            </label>
            <span class="text-xs text-neutral-400">
              {{ (formContent || '').length }}/5000
            </span>
          </div>

          <textarea
            :value="formContent"
            @input="onContentInput"
            @focus="setActiveField('content')"
            @blur="clearActiveField"
            rows="12"
            maxlength="5000"
            class="w-full bg-white border-2 border-neutral-300 rounded-xl px-3 py-3 text-sm resize-y min-h-[260px] transition-all duration-200 focus:border-black focus:ring-4 focus:ring-black/5 focus:outline-none placeholder:text-neutral-400 leading-relaxed"
            :class="
              activeField === 'content'
                ? 'border-black shadow-sm'
                : 'hover:border-neutral-400'
            "
            placeholder="Start typing your thoughts here..."
            ref="contentTextarea"
          ></textarea>
        </div>

        <!-- Stats & actions -->
        <div class="border-t border-neutral-100 pt-3">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <!-- Stats -->
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2 text-sm text-neutral-600">
                <div
                  class="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center"
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div class="font-medium">{{ wordCount }}</div>
                  <div class="text-xs text-neutral-500">words</div>
                </div>
              </div>

              <div class="flex items-center gap-2 text-sm text-neutral-600">
                <div
                  class="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center"
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div class="font-medium">~{{ readingTime }}</div>
                  <div class="text-xs text-neutral-500">min read</div>
                </div>
              </div>

              <div class="flex items-center gap-2 text-sm text-neutral-600">
                <div
                  class="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center"
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div class="font-medium">{{ currentTime }}</div>
                  <div class="text-xs text-neutral-500">last edit</div>
                </div>
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex items-center gap-3">
              <button
                @click="handleCancel"
                class="px-5 py-2.5 rounded-xl text-sm font-medium border-2 border-neutral-300 text-neutral-700 bg-white hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-200 flex items-center gap-2 group"
              >
                <svg
                  class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-[-2px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Cancel
              </button>

              <button
                @click="handleSave"
                :disabled="!(formTitle || '').trim()"
                :class="[
                  'px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 relative overflow-hidden group',
                  (formTitle || '').trim()
                    ? 'bg-black text-white hover:bg-neutral-800 hover:shadow-lg active:scale-[0.98]'
                    : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                ]"
              >
                <span class="relative z-10 flex items-center gap-2">
                  <svg
                    class="w-4 h-4"
                    :class="
                      (formTitle || '').trim() ? 'text-white' : 'text-neutral-500'
                    "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    />
                  </svg>
                  {{ mode === 'create' ? 'Create Note' : 'Save Changes' }}
                </span>
                <span
                  v-if="(formTitle || '').trim()"
                  class="absolute inset-0 bg-gradient-to-r from-black to-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PREVIEW -->
    <div v-else-if="note" class="max-w-4xl mx-auto">
      <!-- Preview header -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-3 h-3 rounded-full bg-black"></div>
            <h1 class="text-2xl font-bold text-neutral-900">Note Preview</h1>
          </div>
          <div class="flex items-center gap-2">
            <div class="relative" v-if="isOnline">
              <span class="flex h-2 w-2">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                ></span>
                <span
                  class="relative inline-flex rounded-full h-2 w-2 bg-green-500"
                ></span>
              </span>
            </div>
            
          </div>
        </div>

        <!-- Actions bar (copy + edit + delete) -->
        <div
          class="flex items-center justify-between mb-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200"
        >
          <div class="text-xs text-neutral-500">
            Title, content and statistics of your selected note.
          </div>

          <div class="flex items-center gap-2">
            <!-- Copy -->
            <button
              @click="copyNoteContent"
              @mouseenter="showCopyTooltip = true"
              @mouseleave="showCopyTooltip = false"
              class="p-2.5 rounded-lg border border-neutral-300 text-neutral-600 bg-white hover:bg-neutral-100 hover:text-black transition-all duration-200 relative group"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <div
                v-if="showCopyTooltip"
                class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-xs rounded-lg whitespace-nowrap z-10"
              >
                Copy to clipboard
              </div>
            </button>

            <!-- Edit -->
            <button
              @click="emitEdit"
              @mouseenter="showEditTooltip = true"
              @mouseleave="showEditTooltip = false"
              class="p-2.5 rounded-lg border border-neutral-300 text-neutral-600 bg-white hover:bg-neutral-100 hover:text-black transition-all duration-200 relative flex items-center justify-center"
            >
              <svg
                class="w-5 h-5"
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
              <div
                v-if="showEditTooltip"
                class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-xs rounded-lg whitespace-nowrap z-10"
              >
                Edit note
              </div>
            </button>

            <!-- Delete -->
            <button
              @click="$emit('delete', note)"
              @mouseenter="showDeleteTooltip = true"
              @mouseleave="showDeleteTooltip = false"
              class="p-2.5 rounded-lg border border-red-200 text-red-600 bg-white hover:bg-red-50 hover:border-red-300 transition-all duration-200 relative flex items-center justify-center"
            >
              <svg
                class="w-5 h-5"
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
              <div
                v-if="showDeleteTooltip"
                class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-xs rounded-lg whitespace-nowrap z-10"
              >
                Delete note
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Preview card -->
      <div
        @mouseenter="previewHover = true"
        @mouseleave="previewHover = false"
        :class="[
          'bg-white border-2 border-neutral-200 rounded-2xl p-8 transition-all duration-500 relative overflow-hidden',
          previewHover
            ? 'shadow-2xl transform translate-y-[-4px] border-neutral-300'
            : 'shadow-lg'
        ]"
      >
        <!-- Background pattern -->
        <div class="absolute top-0 right-0 w-64 h-64 opacity-5">
          <div class="grid grid-cols-4 gap-4">
            <div
              v-for="i in 16"
              :key="i"
              class="w-4 h-4 bg-black rounded-full"
            ></div>
          </div>
        </div>

        <!-- Header inside card -->
        <div class="relative z-10">
          <div class="flex items-start justify-between mb-6">
            <div class="flex-1">
              <h1
                class="text-3xl font-bold text-neutral-900 mb-3 leading-tight"
              >
                {{ note.title }}
              </h1>
              <div class="flex items-center gap-4 text-sm text-neutral-600">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{{ formatDate(note.created_at) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Divider -->
          <div class="flex items-center gap-3 mb-8">
            <div class="h-px flex-1 bg-gradient-to-r from-black to-transparent"></div>
            <div class="w-2 h-2 rounded-full bg-black"></div>
            <div class="h-px flex-1 bg-gradient-to-l from-black to-transparent"></div>
          </div>
        </div>

        <!-- Content -->
        <div class="relative z-10">
          <div class="prose prose-lg max-w-none">
            <div
              class="text-neutral-700 leading-relaxed whitespace-pre-wrap font-light"
              v-html="formattedContent"
            ></div>
          </div>

          <!-- Stats -->
          <div class="mt-10 pt-6 border-t border-neutral-200">
            <div class="grid grid-cols-3 gap-6">
              <div class="text-center p-4 bg-neutral-50 rounded-xl">
                <div class="text-2xl font-bold text-neutral-900">
                  {{ previewWordCount }}
                </div>
                <div class="text-sm text-neutral-600 mt-1">Total Words</div>
              </div>
              <div class="text-center p-4 bg-neutral-50 rounded-xl">
                <div class="text-2xl font-bold text-neutral-900">
                  {{ previewParagraphCount }}
                </div>
                <div class="text-sm text-neutral-600 mt-1">Paragraphs</div>
              </div>
              <div class="text-center p-4 bg-neutral-50 rounded-xl">
                <div class="text-2xl font-bold text-neutral-900">
                  {{ previewReadingTime }}
                </div>
                <div class="text-sm text-neutral-600 mt-1">Minutes to Read</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Copy success toast -->
        <div
          v-if="showCopySuccess"
          class="fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded-xl shadow-2xl animate-fade-in-out flex items-center gap-3"
        >
          <svg
            class="w-5 h-5 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Note copied to clipboard!
        </div>
      </div>
    </div>

    <!-- EMPTY STATE -->
    <div
      v-else
      class="flex flex-col items-center justify-center h-full text-neutral-500"
    >
      <!-- Illustration -->
      <div class="relative mb-10">
        <div
          class="w-48 h-48 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full flex items-center justify-center animate-pulse-slow"
        >
          <div
            class="w-32 h-32 bg-gradient-to-br from-white to-neutral-100 rounded-full flex items-center justify-center shadow-inner"
          >
            <svg
              class="w-20 h-20 text-neutral-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>
        <div
          class="absolute -top-2 -right-2 w-10 h-10 bg-black rounded-full animate-bounce"
        ></div>
        <div
          class="absolute -bottom-2 -left-2 w-8 h-8 bg-black rounded-full animate-bounce"
          style="animation-delay: 0.2s"
        ></div>
      </div>

      <h1 class="text-3xl font-bold text-neutral-900 mb-4">
        Welcome to FileGBD
      </h1>
      <p class="max-w-md text-base text-neutral-600 mb-8 text-center">
        Your personal note-taking space. Organize thoughts, ideas, and
        inspiration in one place.
      </p>

      <!-- Create first note button (no animation, spinning icon only) -->
      <button
        @click="$emit('create')"
        class="px-8 py-3 rounded-2xl text-base font-semibold text-white bg-black hover:bg-neutral-900 transition-colors duration-200 flex items-center gap-3 shadow-lg group"
      >
        <svg
          class="w-5 h-5 transition-transform duration-300 group-hover:rotate-90"
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
        <span>Create your first note</span>
      </button>

      <!-- Tips -->
      <div class="mt-12 grid grid-cols-3 gap-4 max-w-2xl">
        <div
          v-for="(tip, index) in tips"
          :key="index"
          @mouseenter="hoveredTip = index"
          @mouseleave="hoveredTip = null"
          :class="[
            'p-4 border border-neutral-200 rounded-xl text-left transition-all duration-300 cursor-default',
            hoveredTip === index
              ? 'bg-neutral-50 border-neutral-300 transform translate-y-[-2px] shadow-sm'
              : 'hover:bg-neutral-50'
          ]"
        >
          <div class="flex items-center gap-3 mb-2">
            <div
              class="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center"
            >
              <svg
                class="w-4 h-4 text-neutral-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  :d="tip.icon"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
            </div>
            <div class="text-sm font-medium text-neutral-900">
              {{ tip.title }}
            </div>
          </div>
          <div class="text-xs text-neutral-600">
            {{ tip.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  watch,
  onMounted,
  onUnmounted,
  nextTick,
} from "vue";

const props = defineProps({
  mode: String,
  note: Object,
  formTitle: String,
  formContent: String,
});

const emit = defineEmits([
  "save",
  "cancel",
  "create",
  "update:formTitle",
  "update:formContent",
  "edit",
  "delete",
]);

// State
const activeField = ref(null);
const previewHover = ref(false);
const showCopySuccess = ref(false);
const showCopyTooltip = ref(false);
const showEditTooltip = ref(false);
const showDeleteTooltip = ref(false);

const titleInput = ref(null);
const contentTextarea = ref(null);

const isOnline = ref(navigator.onLine);

const currentTime = ref(
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
);

const hoveredTip = ref(null);

// Tips for empty state
const tips = [
  {
    title: "Quick Notes",
    description: "Capture ideas instantly with a simple title and content.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  },
  {
    title: "Stay Organized",
    description: "Use clear titles so your notes are easy to search later.",
    icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
  },
  {
    title: "Search Fast",
    description: "Use the sidebar search to quickly jump between notes.",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  },
];

// Computed
const wordCount = computed(() => {
  if (!props.formContent) return 0;
  return props.formContent
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
});

const previewWordCount = computed(() => {
  if (!props.note?.content) return 0;
  return props.note.content
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
});

const previewParagraphCount = computed(() => {
  if (!props.note?.content) return 0;
  return props.note.content
    .split("\n")
    .filter((p) => p.trim().length > 0).length;
});

const readingTime = computed(() => {
  const words = wordCount.value;
  const minutes = Math.ceil(words / 200);
  return minutes < 1 ? "<1" : minutes;
});

const previewReadingTime = computed(() => {
  const words = previewWordCount.value;
  const minutes = Math.ceil(words / 200);
  return minutes < 1 ? "<1" : minutes;
});

const formattedContent = computed(() => {
  if (!props.note?.content) return "";
  return props.note.content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /`(.*?)`/g,
      '<code class="bg-neutral-100 px-1 py-0.5 rounded text-sm">$1</code>'
    )
    .replace(
      /^- (.*)$/gm,
      '<span class="flex"><span class="mr-2">•</span><span>$1</span></span>'
    )
    .replace(
      /^> (.*)$/gm,
      '<blockquote class="border-l-4 border-neutral-300 pl-4 py-1 my-2 text-neutral-600">$1</blockquote>'
    )
    .replace(/\n/g, "<br>");
});

// Methods
function onTitleInput(e) {
  const val = e.target.value.slice(0, 100);
  emit("update:formTitle", val);
  updateCurrentTime();
}

function onContentInput(e) {
  const val = e.target.value.slice(0, 5000);
  emit("update:formContent", val);
  updateCurrentTime();
}

function setActiveField(field) {
  activeField.value = field;
}

function clearActiveField() {
  activeField.value = null;
}

function handleCancel() {
  if (
    (props.formTitle || props.formContent) &&
    !confirm("You have unsaved changes. Are you sure you want to cancel?")
  ) {
    return;
  }
  emit("cancel");
}

function handleSave() {
  if (!(props.formTitle || "").trim()) {
    titleInput.value?.focus();
    return;
  }
  emit("save");
}

function clearField(field) {
  if (field === "title") {
    emit("update:formTitle", "");
    titleInput.value?.focus();
  }
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function copyNoteContent() {
  if (!props.note?.content) return;

  try {
    await navigator.clipboard.writeText(props.note.content);
  } catch {
    // Fallback
    const textArea = document.createElement("textarea");
    textArea.value = props.note.content;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }

  showCopySuccess.value = true;
  setTimeout(() => {
    showCopySuccess.value = false;
  }, 3000);
}

function emitEdit() {
  if (props.note) emit("edit", props.note);
}

function emitDelete() {
  if (props.note) emit("delete", props.note);
}

function updateCurrentTime() {
  currentTime.value = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Network status
function updateOnlineStatus() {
  isOnline.value = navigator.onLine;
}

// Focus title when switching to create/edit
watch(
  () => props.mode,
  (newMode) => {
    if (newMode === "create" || newMode === "edit") {
      nextTick(() => {
        if (titleInput.value) {
          titleInput.value.focus();
        }
      });
    }
  }
);

onMounted(() => {
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);

  // animations CSS
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fade-in {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes fade-in-out {
      0% { opacity: 0; transform: translateY(10px); }
      20% { opacity: 1; transform: translateY(0); }
      80% { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(10px); }
    }
    @keyframes pulse-slow {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    .animate-fade-in-out { animation: fade-in-out 3s ease-in-out; }
    .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
  `;
  document.head.appendChild(style);
});

onUnmounted(() => {
  window.removeEventListener("online", updateOnlineStatus);
  window.removeEventListener("offline", updateOnlineStatus);
});
</script>
