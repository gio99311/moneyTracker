const spese = [];

const form = document.getElementById('form-spese');

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

    const nuovaSpesa = {
        id: Date.now(),
        descrizione,
        importo,
        categoria,
        data
    };

    spese.push(nuovaSpesa);
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
        `;
        corpoTabella.appendChild(riga);
    });
}

// Nel tuo form.addEventListener, aggiungi alla fine:
// spese.push(nuovaSpesa);
// aggiornaTabella();
// form.reset();