<template>
  <div
    class="min-h-screen bg-gradient-to-br from-neutral-100 via-neutral-50 to-white flex items-start md:items-center justify-center px-4 py-6 sm:py-10"
  >
    <div
      class="w-full max-w-4xl grid grid-cols-1 md:grid-cols-[1.1fr,1fr] bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-3xl shadow-xl overflow-hidden"
    >
      <!-- LEFT: Brand / intro (now also visible on mobile) -->
      <div
        class="flex flex-col justify-between bg-neutral-900 text-white p-6 sm:p-8 relative"
      >
        <!-- subtle background glows (keep for desktop, hide on very small if you want later) -->
        <div
          class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none hidden md:block"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none hidden md:block"
        ></div>

        <div class="relative">
          <div
            class="inline-flex items-center gap-2 mb-6 mx-auto md:mx-0"
          >
            <div
              class="h-8 w-8 rounded-xl bg-white text-neutral-900 flex items-center justify-center text-xs font-extrabold tracking-[0.2em]"
            >
              FG
            </div>
            <div class="flex flex-col leading-tight">
              <span
                class="text-[10px] uppercase tracking-[0.35em] text-neutral-400"
              >
                File
              </span>
              <span class="text-lg font-semibold tracking-tight">
                GBD Notes
              </span>
            </div>
          </div>

          <h1
            class="text-2xl lg:text-3xl font-semibold mb-1 text-center md:text-left"
          >
            Create your FileGBD account.
          </h1>
         
        </div>

        <div
          class="relative mt-5 space-y-3 text-xs text-neutral-300 max-w-md mx-auto md:mx-0"
        >
          <div class="flex items-center gap-2">
            <span class="h-1 w-8 rounded-full bg-white/60"></span>
            <span>Simple sign up — just name, email and password.</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="h-1 w-8 rounded-full bg-white/40"></span>
            <span>Access from anywhere, on any device.</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="h-1 w-8 rounded-full bg-white/30"></span>
            <span>Designed for clean, focused note-taking.</span>
          </div>
        </div>
      </div>

      <!-- RIGHT: Register form -->
      <div
        class="p-6 sm:p-9 bg-white border-t border-neutral-100 md:border-t-0"
      >
        <div class="mb-6">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-2 h-2 rounded-full bg-neutral-900"></div>
            <span
              class="text-xs font-medium tracking-[0.25em] uppercase text-neutral-500"
            >
              Sign up
            </span>
          </div>
          <h2 class="text-2xl font-semibold text-neutral-900">
            Create an Account
          </h2>
          <p class="text-sm text-neutral-500 mt-1">
            Fill in your details to get started with FileGBD.
          </p>
        </div>

        <!-- Error message -->
        <p
          v-if="error"
          class="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2"
        >
          {{ error }}
        </p>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Name -->
          <div class="space-y-1">
            <label class="block text-sm font-medium text-neutral-700"
              >Name</label
            >
            <div class="relative group">
              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-700 transition-colors"
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
                    d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <input
                v-model="name"
                type="text"
                class="w-full border-2 border-neutral-200 rounded-xl pl-9 pr-3 py-2.5 text-sm placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5 transition-all"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>

          <!-- Email -->
          <div class="space-y-1">
            <label class="block text-sm font-medium text-neutral-700"
              >Email</label
            >
            <div class="relative group">
              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-700 transition-colors"
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
                    d="M16 12a4 4 0 01-8 0m8 0a4 4 0 10-8 0m8 0v1a4 4 0 11-8 0v-1m0 0H5m14 0h-3"
                  />
                </svg>
              </span>
              <input
                v-model="email"
                type="email"
                class="w-full border-2 border-neutral-200 rounded-xl pl-9 pr-3 py-2.5 text-sm placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5 transition-all"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <!-- Password -->
          <div class="space-y-1">
            <label class="block text-sm font-medium text-neutral-700"
              >Password</label
            >
            <div class="relative group">
              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-700 transition-colors"
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
                    d="M12 11c.667-1.333 2-2 4-2 2.667 0 4 1.333 4 4v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3c0-2.667 1.333-4 4-4 2 0 3.333.667 4 2z"
                  />
                </svg>
              </span>
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                class="w-full border-2 border-neutral-200 rounded-xl pl-9 pr-10 py-2.5 text-sm placeholder-neutral-400 focus:outline-none focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5 transition-all"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors text-xs font-medium"
              >
                {{ showPassword ? "Hide" : "Show" }}
              </button>
            </div>
          </div>

          <!-- Register button -->
          <button
            type="submit"
            class="w-full mt-2 bg-neutral-900 text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:bg-black hover:shadow-lg active:scale-[0.98]"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create account
          </button>
        </form>

        <p class="text-center mt-6 text-xs text-neutral-500">
          Already have an account?
          <router-link
            to="/login"
            class="text-neutral-900 font-semibold hover:underline"
          >
            Login here
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api"; // adjust path if register.vue is not in src/views

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const error = ref("");
const showPassword = ref(false);

// Handle register
async function handleRegister() {
  error.value = "";

  try {
    const res = await api.post("/register", {
      name: name.value,
      email: email.value,
      password: password.value,
    });

    if (res.data.success) {
      console.log("REGISTER RESPONSE:", res.data);
      router.push("/login");
    }
  } catch (err) {
    error.value = err.response?.data?.message || "Registration failed";
  }
}
</script>
