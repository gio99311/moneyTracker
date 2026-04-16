const spese = [
    {"id": 1, "descrizione": "Spesa al supermercato", "importo": 50.00, "categoria": "Alimentari", "data": "2024-06-01"},
    {"id": 2, "descrizione": "Abbonamento mensile palestra", "importo": 30.00, "categoria": "Salute", "data": "2024-06-05"},
    {"id": 3, "descrizione": "Cena fuori con amici", "importo": 80.00, "categoria": "Divertimento", "data": "2024-06-10"}
];

let editingId = null; //necessario per capire se il form è in modalità modifica o aggiunta
const form = document.getElementById('form-spese');
const submitButton = form.querySelector('button[type="submit"]');

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
    corpoTabella.innerHTML = '';
    spese.forEach(spesa => {
        const riga = document.createElement('tr');
        riga.innerHTML = `
            <td>${new Date(spesa.data).toLocaleDateString()}</td>
            <td>${spesa.descrizione}</td>
            <td><span class="badge bg-info text-dark">${spesa.categoria}</span></td>
            <td class="fw-bold">€ ${spesa.importo.toFixed(2)}</td>
            <td>
                <button type="button" class="btn btn-sm btn-outline-primary me-2" onclick="modificaSpesa(${spesa.id})" title="Modifica">
                    <i class="bi bi-pencil color-s bg-white"></i>
                </button>
                <button type="button" class="btn btn-sm btn-outline-danger" onclick="rimuoviSpesa(${spesa.id})" title="Elimina">
                    <i class="bi bi-trash3 text-danger bg-white"></i>
                </button>
            </td>
        `;
        corpoTabella.appendChild(riga);
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