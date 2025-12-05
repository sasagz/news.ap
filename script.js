document.getElementById("analyzeButton").addEventListener("click", () => {
    const noticia = document.getElementById("newsInput").value;
    const filtro = document.getElementById("filter").value;
    const resultText = document.getElementById("resultText");

    if (noticia.trim() === "") {
        resultText.textContent = "Cole uma notícia primeiro!";
        return;
    }

    let resultado = "";

    if (filtro === "local") {
        // Captura “em X”, “no X”, “na X”
        const match = noticia.match(/(?:em|no|na)\s([A-ZÁÉÍÓÚÂÊÔÃÕ][A-Za-zÀ-ú\s]+)/);
        resultado = match ? match[1] : "Local não identificado.";
    }

    if (filtro === "data") {
        const match = noticia.match(/\b(\d{1,2}\/\d{1,2}\/\d{2,4})\b|\b(\d{1,2} de [A-Za-zç]+ de \d{4})\b/);
        resultado = match ? match[0] : "Data não encontrada.";
    }

    if (filtro === "pessoas") {
        const nomes = noticia.match(/\b[A-Z][a-záéíóúãõç]+(?:\s[A-Z][a-záéíóúãõç]+)+/g);
        resultado = nomes ? nomes.join(", ") : "Nenhum nome encontrado.";
    }

    if (filtro === "resumo") {
        const frases = noticia.split(".");
        resultado = frases.slice(0, 2).join(". ") + ".";
    }

    if (filtro === "motivo") {
        const match = noticia.match(/(?:porque|por causa de|devido a|motivou|motivo)\s([^.,]+)/i);
        resultado = match ? match[0] : "Motivo não identificado.";
    }

    resultText.textContent = resultado;
});
