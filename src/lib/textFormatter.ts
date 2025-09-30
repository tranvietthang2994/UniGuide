/**
 * Utility functions for formatting text content
 */

/**
 * Converts plain text with \n to HTML with proper line breaks
 * Also handles basic markdown-like formatting for bold text
 */
export function formatTextToHTML(text: string): string {
  if (!text) return "";

  return (
    text
      // Convert \n to <br> tags
      .replace(/\n/g, "<br>")
      // Convert **text** to <strong>text</strong> for bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Convert *text* to <em>text</em> for italic
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // Convert ### text to <h3>text</h3> for headings
      .replace(
        /^### (.*$)/gm,
        '<h3 style="font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #111827;">$1</h3>'
      )
      // Convert ## text to <h2>text</h2> for headings
      .replace(
        /^## (.*$)/gm,
        '<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 2rem; margin-bottom: 1rem; color: #111827;">$1</h2>'
      )
      // Convert # text to <h1>text</h1> for headings
      .replace(
        /^# (.*$)/gm,
        '<h1 style="font-size: 1.875rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1.5rem; color: #111827;">$1</h1>'
      )
      // Convert - text to <li>text</li> for lists
      .replace(
        /^- (.*$)/gm,
        '<li style="margin-left: 1rem; margin-bottom: 0.25rem;">$1</li>'
      )
      // Wrap consecutive list items in <ul>
      .replace(
        /(<li style="margin-left: 1rem; margin-bottom: 0.25rem;">.*<\/li>)/g,
        '<ul style="list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1rem;">$1</ul>'
      )
      // Clean up duplicate <ul> tags
      .replace(
        /<\/ul>\s*<ul style="list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1rem;">/g,
        ""
      )
  );
}

/**
 * Applies inline formatting (bold, italic) to a single line of text.
 */
function applyInlineFormatting(line: string): string {
  return line
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert **text** to <strong>text</strong>
    .replace(/\*(.*?)\*/g, "<em>$1</em>"); // Convert *text* to <em>text</em>
}

/**
 * Converts plain text to HTML, handling paragraphs, headings, and lists.
 */
export function formatTextToHTMLWithParagraphs(text: string): string {
  if (!text) return "";

  // Normalize line breaks
  let processedText = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  const lines = processedText.split("\n");
  let htmlBlocks: string[] = [];
  let currentParagraphLines: string[] = [];
  let currentListItems: string[] = [];

  const flushParagraph = () => {
    if (currentParagraphLines.length > 0) {
      const paragraphContent = applyInlineFormatting(
        currentParagraphLines.join("<br>")
      );
      htmlBlocks.push(
        `<p style="margin-bottom: 1rem; line-height: 1.625;">${paragraphContent}</p>`
      );
      currentParagraphLines = [];
    }
  };

  const flushList = () => {
    if (currentListItems.length > 0) {
      const listContent = currentListItems
        .map(
          (item) =>
            `<li style="margin-left: 1rem; margin-bottom: 0.25rem;">${applyInlineFormatting(item)}</li>`
        )
        .join("");
      htmlBlocks.push(
        `<ul style="list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1rem;">${listContent}</ul>`
      );
      currentListItems = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("### ")) {
      flushList();
      flushParagraph();
      const headingContent = applyInlineFormatting(line.substring(4));
      htmlBlocks.push(
        `<h3 style="font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #1a202c;">${headingContent}</h3>`
      );
    } else if (line.startsWith("## ")) {
      flushList();
      flushParagraph();
      const headingContent = applyInlineFormatting(line.substring(3));
      htmlBlocks.push(
        `<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 2rem; margin-bottom: 1rem; color: #1a202c;">${headingContent}</h2>`
      );
    } else if (line.startsWith("# ")) {
      flushList();
      flushParagraph();
      const headingContent = applyInlineFormatting(line.substring(2));
      htmlBlocks.push(
        `<h1 style="font-size: 1.875rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1.25rem; color: #1a202c;">${headingContent}</h1>`
      );
    } else if (line.startsWith("- ")) {
      flushParagraph();
      currentListItems.push(line.substring(2));
    } else if (line === "") {
      // Empty line, signifies end of paragraph or list
      flushList();
      flushParagraph();
    } else {
      // Regular paragraph line
      flushList(); // If we were in a list, it's now a paragraph
      currentParagraphLines.push(line);
    }
  }

  // Flush any remaining content
  flushList();
  flushParagraph();

  return htmlBlocks.join("");
}

/**
 * Simple text formatter that just handles line breaks and basic formatting
 */
export function simpleTextFormatter(text: string): string {
  if (!text) return "";

  return (
    text
      // Convert \n to <br> tags
      .replace(/\n/g, "<br>")
      // Convert **text** to <strong>text</strong> for bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Convert *text* to <em>text</em> for italic
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
  );
}
