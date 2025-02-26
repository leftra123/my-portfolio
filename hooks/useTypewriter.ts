import { useEffect, useState } from "react";

export function useTypewriter(words: string[]): string {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const word = words[currentWord];
    let delay = isDeleting ? 50 : 100;

    if (!isDeleting && currentText === word) {
      // Pausa al terminar de escribir
      delay = 1500;
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentText === "") {
      // Pausa breve antes de pasar a la siguiente palabra
      delay = 500;
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentWord((prev) => (prev + 1) % words.length);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting ? word.substring(0, prev.length - 1) : word.substring(0, prev.length + 1)
        );
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentText, isDeleting, currentWord, words]);

  return currentText;
}