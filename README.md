# RTGPS | Real-Time Global Problem Solver

**RTGPS** is a client-side, generative AI application engineered to provide structured, strategic intelligence on complex global issues. Built on the **Google GenAI SDK**, it leverages the **Gemini 2.5 Flash** model to deliver low-latency, high-fidelity situation reports in a unified "classified briefing" interface.

---

## 🏗 Architecture & Design

This application is built as a **zero-build** TypeScript project using native ES Modules. It emphasizes performance, resilience, and typographic hierarchy.

### Core Stack
*   **Runtime**: Browser-native ES Modules (via `importmap`).
*   **Language**: TypeScript (Client-side compilation/execution).
*   **AI Layer**: `@google/genai` (Gemini 2.5 Flash).
*   **Rendering**: `marked` for markdown parsing with custom CSS sanitization.
*   **Styling**: CSS Variables for theming, Grid/Flexbox for layout, and print-media inspired typography.

### Key Engineering Features

#### 1. Resilient AI Client Initialization
The application implements **lazy instantiation** for the `GoogleGenAI` client. Instead of initializing on module load (which can race against environment variable injection), the client is constructed within the execution context of the specific action. This ensures graceful error handling if `API_KEY` is missing or malformed, preventing the entire UI thread from crashing.

#### 2. Abortable Streaming Responses
RTGPS utilizes the `generateContentStream` API for real-time feedback. To manage long-running requests, we implement the **AbortController** pattern.
*   **Signal Propagation**: The `AbortSignal` is passed into the stream loop.
*   **Cleanup**: Resources and UI states (`thinking` vs `idle`) are deterministically reset in `finally` blocks, ensuring no "zombie" loading states persist after a cancellation.

#### 3. Prompt Engineering (System Instructions)
The model is governed by a strict `System Instruction` set that enforces:
*   **Persona**: "RTGPS" (Strategic Intelligence Unit).
*   **Format**: Strict Markdown hierarchy (H1 for titles, H2 for sections).
*   **Tone**: Objective, evidence-based, and urgency-prioritized.

#### 4. "Strategic Report" UI System
The Output interface is designed to mimic physical intelligence dossiers:
*   **Visual Metaphor**: Paper elevation using multi-layered `box-shadow`.
*   **Typography**: `Merriweather` (Serif) for high-readability body text vs `System UI` (Sans) for technical metadata.
*   **State Visualization**: CSS animations (`pulse`, `spin`) indicate active stream status vs idle states.

---

## 🚀 Setup & Execution

### Prerequisites
*   A valid **Google Gemini API Key**.
*   A local development server (to serve ES modules without CORS issues).

### Environment Configuration
The application expects the API key to be injected into the process environment.

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    ```

2.  **Serve the Application**
    Because this uses native ES modules, you simply need to serve the root directory.
    
    **Using Python:**
    ```bash
    python3 -m http.server 8000
    ```
    
    **Using Node (http-server):**
    ```bash
    npx http-server .
    ```

3.  **Access**
    Navigate to `http://localhost:8000`. The application will check for `process.env.API_KEY`. Ensure your environment or your hosting provider injects this variable.

---

## 📦 Capabilities

| Feature | Implementation |
| :--- | :--- |
| **Streaming Analysis** | `ai.models.generateContentStream` with token-by-token rendering. |
| **Markdown Parsing** | Real-time parsing via `marked` library. |
| **Context Management** | Single-turn request model optimized for high-throughput problem solving. |
| **Responsive Layout** | CSS Grid `350px 1fr` split shrinking to single column on mobile. |

## 📄 License
Apache 2.0
