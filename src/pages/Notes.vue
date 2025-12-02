<template>
  <div class="min-h-screen flex bg-neutral-50 relative">
    <!-- Mobile overlay when sidebar is open -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black/40 z-30 md:hidden"
      @click="isSidebarOpen = false"
    ></div>

    <!-- Sidebar -->
    <NotesSidebar
      :notes="filteredNotes"
      :selectedId="selectedNoteId"
      :openMenu="openMenuId"
      :mobileOpen="isSidebarOpen"
      @close-mobile="isSidebarOpen = false"
      @create="startCreate"
      @select="selectNote"
      @edit="startEdit"
      @delete="requestDelete"
      @toggle-menu="toggleMenu"
      @logout="logoutUser"
      @search="searchQuery = $event"
    />

    <!-- Main content / panel -->
    <div class="flex-1 flex flex-col relative">
      <!-- Mobile hamburger button -->
      <button
        class="md:hidden absolute top-3 left-3 z-20 bg-white/90 border border-neutral-200 rounded-full p-2 shadow-sm"
        @click="isSidebarOpen = true"
      >
        <svg
          class="w-5 h-5 text-neutral-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <NotesPanel
        :mode="mode"
        :note="selectedNote"
        :formTitle="formTitle"
        :formContent="formContent"
        @update:formTitle="formTitle = $event"
        @update:formContent="formContent = $event"
        @save="saveNote"
        @cancel="cancelEdit"
        @create="startCreate"
        @edit="startEdit"
        @delete="requestDelete"
      />
    </div>

    <!-- Delete confirmation modal -->
    <div
      v-if="showDeleteDialog"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-neutral-200"
      >
        <h2 class="text-lg font-semibold text-neutral-900 mb-2">
          Delete this note?
        </h2>
        <p class="text-sm text-neutral-600 mb-6">
          This action cannot be undone. The note
          <span class="font-semibold">
            “{{ (noteToDelete && noteToDelete.title) || 'Untitled Note' }}”
          </span>
          will be permanently removed.
        </p>

        <div class="flex justify-end gap-3">
          <button
            @click="closeDeleteDialog"
            class="px-4 py-2 text-sm rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../api"; 

import NotesSidebar from "../components/notes/NotesSidebar.vue";
import NotesPanel from "../components/notes/NotesPanel.vue";

const router = useRouter();

const notes = ref([]);
const loading = ref(false);
const saving = ref(false);
const error = ref("");

const mode = ref("idle"); // 'idle' | 'create' | 'edit'
const selectedNoteId = ref(null);
const openMenuId = ref(null);

const formTitle = ref("");
const formContent = ref("");

const searchQuery = ref(""); // single search: title or date

// Sidebar mobile drawer state
const isSidebarOpen = ref(false);

// Delete dialog state
const showDeleteDialog = ref(false);
const noteToDelete = ref(null);

const selectedNote = computed(
  () => notes.value.find((n) => n.id === selectedNoteId.value) || null
);

const filteredNotes = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return notes.value;

  return notes.value.filter((note) => {
    const title = (note.title || "").toLowerCase();

    const rawCreated = (note.created_at || "").toString().toLowerCase();
    const dateOnly =
      note.created_at && typeof note.created_at === "string"
        ? note.created_at.slice(0, 10).toLowerCase()
        : "";

    // match query in title OR any date representation
    return (
      title.includes(q) || rawCreated.includes(q) || dateOnly.includes(q)
    );
  });
});

function toggleMenu(id) {
  openMenuId.value = openMenuId.value === id ? null : id;
}

function selectNote(note) {
  selectedNoteId.value = note.id;
  mode.value = "idle";
  openMenuId.value = null;
  // Auto-close drawer on mobile after selecting
  isSidebarOpen.value = false;
}

function startCreate() {
  mode.value = "create";
  selectedNoteId.value = null;
  formTitle.value = "";
  formContent.value = "";
  openMenuId.value = null;
  // Auto-close drawer on mobile after hitting "Create" from sidebar
  isSidebarOpen.value = false;
}

function startEdit(note) {
  mode.value = "edit";
  selectedNoteId.value = note.id;
  formTitle.value = note.title || "";
  formContent.value = note.content || "";
  openMenuId.value = null;
  isSidebarOpen.value = false;
}

function cancelEdit() {
  mode.value = "idle";
  formTitle.value = "";
  formContent.value = "";
}


async function fetchNotes() {
  loading.value = true;
  error.value = "";

  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
    return;
  }

  try {
    const res = await api.get("/notes", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    notes.value = res.data || [];
  } catch (err) {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      router.push("/login");
    } else {
      error.value = err.response?.data?.message || "Failed to load notes";
    }
  } finally {
    loading.value = false;
  }
}


async function saveNote() {
  if (!formTitle.value.trim() || !formContent.value.trim()) return;

  saving.value = true;
  error.value = "";

  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
    return;
  }

  try {
    if (mode.value === "create") {
      const res = await api.post(
        "/notes",
        {
          title: formTitle.value,
          content: formContent.value,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      notes.value.unshift(res.data);
      selectedNoteId.value = res.data.id;
    } else if (mode.value === "edit" && selectedNoteId.value) {
      await api.put(
        `/notes/${selectedNoteId.value}`,
        {
          title: formTitle.value,
          content: formContent.value,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      const idx = notes.value.findIndex((n) => n.id === selectedNoteId.value);
      if (idx !== -1) {
        notes.value[idx].title = formTitle.value;
        notes.value[idx].content = formContent.value;
      }
    }

    mode.value = "idle";
    formTitle.value = "";
    formContent.value = "";
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to save note";
  } finally {
    saving.value = false;
  }
}


function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  router.push("/login");
}

// Open confirmation dialog
function requestDelete(note) {
  if (!note || !note.id) return;
  noteToDelete.value = note;
  showDeleteDialog.value = true;
  openMenuId.value = null;
}

// Close dialog without deleting
function closeDeleteDialog() {
  showDeleteDialog.value = false;
  noteToDelete.value = null;
}

// Confirm delete in dialog
async function confirmDelete() {
  if (!noteToDelete.value) return;

  const note = noteToDelete.value;
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
    closeDeleteDialog();
    return;
  }

  error.value = "";

  try {
    await api.delete(`/notes/${note.id}`, {
      headers: { Authorization: "Bearer " + token },
    });

    notes.value = notes.value.filter((n) => n.id !== note.id);

    if (selectedNoteId.value === note.id) {
      selectedNoteId.value = null;
      mode.value = "idle";
      formTitle.value = "";
      formContent.value = "";
    }
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to delete note";
  } finally {
    closeDeleteDialog();
  }
}


onMounted(fetchNotes);
</script>
