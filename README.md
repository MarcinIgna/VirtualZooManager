# VirtualZooManager

Aby zrealizować ten projekt, najpierw musimy podzielić zadanie na dwa główne komponenty: frontend i backend. Stworzymy aplikację, która umożliwi zarządzanie "hologramami" zwierząt w wirtualnym zoo, z pełną funkcjonalnością CRUD (Create, Read, Update, Delete).

### Backend

**1. Wybór technologii:**
Zalecam użycie Django jako frameworku do backendu, ponieważ jest to dojrzałe narzędzie w Pythonie, które ułatwia tworzenie REST API.

**2. Model danych:**
Musimy zdefiniować model Hologramu w Django, który będzie zawierał następujące pola:
- `name` (nazwa)
- `weight` (waga)
- `superpower` (supermoc)
- `extinct_since` (od kiedy wyginął)

**3. Implementacja REST API:**
- **Anzeigen (GET):** Endpoint do pobierania listy wszystkich hologramów oraz pojedynczych hologramów.
- **Hinzufügen (POST):** Endpoint do dodawania nowych hologramów.
- **Bearbeiten (PUT/PATCH):** Endpoint do aktualizowania istniejących hologramów.
- **Löschen (DELETE):** Endpoint do usuwania hologramów.

**4. Baza danych:**
Django automatycznie współpracuje z różnymi bazami danych (np. SQLite, PostgreSQL). Na potrzeby tego projektu możemy na początek użyć SQLite, a w przyszłości ewentualnie przenieść dane do PostgreSQL.

### Frontend

**1. Wybór technologii:**
Angular lub React będą odpowiednimi wyborami dla frontendowego frameworku. Oba są popularne i mają silne wsparcie dla tworzenia dynamicznych aplikacji webowych.

**2. Widok główny:**
Główny widok to tabela zawierająca listę hologramów. Powinna być czytelna i pozwalać użytkownikowi na:
- **Filtrację** (np. według nazwy, wagi, supermocy)
- **Sortowanie** (np. według wagi, nazwy)
- **CRUD**: Dodawanie, edytowanie i usuwanie hologramów

**3. Formularze:**
- **Dodawanie nowego hologramu:** Formularz, w którym użytkownik wprowadza dane nowego hologramu.
- **Edytowanie hologramu:** Formularz, w którym użytkownik może zmodyfikować istniejące dane.

**4. Powiadomienia:**
Po zakończeniu operacji (dodawanie, edytowanie, usuwanie), użytkownik powinien otrzymać informację zwrotną, np. komunikat o sukcesie lub błędzie.

### Implementacja

1. **Backend:**
   - Stworzenie projektu Django i aplikacji dla zarządzania hologramami.
   - Definicja modelu `Hologram` i migracje.
   - Implementacja widoków i URLi dla API (używając Django Rest Framework).
   - Testowanie API z użyciem narzędzi takich jak Postman.

2. **Frontend:**
   - Stworzenie projektu w Angularze/React.
   - Implementacja widoków, komponentów i routingu.
   - Połączenie z backendowym API poprzez axios (w React) lub HttpClient (w Angularze).
   - Stylizacja aplikacji (CSS/SCSS).

3. **Integracja i testowanie:**
   - Testowanie aplikacji jako całości, weryfikacja pełnej funkcjonalności CRUD.
   - Upewnienie się, że UI jest responsywne i działa na różnych urządzeniach.

### Nice-to-Have

- **Filtrowanie i sortowanie:** 
  - Implementacja na frontendzie za pomocą funkcji JavaScriptowych do dynamicznej manipulacji danych.
  - Możliwość sortowania kolumn w tabeli kliknięciem nagłówka.
  - Filtrowanie danych poprzez formularze lub pola wyszukiwania.

Ten projekt może być realizowany iteracyjnie, zaczynając od podstawowej funkcjonalności CRUD i stopniowo dodając bardziej zaawansowane funkcje.