const spese = [
    {"id": 1, "descrizione": "Spesa al supermercato", "importo": 50.00, "categoria": "Alimentari", "data": "2024-06-01"},
    {"id": 2, "descrizione": "Abbonamento mensile palestra", "importo": 30.00, "categoria": "Intrattenimento", "data": "2024-06-05"},
    {"id": 3, "descrizione": "Bolletta Luce", "importo": 80.00, "categoria": "Bollette", "data": "2024-06-10"}
];

let editingId = null; //necessario per capire se il form è in modalità modifica o aggiunta
const form = document.getElementById('form-spese');
const submitButton = form.querySelector('button[type="submit"]');

// Controlli per filtro e ricerca
const filtroCategoria = document.getElementById('filtro-categoria');
const ricercaDescrizione = document.getElementById('ricerca-descrizione');

// Event listeners per i filtri
filtroCategoria.addEventListener('change', aggiornaTabella);
ricercaDescrizione.addEventListener('input', aggiornaTabella);

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const descrizione = document.getElementById('descrizione').value.trim();
    const importo     = parseFloat(document.getElementById('importo').value);
    const categoria   = document.getElementById('categoria').value;
    const data        = document.getElementById('data').value;

    if (!descrizione || !categoria || !data || isNaN(importo) || importo <= 0) {
        alert('Compila tutti i campi correttamente!');
        return;
    }

    if (editingId) {
        const indice = spese.findIndex(spesa => spesa.id === editingId);
        if (indice >= 0) {
            spese[indice].descrizione = descrizione;
            spese[indice].importo = importo;
            spese[indice].categoria = categoria;
            spese[indice].data = data;
        }
        editingId = null;
        submitButton.textContent = 'Aggiungi Spesa';
    } else {
        const nuovaSpesa = {
            id: Date.now(),
            descrizione,
            importo,
            categoria,
            data
        };
        spese.push(nuovaSpesa);
    }

    console.log(spese);
    aggiornaTabella();

    form.reset();
});

// Funzione per visualizzare le spese
function aggiornaTabella() {
    const corpoTabella = document.getElementById('lista-spese-corpo');
    const containerMobile = document.getElementById('lista-spese-mobile');
    
    corpoTabella.innerHTML = '';
    containerMobile.innerHTML = '';

    // Ottieni i valori dei filtri
    const categoriaFiltro = filtroCategoria.value;
    const descrizioneRicerca = ricercaDescrizione.value.toLowerCase().trim();

    // Filtra le spese
    const speseFiltrate = spese.filter(spesa => {
        // Filtro per categoria
        const matchCategoria = !categoriaFiltro || spesa.categoria === categoriaFiltro;

        // Ricerca per descrizione
        const matchDescrizione = !descrizioneRicerca ||
            spesa.descrizione.toLowerCase().includes(descrizioneRicerca);

        return matchCategoria && matchDescrizione;
    });

    // Mostra le spese filtrate o messaggio se nessuna
    if (speseFiltrate.length === 0) {
        // Messaggio per desktop
        const riga = document.createElement('tr');
        riga.innerHTML = `
            <td colspan="5" class="text-center text-muted py-4">
                <i class="bi bi-search me-2 bg-transparent color-s"></i>
                Nessuna spesa trovata con i filtri applicati.
            </td>
        `;
        corpoTabella.appendChild(riga);
        
        // Messaggio per mobile
        containerMobile.innerHTML = `
            <div class="col-12 text-center text-muted py-4">
                <i class="bi bi-search me-2 bg-transparent color-s"></i>
                Nessuna spesa trovata con i filtri applicati.
            </div>
        `;
    } else {
        // Popola tabella desktop
        speseFiltrate.forEach(spesa => {
            const riga = document.createElement('tr');
            riga.innerHTML = `
                <td>${new Date(spesa.data).toLocaleDateString()}</td>
                <td>${spesa.descrizione}</td>
                <td><span class="badge bg-info text-dark">${spesa.categoria}</span></td>
                <td class="fw-bold">€ ${spesa.importo.toFixed(2)}</td>
                <td>
                    <button type="button" class="btn btn-sm btn-outline-primary me-2" onclick="modificaSpesa(${spesa.id})" title="Modifica">
                        <i class="bi bi-pencil color-s bg-transparent"></i>
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-danger" onclick="rimuoviSpesa(${spesa.id})" title="Elimina">
                        <i class="bi bi-trash3 text-danger bg-transparent"></i>
                    </button>
                </td>
            `;
            corpoTabella.appendChild(riga);
        });
        
        // Popola card mobile
        speseFiltrate.forEach(spesa => {
            const card = document.createElement('div');
            card.className = 'col-12';
            card.innerHTML = `
                <div class="spesa-card">
                    <div class="spesa-card-header">
                        <h6 class="spesa-card-title">${spesa.descrizione}</h6>
                        <small class="spesa-card-date">${new Date(spesa.data).toLocaleDateString()}</small>
                    </div>
                    <div class="spesa-card-body">
                        <span class="spesa-card-category">${spesa.categoria}</span>
                        <div class="spesa-card-amount">€ ${spesa.importo.toFixed(2)}</div>
                    </div>
                    <div class="spesa-card-actions">
                        <button type="button" class="btn btn-sm btn-outline-primary" onclick="modificaSpesa(${spesa.id})" title="Modifica">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger" onclick="rimuoviSpesa(${spesa.id})" title="Elimina">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </div>
                </div>
            `;
            containerMobile.appendChild(card);
        });
    }

    // Calcola e mostra il totale delle spese filtrate
    const totaleFiltrato = speseFiltrate.reduce((sum, spesa) => sum + spesa.importo, 0);
    document.getElementById('spese-visibili').textContent = `${speseFiltrate.length} spese filtrate - € ${totaleFiltrato.toFixed(2)}`;

    // Aggiorna la dashboard con tutte le spese (non filtrate)
    aggiornaDashboard();
}

// Funzione per aggiornare la dashboard con il riepilogo
function aggiornaDashboard() {
    // Calcola totale spese
    const totale = spese.reduce((sum, spesa) => sum + spesa.importo, 0);
    document.getElementById('totale-spese').textContent = `€ ${totale.toFixed(2)}`;

    // Numero di spese
    document.getElementById('numero-spese').textContent = spese.length;

    // Riepilogo per categorie
    const categorie = {};
    spese.forEach(spesa => {
        if (!categorie[spesa.categoria]) {
            categorie[spesa.categoria] = { conteggio: 0, totale: 0 };
        }
        categorie[spesa.categoria].conteggio++;
        categorie[spesa.categoria].totale += spesa.importo;
    });

    const riepilogoContainer = document.getElementById('riepilogo-categorie');
    riepilogoContainer.innerHTML = '';

    Object.keys(categorie).forEach(categoria => {
        const div = document.createElement('div');
        div.className = 'mb-2';
        div.innerHTML = `
            <span class="badge bg-secondary me-2">${categoria}</span>
            <small>${categorie[categoria].conteggio} spese - € ${categorie[categoria].totale.toFixed(2)}</small>
        `;
        riepilogoContainer.appendChild(div);
    });
}

// Funzione per modificare una spesa
function modificaSpesa(id) {
    const spesa = spese.find(s => s.id === id);
    if (!spesa) return;

    document.getElementById('descrizione').value = spesa.descrizione;
    document.getElementById('importo').value = spesa.importo;
    document.getElementById('categoria').value = spesa.categoria;
    document.getElementById('data').value = spesa.data;

    editingId = id;
    submitButton.textContent = 'Salva modifica';
}

// Funzione per rimuovere una spesa
function rimuoviSpesa(id) {
    spese.splice(spese.findIndex(spesa => spesa.id === id), 1);
    aggiornaTabella();
}

// Inizializza la tabella e la dashboard al caricamento della pagina
aggiornaTabella();