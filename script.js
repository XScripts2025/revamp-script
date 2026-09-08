/* =====================================================
   COPY SCRIPT (MOBILE & DESKTOP FIXED)
===================================================== */

function copyScript(elementId, button) {
  const scriptElement = document.getElementById(elementId);

  if (!scriptElement) {
    console.error("Could not find script element:", elementId);
    return;
  }

  // Get raw text loadstring
  const scriptText = scriptElement.textContent.trim();

  // Modern Clipboard API (Primary)
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(scriptText)
      .then(() => {
        showCopied(button);
      })
      .catch(() => {
        fallbackCopy(scriptText, button);
      });
  } else {
    fallbackCopy(scriptText, button);
  }
}


/* =====================================================
   MOBILE FALLBACK COPY
===================================================== */

function fallbackCopy(text, button) {
  const textarea = document.createElement("textarea");
  
  // Mobile Safari & Chrome require explicit read/write attributes
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  textarea.style.fontSize = "12pt"; // Prevents iOS page zooming on focus

  document.body.appendChild(textarea);

  // Clear existing selections on mobile
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;

  textarea.select();
  textarea.setSelectionRange(0, 999999); // Required for iOS support

  try {
    const successful = document.execCommand("copy");
    if (successful) {
      showCopied(button);
    }
  } catch (error) {
    console.error("Copy failed:", error);
  }

  // Cleanup element & restore previous selection
  document.body.removeChild(textarea);

  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}


/* =====================================================
   COPIED BUTTON STATE
===================================================== */

function showCopied(button) {
  const originalText = button.textContent;

  button.textContent = "Copied!";
  button.style.backgroundColor = "#10b981";

  setTimeout(() => {
    button.textContent = originalText;
    button.style.backgroundColor = "";
  }, 2000);
}


/* =====================================================
   SEARCH FILTER
===================================================== */

function filterScripts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const title = (
      (card.getAttribute("data-title") || "") +
      " " +
      (card.querySelector(".game-tag")?.textContent || "")
    ).toLowerCase();

    if (title.includes(input)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}
