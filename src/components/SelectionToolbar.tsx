
import { Button } from "@/components/ui/button";
import { Replace } from "lucide-react";

interface SelectionToolbarProps {
  position: {
    top: number;
    left: number;
  };
  onParaphrase: () => void;
  isProcessing: boolean;
}

const SelectionToolbar = ({ position, onParaphrase, isProcessing }: SelectionToolbarProps) => {
  return (
    <div 
      className="absolute z-10 transform -translate-x-1/2 animate-in fade-in zoom-in duration-200"
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <div className="bg-white rounded-md shadow-md border border-gray-200 p-1 flex items-center">
        <Button 
          onClick={onParaphrase}
          disabled={isProcessing}
          variant="ghost"
          className="text-sm px-3 py-1 h-8 flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100"
        >
          {isProcessing ? (
            <>
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 mr-1"></div>
              Paraphrasing...
            </>
          ) : (
            <>
              <Replace className="h-3.5 w-3.5" />
              Paraphrase
            </>
          )}
        </Button>
      </div>
      <div className="w-3 h-3 bg-white rotate-45 border-r border-b border-gray-200 absolute -bottom-1.5 left-1/2 transform -translate-x-1/2"></div>
    </div>
  );
};

export default SelectionToolbar;
