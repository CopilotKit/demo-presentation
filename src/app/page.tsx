"use client";

import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "./styles.css";
import { Presentation } from "./components/main/Presentation";
import { useState } from "react";

export default function AIPresentation() {
  const [performResearch, setPerformResearch] = useState(false);

  return (
    <CopilotKit
      // publicApiKey={process.env.NEXT_PUBLIC_COPILOT_CLOUD_API_KEY}
      // Alternatively, you can use runtimeUrl to host your own CopilotKit Runtime
      runtimeUrl="/api/copilotkit"
      transcribeAudioUrl="/api/transcribe"
      textToSpeechUrl="/api/tts"
    >
      <CopilotSidebar
        instructions={
          "Help the user create and edit a powerpoint-style presentation." +
          (!performResearch
            ? " No research is needed. Do not perform any research."
            : " Perform research on the topic.")
        }
        defaultOpen={true}
        labels={{
          title: "Presentation Copilot",
          initial:
            "Hi you! 👋 I can help you create a presentation on any topic.",
        }}
        clickOutsideToClose={false}
      >
        <Presentation
          performResearch={performResearch}
          setPerformResearch={setPerformResearch}
        />
      </CopilotSidebar>
    </CopilotKit>
  );
}
