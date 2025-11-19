# 🌍 RTGPS | Real-Time Global Problem Solver

![Status](https://img.shields.io/badge/Status-Operational-success)
![License](https://img.shields.io/badge/License-Apache_2.0-blue)
![Tech](https://img.shields.io/badge/Stack-TypeScript_|_Vite_|_Gemini-yellow)

**RTGPS** (Real-Time Global Problem Solver) is a strategic intelligence tool powered by the **Google Gemini 2.5 Flash** model. It is engineered to provide low-latency, structured situation reports on complex global issues, simulating a classified intelligence briefing interface.

---

## 🚀 Getting Started

Follow these instructions to set up the development environment on your local machine.

### Prerequisites

*   **Node.js**: v18.0.0 or higher
*   **npm**: v9.0.0 or higher
*   **Google API Key**: Access to Gemini models via Google AI Studio.

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-org/rtgps.git
    cd rtgps
    ```

2.  **Install Dependencies**
    Install the required packages using npm.
    ```bash
    npm install
    ```

3.  **Configure Environment**
    The application requires an API key to function. You can set this in your shell or create a `.env` file (if configured with dotenv). For this setup, ensure the variable is available in the process context.
    
    **Mac/Linux:**
    ```bash
    export API_KEY="your_gemini_api_key_here"
    ```

    **Windows (PowerShell):**
    ```powershell
    $env:API_KEY="your_gemini_api_key_here"
    ```

### Development

Start the local development server. This uses **Vite** for Hot Module Replacement (HMR) and on-the-fly TypeScript compilation.

```bash
npm run dev
```

Open your browser to `http://localhost:5173`.

---

## 🏗 Architecture

The application adheres to a **Client-Side Generative Architecture**.

*   **Frontend**: Native TypeScript compiled via Vite.
*   **AI Layer**: Direct integration with `@google/genai` SDK.
*   **State Management**: `AbortController` based streaming state management.
*   **Rendering**: Incremental Markdown parsing using `marked`.

### Directory Structure

```
rtgps/
├── index.html          # Application Entry Point
├── index.tsx           # Core Application Logic
├── index.css           # Design System & Theming
├── vite.config.js      # Build Tool Configuration
├── package.json        # Dependency Manifest
└── README.md           # Documentation
```

---

## 🛠 Tech Stack

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime** | Vite | Dev server and bundler |
| **Language** | TypeScript | Type-safe logic |
| **Model** | Gemini 2.5 Flash | High-throughput analysis |
| **Styling** | CSS Variables | Native, performant theming |

---

## 📄 License

Apache 2.0 - See [LICENSE](LICENSE) for details.