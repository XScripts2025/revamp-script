/* =====================================================
   COPY SCRIPT
===================================================== */

function copyScript(elementId, button) {

  const scriptElement =
    document.getElementById(elementId);

  if (!scriptElement) {
    console.error(
      "Could not find script:",
      elementId
    );

    return;
  }


  /*
     textContent gets the actual loadstring
     without adding HTML.
  */

  const scriptText =
    scriptElement.textContent.trim();


  /*
     Modern clipboard API
  */

  if (
    navigator.clipboard &&
    window.isSecureContext
  ) {

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
   FALLBACK COPY
===================================================== */

function fallbackCopy(text, button) {

  const textarea =
    document.createElement("textarea");

  textarea.value = text;

  textarea.style.position = "fixed";

  textarea.style.left = "-9999px";

  textarea.style.top = "0";

  document.body.appendChild(textarea);

  textarea.focus();

  textarea.select();


  try {

    document.execCommand("copy");

    showCopied(button);

  } catch (error) {

    console.error(
      "Copy failed:",
      error
    );

  }


  document.body.removeChild(textarea);
}



/* =====================================================
   COPIED BUTTON STATE
===================================================== */

function showCopied(button) {

  const originalText =
    button.textContent;

  button.textContent =
    "Copied!";

  button.style.backgroundColor =
    "#10b981";


  setTimeout(() => {

    button.textContent =
      originalText;

    button.style.backgroundColor =
      "";

  }, 2000);
}



/* =====================================================
   SEARCH
===================================================== */

function filterScripts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {

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