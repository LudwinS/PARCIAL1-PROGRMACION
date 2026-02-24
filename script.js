class KalosPokedex extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    async consultarAPI(e) {
        e.preventDefault();
        const input = this.shadowRoot.querySelector('#poke-input');
        const region = this.shadowRoot.querySelector('#region-select');
        const display = this.shadowRoot.querySelector('#display');
        const nombre = input.value.toLowerCase().trim();

        // VALIDACIÓN: Evitar campos vacíos
        if (!nombre || region.value === "") {
            alert("Error: Ingrese un nombre y seleccione una región de escaneo.");
            return;
        }

        display.innerHTML = `<div class="msg">CONECTANDO A BASE DE DATOS...</div>`;

        try {
            // Petición a la base de datos externa 
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
            if (!res.ok) throw new Error("Especie no localizada.");
            const data = await res.json();

            // Petición para descripción
            const specRes = await fetch(data.species.url);
            const specData = await specRes.json();
            const desc = specData.flavor_text_entries.find(el => el.language.name === 'es')?.flavor_text || "Sin descripción.";

            this.mostrarPokemon(data, desc);
        } catch (err) {
            display.innerHTML = `<div class="msg" style="color:#ff5252">⚠️ ${err.message}</div>`;
        }
    }

    mostrarPokemon(data, desc) {
        const display = this.shadowRoot.querySelector('#display');
        const img = data.sprites.other['official-artwork'].front_default;
        
        display.innerHTML = `
            <div class="result fade-in">
                <h2 class="name">${data.name.toUpperCase()}</h2>
                <img src="${img}" class="poke-img">
                <div class="stats">
                    <p><strong>ALT:</strong> ${data.height/10} m | <strong>PES:</strong> ${data.weight/10} kg</p>
                    <p class="desc">${desc.replace(/\f/g, ' ')}</p>
                </div>
            </div>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            :host { display: block; font-family: 'monospace'; }
            .ui { display: flex; flex-direction: column; gap: 10px; }
            form { display: flex; flex-direction: column; gap: 8px; border-bottom: 2px solid #00e5ff; padding-bottom: 15px; }
            input, select, button { padding: 10px; background: #000; border: 1px solid #00e5ff; color: #00e5ff; border-radius: 4px; }
            button { background: #00e5ff; color: #000; font-weight: bold; cursor: pointer; }
            button:hover { background: #fff; box-shadow: 0 0 10px #00e5ff; }
            #display { min-height: 250px; padding: 15px; color: #fff; overflow-y: auto; }
            .msg { text-align: center; margin-top: 50px; font-size: 0.8rem; }
            .result { text-align: center; }
            .poke-img { width: 150px; filter: drop-shadow(0 0 5px #00e5ff); }
            .name { border-bottom: 1px solid #555; padding-bottom: 5px; color: #00e5ff; }
            .desc { font-size: 0.8rem; background: #333; padding: 10px; border-radius: 5px; margin-top: 10px; line-height: 1.4; }
            .fade-in { animation: fadeIn 0.5s ease; }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        </style>
        <div class="ui">
            <form id="pokedex-form">
                <input type="text" id="poke-input" placeholder="Nombre Pokémon...">
                <select id="region-select">
                    <option value="">-- Región --</option>
                    <option value="k">Kalos</option>
                    <option value="c">Kanto</option>
                </select>
                <button type="submit">ESCANEAR</button>
            </form>
            <div id="display">
                <div class="msg">SISTEMA LISTO...</div>
            </div>
        </div>
        `;
        this.shadowRoot.querySelector('form').addEventListener('submit', (e) => this.consultarAPI(e));
    }
}
customElements.define('kalos-pokedex', KalosPokedex);