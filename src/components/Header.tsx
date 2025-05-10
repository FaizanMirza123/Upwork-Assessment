
import { Edit } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
        <div className="flex items-center space-x-2">
          <Edit className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-800">AI Paraphraser</h1>
        </div>
        <div>
          <p className="text-sm text-gray-500">Transform your writing with AI</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
