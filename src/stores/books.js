import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import initialBooks from '@/data/books.json'

const STORAGE_KEY = 'citatelsky-dennik-knihy'

// Doplní chýbajúce polia, aby staré dáta z localStorage fungovali s novou verziou
function normalize(book) {
  return { rating: 0, note: '', currentPage: 0, cover: '', ...book }
}

function loadBooks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved).map(normalize)
  } catch {
    // poškodené dáta v localStorage – použijeme počiatočné
  }
  return structuredClone(initialBooks).map(normalize)
}

export const useBooksStore = defineStore('books', () => {
  // ----- stav -----
  const books = ref(loadBooks())
  const filters = ref({ search: '', status: 'all' })

  watch(
    books,
    (value) => localStorage.setItem(STORAGE_KEY, JSON.stringify(value)),
    { deep: true }
  )

  // ----- pomocné funkcie -----
  function getBookById(id) {
    return books.value.find((b) => b.id === id)
  }

  // Počet prečítaných strán u jednej knihy
  function pagesReadOf(book) {
    if (book.status === 'finished') return book.pages
    return Math.min(book.currentPage, book.pages)
  }

  // ----- computed -----
  const finishedBooks = computed(() =>
    books.value.filter((b) => b.status === 'finished')
  )

  const readingBooks = computed(() =>
    books.value.filter((b) => b.status === 'reading')
  )

  const filteredBooks = computed(() => {
    const term = filters.value.search.trim().toLowerCase()
    return books.value.filter(
      (b) =>
        (filters.value.status === 'all' || b.status === filters.value.status) &&
        b.title.toLowerCase().includes(term)
    )
  })

  // Celkový počet prečítaných strán vo všetkých knihách
  const pagesRead = computed(() =>
    books.value.reduce((acc, b) => acc + pagesReadOf(b), 0)
  )

  const stats = computed(() => {
    const rated = books.value.filter((b) => b.rating > 0)
    const sum = rated.reduce((acc, b) => acc + b.rating, 0)
    return {
      total: books.value.length,
      finished: finishedBooks.value.length,
      pagesRead: pagesRead.value,
      avgRating: rated.length ? (sum / rated.length).toFixed(1) : '–'
    }
  })

  // ----- akcie -----
  function addBook(data) {
    books.value.push(normalize({ id: String(Date.now()), ...data }))
  }

  function updateBook(id, patch) {
    const book = getBookById(id)
    if (book) Object.assign(book, patch)
  }

  // Zmena stavu: pri "Prečítané" sa aktuálna strana nastaví na koniec knihy
  function setStatus(id, status) {
    const book = getBookById(id)
    if (!book) return
    book.status = status
    if (status === 'finished') book.currentPage = book.pages
  }

  // Nastavenie aktuálnej strany, hodnota sa ohraničí na rozsah knihy
  function setCurrentPage(id, page) {
    const book = getBookById(id)
    if (!book) return
    const value = Math.max(0, Math.min(Number(page) || 0, book.pages))
    book.currentPage = value
    if (value === book.pages && book.pages > 0) book.status = 'finished'
  }

  function removeBook(id) {
    books.value = books.value.filter((b) => b.id !== id)
  }

  return {
    books,
    filters,
    finishedBooks,
    readingBooks,
    filteredBooks,
    pagesRead,
    stats,
    getBookById,
    pagesReadOf,
    addBook,
    updateBook,
    setStatus,
    setCurrentPage,
    removeBook
  }
})