/**
 * Frontier API - Desktop Framework for HTML/CSS/JavaScript
 * 
 * This file is designed to be injected by the Rust runtime into every HTML page.
 * It provides:
 * - IPC communication with the backend
 * - Window spawning capabilities
 * - Intelligent link routing
 * 
 * RUST INJECTION:
 * Inject this script into <head> or after <body> loads in the page HTML
 * Example: `<script>${FRONTIER_API_CONTENT}</script>`
 */

if (!window.Frontier) {
    window.Frontier = {

            /**
             * Dispatches a message to the Rust backend and updates the terminal log.
             * @param {string} type - The type of message to dispatch.
             * @param {string} msg - The message to dispatch.
             */
        dispatch: (type, msg) => {
            const term = document.getElementById('terminal');
            console.log(`[Frontier IPC] ${type}: ${msg}`);
            
            if (term) {
                const entry = document.createElement('div');
                entry.className = 'log-entry';
                entry.innerHTML = `<div class="log-out"><strong>${type}:</strong> ${msg}</div>`;
                term.appendChild(entry);
                term.scrollTop = term.scrollHeight;
            }
        },

        /**
         * Abre uma nova janela nativa.
         * @param {string} url - Caminho local (index.html) ou URL externa.
         * @param {object} config - Objeto com as metas (width, height, title, etc).
         */
        spawn: (url, config = {}) => {
            const configStr = Object.entries(config)
                .map(([k, v]) => {
                    if (k === 'allowed_internal' && Array.isArray(v)) {
                        return `${k}=${v.join('|')}`;
                    }
                    return `${k}=${v}`;
                })
                .join(',');

            if (window.ipc && window.ipc.postMessage) {
                window.ipc.postMessage(`spawn|${url}|${configStr}`);
            } else {
                console.warn("Frontier IPC not available. Cannot spawn window.");
            }
        },
    };
}

/**
 * Sends an execution command to the Rust backend.
 * @param {string} program - The name of the program to execute.
 * @param {string} args - The arguments to pass to the program.
 */
function execute(program, args) {
    const term = document.getElementById('terminal');
    if (term) {
        term.innerHTML += `<div class="log-entry"><span class="log-cmd">> Executing: ${program} ${args}</span></div>`;
        term.scrollTop = term.scrollHeight;
    } else {
        console.log(`Executing: ${program} ${args}`);
    }
    
    if (window.ipc && window.ipc.postMessage) {
        window.ipc.postMessage(`${program}|${args}`);
    }
}


function clearLog() {
    const term = document.getElementById('terminal');
    if (term) {
        term.innerHTML = '';
    }
}

/**
 * AUTO-INITIALIZATION (Legacy Support)
 * 
 * When this file is loaded as a traditional <script src="frontier-api.js"></script>,
 * it will automatically initialize the link router.
 * 
 * When injected by Rust, the runtime will call Frontier.initLinkRouter() directly.
 */
(function autoInitialize() {
    const initRouter = () => {
        if (window.Frontier && window.Frontier.initLinkRouter) {
            window.Frontier.initLinkRouter();
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRouter);
    } else {
        initRouter();
    }
})();