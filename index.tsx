/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { GoogleGenAI } from '@google/genai';
import { marked } from 'marked';

const API_KEY = import.meta.env.VITE_API_KEY;

const errorDiv = document.getElementById('error-message');
const solveButton = document.getElementById('solve-button') as HTMLButtonElement | null;
const stopButton = document.getElementById('stop-button') as HTMLButtonElement | null;
const problemInput = document.getElementById('problem-input') as HTMLTextAreaElement | null;
const responseOutput = document.getElementById('response-output') as HTMLDivElement | null;
const loadingIndicator = document.getElementById('loading-indicator') as HTMLDivElement | null;
const exampleButtonsContainer = document.getElementById('example-buttons') as HTMLDivElement | null;
const statusDot = document.getElementById('status-dot') as HTMLDivElement | null;
const statusText = document.getElementById('status-text') as HTMLSpanElement | null;

// Validate API Key on load but do NOT crash the script
if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
  if (errorDiv) {
    errorDiv.textContent = 'Configuration error: API_KEY is missing.';
    errorDiv.style.display = 'block';
  }
  if (solveButton) {
    solveButton.disabled = true;
    solveButton.innerHTML = '<span class="btn-text">System Error</span>';
  }
}

// Track the current stream controller so we can abort it
let activeController: AbortController | null = null;

const EXAMPLE_PROBLEMS = [
    "Coastal city flooding mitigation",
    "Ocean plastic supply chain",
    "Youth mental health resilience",
    "Equitable AI access frameworks",
    "Antibiotic resistance strategy",
    "Sustainable vertical farming"
];

const SYSTEM_PROMPT = `# 🌍 Real-Time World Problem Solver System Prompt

## 🎯 Core Identity
**You are RTGPS** - Real-Time Global Problem Solver.
An advanced AI assistant specialized in rapid analysis and actionable solutions for critical world problems.

## ⚡ Operating Principles
1. **Urgency-First Assessment**: Prioritize immediate threats.
2. **Systems Thinking**: Identify root causes, not just symptoms.
3. **Evidence-Based**: Use proven strategies.

## 📤 Format Requirement
**You MUST format your response using Markdown.**
*   Use **Heading 1 (#)** for the Main Title of the report.
*   Use **Heading 2 (##)** for Section Headers (e.g., "SITUATION ANALYSIS", "STRATEGIC INTERVENTION").
*   Use **Heading 3 (###)** for subsections.
*   Use **Bold** for key metrics or terms.
*   Use **Bulleted Lists** for steps and action items.
*   Do not include a preamble or conversational filler. Start directly with the Heading 1.
`;

function setStatus(state: 'idle' | 'thinking' | 'active') {
    if (!statusDot || !statusText) return;
    
    statusDot.className = 'status-indicator'; // reset
    
    if (state === 'idle') {
        statusText.textContent = "Ready for Input";
        statusText.style.color = "#64748b";
        responseOutput?.classList.remove('streaming');
    } else if (state === 'thinking') {
        statusDot.classList.add('thinking');
        statusText.textContent = "Processing Data...";
        statusText.style.color = "#f59e0b";
    } else if (state === 'active') {
        statusDot.classList.add('active');
        statusText.textContent = "Receiving Transmission";
        statusText.style.color = "#10b981";
        responseOutput?.classList.add('streaming');
    }
}

if (solveButton && problemInput && responseOutput && loadingIndicator && exampleButtonsContainer && stopButton) {

    // Generate Example Chips
    EXAMPLE_PROBLEMS.forEach(problem => {
        const button = document.createElement('button');
        button.textContent = problem;
        button.classList.add('example-button');
        button.addEventListener('click', () => {
            problemInput.value = problem;
            problemInput.focus();
            // Visual feedback for selection
            document.querySelectorAll('.example-button').forEach(b => (b as HTMLElement).style.backgroundColor = '');
            button.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
        });
        exampleButtonsContainer.appendChild(button);
    });

    // Stop Button Logic
    stopButton.addEventListener('click', () => {
        if (activeController) {
            activeController.abort();
            activeController = null;
            setStatus('idle');
            loadingIndicator.style.display = 'none';
            
            // Reset UI Buttons
            solveButton.style.display = 'flex';
            stopButton.style.display = 'none';
            solveButton.disabled = false;
            solveButton.innerHTML = '<span class="btn-text">Initialize Sequence</span><span class="btn-icon">→</span>';
        }
    });

    solveButton.addEventListener('click', async () => {
        const problemDescription = problemInput.value.trim();
        
        // Reset Error state
        if (errorDiv) errorDiv.style.display = 'none';

        if (!problemDescription) {
            if (errorDiv) {
                errorDiv.textContent = "Please enter mission parameters.";
                errorDiv.style.display = 'block';
            }
            problemInput.focus();
            return;
        }
        
        // Initialize AI instance here to prevent script crash on load if key is invalid
        let ai;
        try {
             ai = new GoogleGenAI({ apiKey: API_KEY || '' });
        } catch (e) {
             console.error("AI Initialization Error:", e);
             if (errorDiv) {
                 errorDiv.textContent = "System Error: Unable to initialize AI engine. Check API Key.";
                 errorDiv.style.display = 'block';
             }
             return;
        }

        // Setup UI for Processing
        activeController = new AbortController();
        
        solveButton.disabled = true;
        solveButton.style.display = 'none';
        stopButton.style.display = 'flex';
        
        loadingIndicator.style.display = 'flex';
        responseOutput.innerHTML = ''; 
        setStatus('thinking');

        try {
            const responseStream = await ai.models.generateContentStream({
                model: 'gemini-2.5-flash',
                contents: problemDescription,
                config: {
                    systemInstruction: SYSTEM_PROMPT,
                }
            });

            loadingIndicator.style.display = 'none';
            setStatus('active');
            
            let accumulatedText = "";

            for await (const chunk of responseStream) {
                // Check if aborted manually
                if (activeController.signal.aborted) {
                    break;
                }

                if (chunk.text) {
                    accumulatedText += chunk.text;
                    // Render Markdown
                    const parsed = await marked.parse(accumulatedText);
                    responseOutput.innerHTML = parsed;
                    
                    // Auto-scroll to bottom of panel
                    const panel = document.querySelector('.output-panel');
                    if(panel) {
                        // Only scroll if near bottom to allow reading during generation
                        const isNearBottom = panel.scrollHeight - panel.scrollTop - panel.clientHeight < 200;
                        if(isNearBottom) {
                            panel.scrollTo({ top: panel.scrollHeight, behavior: 'smooth' });
                        }
                    }
                }
            }
            
            setStatus('idle');

        } catch (error) {
             // If it was an abort error, we handled it nicely in the stop button
            if (activeController && !activeController.signal.aborted) {
                console.error("Error calling Gemini API:", error);
                if (errorDiv) {
                    errorDiv.textContent = `System Failure: ${error instanceof Error ? error.message : 'Unknown Error'}`;
                    errorDiv.style.display = 'block';
                }
            }
            setStatus('idle');
        } finally {
            activeController = null;
            solveButton.disabled = false;
            solveButton.style.display = 'flex';
            stopButton.style.display = 'none';
            solveButton.innerHTML = '<span class="btn-text">Initialize Sequence</span><span class="btn-icon">→</span>';
            loadingIndicator.style.display = 'none';
            responseOutput.classList.remove('streaming');
        }
    });
} else {
     console.error("Critical UI elements missing.");
}