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

    form.reset();
});