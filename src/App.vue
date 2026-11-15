<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary shadow-sm">
    <div class="container">
      <RouterLink to="/" class="navbar-brand fw-bold">📚 Čitateľský denník</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNav"
        aria-controls="mainNav"
        aria-expanded="false"
        aria-label="Prepnúť navigáciu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Domov</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'books' }" class="nav-link">Knihy</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'add' }" class="nav-link">Pridať</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'stats' }" class="nav-link">Štatistiky</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <main class="container py-4">
    <RouterView />
  </main>
</template>