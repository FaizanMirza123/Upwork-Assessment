import { useState, useRef, useEffect } from "react";
import SelectionToolbar from "./SelectionToolbar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Function to call the backend API for paraphrasing
const paraphraseText = async (text: string) => {
  try {
    const response = await fetch('http://103.31.104.114:3001/paraphrase', {  // Directly use the backend API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Failed to paraphrase text');
    }

    return response.json();
  } catch (error) {
    console.error("Error making paraphrase request:", error);
    throw new Error("Failed to paraphrase text");
  }
};

const TextEditor = () => {
  const [content, setContent] = useState<string>(
    "Welcome to the AI Paraphraser!\n\nTry selecting some text to see the paraphrasing option appear. This tool helps you rewrite your content in different ways.\n\nSelect any part of this text and click the 'Paraphrase' button that appears."
  );
  const [selection, setSelection] = useState<{
    text: string;
    start: number;
    end: number;
  } | null>(null);
  const [toolbarPosition, setToolbarPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  const editorRef = useRef<HTMLDivElement>(null);

  const handleSelectionChange = () => {
    const selection = window.getSelection();
    
    if (selection && selection.toString().trim().length > 0 && editorRef.current) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      // Only process if selection is within our editor
      if (editorRef.current.contains(selection.anchorNode)) {
        const editorContent = editorRef.current.innerText;
        const selectedText = selection.toString();
        
        // Find the position of the selected text in the content
        const start = editorContent.indexOf(selectedText);
        const end = start + selectedText.length;
        
        setSelection({
          text: selectedText,
          start,
          end,
        });
        
        // Position the toolbar above the selection
        setToolbarPosition({
          top: rect.top - 40 + window.scrollY,
          left: rect.left + rect.width / 2,
        });
      }
    } else {
      // Clear selection when clicking elsewhere
      setSelection(null);
      setToolbarPosition(null);
    }
  };

  const handleParaphraseText = async () => {
    if (!selection) return;
    
    try {
      setIsProcessing(true);
      
      // Make API call to the backend to paraphrase selected text
      const response = await paraphraseText(selection.text);

      if (!response.success) {
        throw new Error(response.error || "Failed to paraphrase text");
      }
      
      const paraphrasedText = response.result;
      
      // Replace the selected text with the paraphrased version
      if (paraphrasedText) {
        const newContent = 
          content.substring(0, selection.start) + 
          paraphrasedText + 
          content.substring(selection.end);
        
        setContent(newContent);
        
        // Clear selection after replacing
        setSelection(null);
        setToolbarPosition(null);
        
        toast.success("Text successfully paraphrased!");
      }
    } catch (error) {
      console.error("Error paraphrasing text:", error);
      toast.error("Failed to paraphrase text. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange);
    
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [content]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div
          ref={editorRef}
          className="min-h-[300px] focus:outline-none prose max-w-none"
          contentEditable
        
          dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br>") }}
          suppressContentEditableWarning={true}
        />
      </div>
      
      {selection && toolbarPosition && (
        <SelectionToolbar 
          position={toolbarPosition}
          onParaphrase={handleParaphraseText}  // Paraphrase function passed to the toolbar
          isProcessing={isProcessing}
        />
      )}
      
      <div className="flex justify-between text-sm text-gray-500 px-1">
        <span>Click anywhere to start editing</span>
        <span>{content.length} characters</span>
      </div>
    </div>
  );
};

export default TextEditor;
