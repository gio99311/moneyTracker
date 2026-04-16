# Money Tracker 💰

Un'applicazione web moderna per tracciare e gestire le tue spese personali. Money Tracker offre un'interfaccia intuitiva per monitorare le tue finanze quotidiane con funzionalità avanzate di filtro e ricerca.

## ✨ Caratteristiche Principali

### 📊 Dashboard Interattiva
- **Riepilogo in tempo reale** delle spese totali
- **Conteggio spese** per categoria
- **Statistiche filtrate** delle spese visibili
- **Panoramica completa** delle tue finanze

### ➕ Gestione Spese
- **Aggiunta rapida** di nuove spese
- **Modifica** delle spese esistenti
- **Eliminazione** delle spese
- **Validazione** automatica dei dati inseriti

## 🛠️ Tecnologie Utilizzate

- **HTML5** - Struttura semantica
- **CSS3** - Stili personalizzati con variabili CSS
- **JavaScript ES6+** - Logica applicativa
- **Bootstrap 5** - Framework CSS responsive
- **Bootstrap Icons** - Icone vettoriali

## 🎨 Tema e Design

- **Tema scuro** personalizzato con palette colori:
  - Primario: `#1D263B`
  - Secondario: `#5C6784`
  - Accento: `#A0EADE`
  - Testo: `#F9F9ED`
- **Typography**: Font Google "Lexend"
- **Componenti**: Card arrotondate, pulsanti outline, badge colorati

## 🚀 Come Utilizzare

### Prerequisiti
- Browser web moderno (Chrome, Firefox, Safari, Edge)
- Connessione internet per caricare Bootstrap e Google Fonts

### Installazione
1. **Clona o scarica** i file del progetto
2. **Apri** `index.html` nel tuo browser
3. **Inizia** ad aggiungere le tue spese!

### Utilizzo Base
1. **Aggiungi spesa**: Compila il form con descrizione, importo, categoria e data
2. **Visualizza spese**: La tabella/card mostra automaticamente tutte le spese
3. **Filtra**: Usa il dropdown categoria o il campo ricerca
4. **Modifica**: Clicca l'icona matita ✏️ per modificare una spesa
5. **Elimina**: Clicca l'icona cestino 🗑️ per rimuovere una spesa

### Dashboard
- **Totale Spese**: Somma di tutte le spese inserite
- **Numero Spese**: Conteggio totale delle voci
- **Spese per Categoria**: Riepilogo con conteggio e totale per categoria
- **Spese Visibili**: Statistiche delle spese filtrate attualmente mostrate

## 📁 Struttura File

```
money-tracker/
├── index.html          # Pagina principale
├── main.js            # Logica JavaScript
├── style.css          # Stili personalizzati
└── README.md          # Questa documentazione
```

## 🔧 Funzionalità Tecniche

### Gestione Stato
- **Array JavaScript** per storage in memoria
- **ID univoci** generati con `Date.now()`
- **Aggiornamenti real-time** dell'interfaccia

### Validazione Dati
- **Campi obbligatori**: descrizione, categoria, data
- **Importo positivo**: controllo numerico e valore > 0
- **Form reset** automatico dopo inserimento

### Responsive Design
- **Breakpoint**: 768px (Bootstrap md)
- **Visualizzazione condizionale**: classi `d-none d-md-block` / `d-md-none`
- **Card mobile**: layout verticale ottimizzato per touch

## 🎯 Funzionalità Richieste Implementate

✅ **Filtro per categoria** - Dropdown per filtrare spese per categoria
✅ **Ricerca per descrizione** - Campo input per ricerca testuale
✅ **Dashboard interattiva** - Riepilogo dinamico delle spese
✅ **Design responsive** - Ottimizzato per desktop e mobile


## 👨‍💻 Autore

Sviluppato per la gestione finanziaria personale.

---

**Money Tracker** - Tieni traccia delle tue spese in modo semplice ed efficace! 🚀