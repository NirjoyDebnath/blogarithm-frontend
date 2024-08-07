import { jsPDF } from "jspdf";
import { ENV } from "../config/env";

export const wrapText = (
  doc: jsPDF,
  currentY: number,
  text: string,
  maxWidth: number,
  fontSize: number,
  Link: string
) => {
  const words = text.split(" ");
  let line = "";

  doc.setFontSize(fontSize);

  for (const word of words) {
    const testLine = line + word + " ";
    const testWidth = doc.getTextWidth(testLine);

    if (testWidth > maxWidth) {
      if (currentY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        setWebnameandpage(doc, fontSize)
        currentY = 20;
      }
      if (Link) {
        doc.textWithLink(line, 10, currentY, {
          url: Link,
        });
      } else doc.text(line, 10, currentY);
      currentY += doc.getTextDimensions("M").h + 1;
      line = word + " ";
    } else {
      line = testLine;
    }
  }

  if (line) {
    if (currentY > doc.internal.pageSize.height - 20) {
      doc.addPage();
      setWebnameandpage(doc, fontSize)
      currentY = 20;
    }
    if (Link) {
      doc.textWithLink(line, 10, currentY, {
        url: Link,
      });
    } else doc.text(line, 10, currentY);
    currentY += doc.getTextDimensions("M").h + 1;
  }

  return currentY;
};

export const setTitle = (
  doc: jsPDF,
  currentY: number,
  title: string,
  storyId: string
): number => {
  doc.setFont("helvetica", "bold");
  const fontSize = 30;
  doc.setFontSize(fontSize);
  currentY = wrapText(
    doc,
    currentY,
    title,
    doc.internal.pageSize.width - 2 * 10,
    fontSize,
    ENV.FRONTEND_SERVER_ENDPOINT + `/${storyId}`
  );
  return currentY;
};

export const setCreatedAt = (
  doc: jsPDF,
  currentY: number,
  date: string
): number => {
  doc.setFont("helvetica", "normal");
  const fontSize = 10;
  doc.setFontSize(fontSize);

  doc.text(date, 10, currentY);
  currentY += doc.getTextDimensions("M").h;
  return currentY;
};
export const setUserName = (
  doc: jsPDF,
  currentY: number,
  userName: string,
  AuthorId: string
): number => {
  doc.setFont("helvetica", "bold");
  const fontSize = 10;
  doc.setFontSize(fontSize);
  doc.textWithLink("@" + userName, 10, currentY, {
    url: ENV.FRONTEND_SERVER_ENDPOINT + `/user/${AuthorId}/profile`,
  });
  currentY += doc.getTextDimensions("M").h;
  return currentY + 1;
};

export const setDescription = (
  doc: jsPDF,
  currentY: number,
  Description: string
): number => {
  doc.setFont("helvetica", "normal");
  const fontSize = 13;
  doc.setFontSize(fontSize);
  currentY += 10;
  currentY = wrapText(
    doc,
    currentY,
    Description,
    doc.internal.pageSize.width - 2 * 10,
    fontSize,
    ""
  );
  return currentY;
};

export const setWebnameandpage = (doc: jsPDF, prevFont:number=10) => {
  doc.setFontSize(10);
  const textWidth = doc.getTextWidth("Blogarithm");
  const pageWidth = doc.internal.pageSize.width;
  const x = (pageWidth - textWidth) / 2;
  const y = doc.internal.pageSize.height - 5;
  doc.text("Blogarithm", x, y);
  const totalPages = doc.internal.pages.length-1;
  doc.text(totalPages.toString(), pageWidth-7, y);
  doc.setFontSize(prevFont);
};
