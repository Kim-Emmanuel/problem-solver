# Real-Time World Problem Solver

An advanced AI assistant, powered by the Google Gemini API, designed to provide rapid analysis and actionable solutions for critical world problems.

---

## 🚀 Overview

The **Real-Time World Problem Solver** is a web application that leverages the power of Google's Gemini model to tackle some of the most pressing global challenges. Users can describe a complex issue—from climate change and public health crises to economic instability and misinformation—and receive a structured, comprehensive, and actionable solution framework in real-time.

The application is guided by a sophisticated system prompt that transforms the AI into **RTGPS (Real-Time Global Problem Solver)**, an expert system specializing in systems thinking, multi-stakeholder analysis, and evidence-based strategies.

## ✨ Key Features

-   **Dynamic Problem Analysis**: Input any world problem and receive an instant, detailed analysis.
-   **Powered by Gemini**: Utilizes the cutting-edge capabilities of Google's `gemini-2.5-flash` model for fast and intelligent responses.
-   **Structured Solution Frameworks**: Responses are formatted into clear, actionable phases, including rapid assessment, solution design, and implementation support.
-   **Real-Time Streaming**: Watch the AI generate the solution live, providing immediate feedback.
-   **Example Prompts**: Get started quickly with a curated list of sample problems.
-   **Responsive & Accessible UI**: A clean, modern interface that works seamlessly across devices.

## 🛠️ Technology Stack

-   **Frontend**: HTML5, CSS3, TypeScript
-   **AI Engine**: Google Gemini API (`@google/genai`)
-   **Module Loading**: ES modules via `esm.sh`

## ⚙️ How It Works

The application's intelligence is driven by a highly detailed **System Prompt** that defines the AI's persona, operating principles, and response structure. When a user submits a problem:

1.  The query is sent to the Gemini API along with the comprehensive system prompt.
2.  The AI, acting as **RTGPS**, processes the problem through its defined ethical and analytical frameworks.
3.  It generates a response according to predefined templates for either urgent crises or long-term strategic issues.
4.  The solution is streamed back to the user's browser, ensuring a dynamic and engaging experience.

## 🔧 Getting Started

To run this project locally, you need a web server to serve the static files.

### Prerequisites

-   A modern web browser.
-   A Google Gemini API key.

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **API Key Configuration:**
    This application requires the Google Gemini API key to be available as an environment variable named `API_KEY`. You must configure this in your deployment environment. The application will automatically pick it up via `process.env.API_KEY`.

3.  **Run the application:**
    Serve the `index.html` file using a local web server. A simple way to do this is with the `live-server` NPM package or Python's built-in server.

    *Using `live-server`:*
    ```bash
    npm install -g live-server
    live-server
    ```

    *Using Python:*
    ```bash
    # Python 3
    python -m http.server
    ```
    Now, open your browser and navigate to the provided local address (e.g., `http://127.0.0.1:8080`).

## 📄 License

This project is licensed under the Apache License 2.0.
